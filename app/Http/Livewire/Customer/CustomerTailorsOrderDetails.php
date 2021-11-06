<?php

namespace App\Http\Livewire\Customer;

use Carbon\Carbon;
use App\Models\Order;
use App\Models\Product;
use Livewire\Component;
use App\Models\Customer;
use App\Models\DesignItem;
use App\Tailors\TailorsTrait;
use Livewire\WithFileUploads;
use App\Models\OrderItemStyle;
use App\Models\StyleMeasurePart;

class CustomerTailorsOrderDetails extends Component
{
    use WithFileUploads;
    use TailorsTrait;
    public $errorOut, $customer_id, $Full_Name, $mobile, $email, $address, $country, $city, $province, $line1, $line2, $new_photo, $photo, $zipcode ;
    public $allproduct, $products;
    //Order
    public $delivery_date, $order_number, $collar_measure_type, $cloth_additional, $additional,$quantity,$subtotal,$discount,$delivery_charge,$delivery_system,$total,$delivered_date, $wages;//মজুরি
    //Order Item
    public $cloth_long,$cloth_body,$body_loose,$cloth_belly,$belly_loose,$cloth_enclosure,$hand_long ,$sleeve_enclosure,$sleeve_pasting ,$cloth_throat,$cloth_collar ,$cloth_shoulder ,$cloth_mora,$noke_shoho;
    public $currentStep = 1;
    public $name, $price, $detail, $stepstatus = 1, $status;
    public $successMsg = '', $hidesidebar;
    public $formErrorOne,$formErrorTwo, $formErrorThree;
    //style
    public $col_0,$col_1, $validOnlyFields, $designs_check=[],$design_fields=[];
    public $force_id,$confirm_mail;

    public function mount()//$customer_id
    {
        $this->Full_Name='Taher';
        $this->order_number='3';
        $this->mobile='12555555555';
        // $customer = Customer::find( $customer_id);
        // $this->customer_id      = $customer->id;
        // $this->Full_Name        = $customer->Full_Name;
        // $this->mobile           = $customer->mobile;
        // $this->email            = $customer->email;
        // $this->photo            = $customer->photo;
        // $this->address          = $customer->address;
        // $this->country          = $customer->country;
        // $this->city             = $customer->city;
        // $this->province         = $customer->province;
        // $this->line1            = $customer->line1;
        // $this->line2            = $customer->line2;
        // $this->zipcode          = $customer->zipcode;
    
    }

    ///////////////////////////////////////////////////////////////
    public function updated($fields)
    {
        $this->validateOnly($fields,[
            'delivery_date'     => 'required|date_format:Y-m-d|after_or_equal:'.$this->todayDate(),
            'order_number'      => 'required|numeric|min:1|unique:orders',
            'mobile'            => 'required|numeric|digits:11|unique:customers,mobile',
            'Full_Name'         => 'required|max:255|regex:/[a-zA-Z\s]/',
            'email'             =>  'email|unique:customers,email|nullable',
            //Measure
            'products'          => 'required',
            'additional'        => 'string|nullable',
            'cloth_long'        => 'required|numeric|min:5|max:100',
            'cloth_body'        => 'required|numeric|min:5|max:100',
            'body_loose'        => 'required|numeric|min:5|max:100',
            'cloth_belly'       => 'required|numeric|min:5|max:100',
            'belly_loose'       => 'nullable|numeric|min:5|max:100',
            'cloth_enclosure'   => 'required|numeric|min:5|max:100',
            'hand_long'         => 'required|numeric|min:5|max:100',
            'sleeve_enclosure'  => 'required|numeric|min:5|max:100',
            'sleeve_pasting'    => 'nullable|string',
            'cloth_throat'      => 'nullable|numeric|min:5|max:30',
            'cloth_collar'      => 'nullable|numeric|min:5|max:30',
            'cloth_additional'  => 'nullable|string',
            'cloth_shoulder'    => 'required|numeric|min:5|max:100',
            'cloth_mora'        => 'nullable|numeric|min:5|max:100',
            'noke_shoho'        => 'numeric|nullable|min:5|max:100',
            'photo'             => 'image|mimes:jpg,bmp,png|nullable',
        ],['Full_Name.regex' =>'নাম শুধুমাত্র অক্ষর। সংখ্যা গ্রহণযোগ্য নহে',"delivery_date.after_or_equal"=> "অবশ্যই ডেলিভারির তারিখ আজকের ($this->todayDate) তারিখ বা তার পরের তারিখ হবে।",
        'mobile.unique'=>'নম্বরটি পূর্ব নিবন্ধিত!','mobile.digits'=>'মোবাইল নম্বর অবশ্যই ১১ সংখ্যার হবে!', 'email.required'=>'বৈধ ইমেল হতে হবে','email.unique'=>'ইমেলটি পূর্ব নিবন্ধিত!',
        ]);
        if ( $this->confirm_mail ) {
            $this->validateOnly($fields,[
                'email'             =>  'required|email|unique:customers,email',
               ]);
    
        }
        
    }
    
    public function formCheckOne()
    {
        if ( $this->delivery_date == '' || $this->order_number=='' || $this->Full_Name=='' || $this->mobile=='') {//|| $this->products ==0
            $this->formErrorOne=1; 
        }else {
            if ($this->confirm_mail ==1 && $this->email=="") {
                $this->formErrorOne=1; 
            }else {
                $this->formErrorOne=0;
            }
        }
    }
    /**
     * Write code on Method
     */
    public function firstStepSubmit()
    {
        // $validatedData = $this->validate([
        //     'Full_Name' => 'required',
        //     'mobile' => 'required|numeric',
        //     'address' => 'required',
        // ]);
 
        $this->currentStep = 2;
    }
    public function formCheckTwo()
    {
        if ( $this->products=="" || $this->cloth_long =='' ||$this->cloth_body ==''||$this->body_loose ==''||$this->cloth_belly =='' || $this->cloth_enclosure ==''||$this->hand_long ==''||$this->sleeve_enclosure ==''||$this->cloth_shoulder  =='' || ( $this->cloth_throat=='' && $this->cloth_collar=='')) {//
            $this->formErrorTwo=1;
        }else {
            $this->formErrorTwo=0;
        }
    }
  
    /**
     * Write code on Method
     */
    public function secondStepSubmit()
    {
        $validatedData = $this->validate([
            'stepstatus' => 'required',
        ]);
  
        $this->currentStep = 3;
    }
    public function thirdStepSubmit()
    {
        $validatedData = $this->validate([
            'stepstatus' => 'required',
        ]);
  
        $this->currentStep = 4;
    }
    public function formCheckThree()
    {
        if ( $this->name =='' || $this->price=='') {
            $this->formErrorThree=1;

        }else {
            $this->formErrorThree=0;
        }
    }
    /**
     * Write code on Method
     */
    public function submitForm()
    {
        // Team::create([
        //     'name' => $this->Full_Name,
        //     'price' => $this->mobile,
        //     'detail' => $this->address,
        //     'stepstatus' => $this->stepstatus,
        // ]);
  
        $this->successMsg = 'Team successfully created.';
  
        $this->clearForm();
  
        $this->currentStep = 1;
    }
  
    /**
     * Write code on Method
     */
    public function back($step)
    {
        $this->currentStep = $step;    
    }
  
    /**
     * Write code on Method
     */
    public function clearForm()
    {
        $this->Full_Name = '';
        $this->mobile = '';
        $this->address = '';
        $this->stepstatus = 1;
    }
    public function sidebar()
    {
        $this->col_0 = 1;
    }
    ////////////////////////////////////////////////////////////////////////////////////
    public function WagesCalculation()
    {
        if ($this->wages != null && $this->quantity != null) {
            if($this->wages>0 || $this->quantity): $this->total = $this->quantity * $this->wages - ($this->discount ? $this->discount: 0)+ ($this->delivery_charge ? $this->delivery_charge: 0); endif;
        }
    }
    public $minOrderId, $maxOrderId;
    public function minMaxOrderId()
    {
        if(count(Order::all())>0 && ! $this->force_id){
            $this->minOrderId = Order::orderBy('id','DESC')->first()->order_number+1;
            $this->maxOrderId = Order::orderBy('id','DESC')->first()->order_number+1;
        }else if(! $this->force_id){
            $this->minOrderId=1;
            $this->maxOrderId=1;   
        }else{
            $this->minOrderId=$this->order_number;
            $this->maxOrderId=$this->order_number;  
        }
        
    }
    public function render()
    {
        
        $this->minMaxOrderId();
        $this->formCheckOne();
        $this->formCheckTwo();
        $this->formCheckThree();
        $styleGroup = StyleMeasurePart::all();
        $designItems = DesignItem::all();
        $allproducts = Product::all();
        $allOrders = Order::where('customer_id', $this->customer_id)->get();
        return view('livewire.customer.customer-tailors-order-details', compact('allproducts', 'allOrders', 'styleGroup', 'designItems'))->layout('layouts.manage_layout');
    }
}
