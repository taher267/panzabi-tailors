<?php

namespace App\Http\Livewire\Customer;

use App\Models\Order;
use Livewire\Component;
use App\Models\Customer;
use App\Models\OrderItem;
use Livewire\WithPagination;
use App\Tailors\TailorsTrait;
use Livewire\WithFileUploads;
use App\Tailors\TailorsErrorMsgTrait;

class TailorsCustomerOrderItems extends Component
{   
    use WithFileUploads;
    use WithPagination;
    use TailorsTrait;
    use TailorsErrorMsgTrait;
    public $formId, $currentPage = 1, $success;
    //Order Item
    public $products, $cloth_long,$cloth_body, $email,$body_loose,$cloth_belly,$belly_loose,$cloth_enclosure,$hand_long ,$sleeve_enclosure,$sleeve_pasting ,
    $cloth_throat,$cloth_collar ,$cloth_shoulder ,$cloth_mora,$noke_shoho, $cloth_additional,$collar_measure_type, $fixed_size,$order_sample_images;
    /**Disigning Part */
    public $design_fields=[], $designs_check=[];
    public $customer_id,$Full_Name, $order_id,  $order_number, $wages, $discount,$quantity, $advance,  $delivery_charge, $total, $status, $delivered_date; 
    /**Order Delivery */
    public $delivery_system,$courier_details,$order_delivery, $country, $city, $line1, $line2, $province,$zipcode;
    /**Wages */
    public $wagesOutpurResult, $added_order_id;

    public function mount($customer_id, $order_number)
    {
        $this->customer_id = $customer_id;
        $this->order_number = $order_number;
        $customer = Customer::findOrFail($customer_id);
        $this->customer_id = $customer->id;
        // $this->email = $customer->email;
        $this->Full_Name = $customer->Full_Name;

        $order = Order::findOrFail($order_number);
        $this->order_number     = $order->order_number;
        $this->added_order_id     = $order->id;
        // $this->wages            = $order->wages;
        // $this->discount         = $order->discount;
        // $this->delivery_system  = $order->delivery_system;
        // $this->courier_details  = $order->courier_details;
        // $this->delivery_charge  = $order->delivery_charge;
        // $this->total            = $order->total;
        // $this->status           = $order->status;
        // $this->delivered_date   = $order->delivered_date;
        // $this->currentPage = 1;
        
    }
    /**Modal */
    public function formController($key, $order_number = null)
    {
        $this->formId = $key;
        if($order_number != null){
            
        }
    }
    /**step form ////////////////////////////*/
    public $pages =4;
    
    private $validationRules = [
        1 => [
            'products'              => 'required|numeric:gt:0',
            'cloth_long'            => 'required',
            'cloth_body'            => 'nullable',
            'body_loose'            => 'nullable',
            'cloth_belly'           => 'nullable',
            'belly_loose'           => 'nullable',
            'cloth_enclosure'       => 'required',
            'hand_long'             => 'required',
            'sleeve_enclosure'      => 'nullable',
            'sleeve_pasting'        => 'nullable|string',
            'cloth_throat'          => 'required_without:cloth_collar',
            'cloth_collar'          => 'required_without:cloth_throat',
            'collar_measure_type'   => 'numeric|nullable',
            'order_sample_images.*' =>'image|mimes:jpg,jpeg,png|nullable',
            'cloth_shoulder'        => 'required',
            'cloth_mora'            => 'nullable',
            'noke_shoho'            => 'nullable',
            'cloth_additional'      => 'nullable|string'
        ],
        2 => [
            'designs_check.*'       => 'required',
            'design_fields.*'       => 'nullable',
        ],
        3 => [
                'wages'                 => 'required|numeric|gt:0',
                'quantity'              => 'gt:0|required|numeric',
                'discount'              => 'nullable|numeric',
                'advance'               => 'nullable|numeric',
                'total'                 => 'required|numeric',
                'delivery_system'        => 'required_with:order_delivery',
                'delivery_charge'        => 'required_with:order_delivery',
                'country'        => 'required_with:order_delivery',
                'city'        => 'required_with:order_delivery',
                'province'        => 'required_with:order_delivery',
                'line1'        => 'required_with:order_delivery',
                'zipcode'        => 'required_with:order_delivery',        
        ]
    ];
    public function updated($fields)
{
    $this->validateOnly($fields, $this->validationRules[$this->currentPage], $this->newCustomerErrMsgs());
}
public function fillEmptyStyleField($style_id){
        
    $this->TraitfillEmptyStyleField($style_id);
    
}
public function placeIteam()
{
    for ($i=1; $i < $this->pages ; $i++) {
        $this->validate($this->validationRules[$i], $this->newCustomerErrMsgs());
    }
    $this->OrderIncluding($this->customer_id, $this->added_order_id, $this->order_number);
    // $this->reset();
        $this->resetValidation();
    $this->currentPage=1;
    $this->formController(0);

        session()->flash( 'msg', ['icon'=>"<i class='fa fa-thumbs-up text-success'></i>",'message'=>"কাস্টমারের তথ্য যথাযথভাবে যুক্ত হয়েছে!",'alert'=>'success' ]);
        
}

public function goToNextPage()
{
    $this->validate($this->validationRules[$this->currentPage],$this->newCustomerErrMsgs() );
    if ( $this->currentPage < $this->pages ) {
        if ($this->currentPage!=2) {
            $this->currentPage++;
        }else{
            if(count(array_filter($this->designs_check))>0){

                if(count(array_filter($this->designs_check))>count(array_filter($this->design_fields))){
                    $filterOne = array_filter($this->designs_check);
                    $filterTwo = array_filter($this->design_fields);
                    foreach(array_keys($filterOne) as $item){
                        if(empty($this->design_fields[$item])){
                            $this->design_fields[$item]='  ';
                        }
                    }
                }
                $this->currentPage++;
            }elseif(count(array_filter($this->designs_check))==0){
                $this->dispatchBrowserEvent('alert', ['custom'=>"",'message' => "কিছু ডিজাইন যুক্ত করুণ!",'effect'=>'warning',]);
            }else{$this->dispatchBrowserEvent('alert', ['custom'=>"",'message' => "সঠিকভাবে ফিল্ডগুলো পূরণ করুন!",'effect'=>'warning']);}
        }

        // if($this->currentPage == 4){
        //     dd(count(array_filter($this->designs_check)) . ' = '. count(array_filter($this->design_fields)));
        // }
        
    }
    
}

public function goToPreviousPage()
{
    if($this->currentPage > 1 && $this->currentPage <= $this->pages ){
        $this->currentPage--;
    }
    
}

public function designStep()
{
    if ( count($this->designs_check) > 0 ) {
        $filterOne = array_filter($this->designs_check);
        $filterTwo = array_filter($this->design_fields);
    }else{
        $this->dispatchBrowserEvent('alert', ['custom'=>"",'message' => "কিছু ডিজাইন যুক্ত করুণ!",'effect'=>'warning',]);
    }
}

public function resetSuccess()
{
    $this->reset('success');
}
    public function submit()
{
    // $rules = collect($this->validationRules)->collapse()->toArray();

    // $this->validate($rules);

    // User::create([
    //     'name' => "{$this->firstName} {$this->lastName}",
    //     'email' => $this->email,
    //     'password' => bcrypt($this->password),
    // ]);

    // $this->reset();
    // $this->resetValidation();

    // $this->success = 'User created successfully!';
}
///////////////////Step form End
    public function render()
    {   
        if(empty($this->order_delivery)){$this->order_delivery='';}
        $this->wagesCalculation();
        if($this->fixed_size >0){$this->fixedsizeshow();}
        $orderItems = OrderItem::where('order_number', $this->order_number)->where('customer_id', $this->customer_id)->paginate(4);
        return view('livewire.customer.tailors-customer-order-items', compact('orderItems'))->layout('layouts.manage_layout');
    }
}