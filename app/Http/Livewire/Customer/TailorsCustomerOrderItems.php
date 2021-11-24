<?php

namespace App\Http\Livewire\Customer;

use App\Models\Order;
use Livewire\Component;
use App\Models\Customer;
use App\Models\OrderItem;
use Livewire\WithPagination;
use App\Tailors\TailorsTrait;
use Livewire\WithFileUploads;

class TailorsCustomerOrderItems extends Component
{   
    use WithFileUploads;
    use WithPagination;
    use TailorsTrait;
    public $formId, $currentPage = 1, $success;
    //Order Item
    public $products, $cloth_long,$cloth_body,$body_loose,$cloth_belly,$belly_loose,$cloth_enclosure,$hand_long ,$sleeve_enclosure,$sleeve_pasting ,
    $cloth_throat,$cloth_collar ,$cloth_shoulder ,$cloth_mora,$noke_shoho, $cloth_additional,$collar_measure_type, $fixed_size,$order_sample_images;

    public $customer_id,$Full_Name, $order_id, $order_number, $wages, $discount, $delivery_system, $courier_details, $delivery_charge, $total, $status, $delivered_date;
    public function mount($customer_id, $order_number)
    {
        $customer = Customer::find($customer_id);
        $this->customer_id = $customer->id;
        $this->Full_Name = $customer->Full_Name;

        $order = Order::find($order_number);
        $this->order_number     = $order->order_number;
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
    public function formController($params)
    {
        $this->formId = $params;
    }
    /**step form ////////////////////////////*/
    public $pages =5;

    public $pages2 = [
        1 => [
            'heading' => 'Personal Information',
            'subheading' => 'Enter your name and email to get started.',
        ],
        2 => [
            'heading' => 'Password',
            'subheading' => 'Create a password for the new account.',
        ],
        3 => [
            'heading' => 'Password3',
            'subheading' => 'Create a password for the new account.3',
        ],
        4 => [
            'heading' => 'Password4',
            'subheading' => 'Create a password for the new account.4',
        ],
        5 => [
            'heading' => 'Password5',
            'subheading' => 'Create a password for the new account.5',
        ],
    ];
    
    private $validationRules = [
        1 => [
            'products'          => 'required|numeric:gt:0',
            'cloth_long'        => 'required',
            'cloth_body'        => 'nullable',
            'body_loose'        => 'nullable',
            'cloth_belly'       => 'nullable',
            'belly_loose'       => 'nullable',
            'cloth_enclosure'   => 'required',
            'hand_long'         => 'required',
            'sleeve_enclosure'  => 'nullable',
            'sleeve_pasting'    => 'nullable|string',
            'cloth_throat'      => 'nullable',
            'cloth_collar'      => 'nullable',
            'collar_measure_type'=> 'numeric|nullable',
            'cloth_shoulder'    => 'required',
            'cloth_mora'        => 'nullable',
            'noke_shoho'        => 'nullable',
            // 'designs_check.*'   => 'nullable',
            // 'design_fields.*'   => 'nullable',
            'cloth_additional'  => 'nullable|string',
            // 'wages'             => 'integer|numeric|gt:0',
            // 'quantity'          => 'gt:0|required|numeric',
            // 'discount'          => 'nullable|numeric',
            // 'advance'          => 'nullable|numeric',
            // 'total'             => 'required|numeric',
        ],
        2 => [
            'password' => ['required', 'string', 'min:8'],
            'confirmPassword' => ['required', 'string', 'same:password', 'min:8'],
        ],
        3 => [
            'password' => ['required', 'string', 'min:8'],
            'confirmPassword' => ['required', 'string', 'same:password', 'min:8'],
        ],
        4 => [
            'password' => ['required', 'string', 'min:8'],
            'confirmPassword' => ['required', 'string', 'same:password', 'min:8'],
        ],
        5 => [
            'password' => ['required', 'string', 'min:8'],
            'confirmPassword' => ['required', 'string', 'same:password', 'min:8'],
        ],
    ];
    public function updated($fields)
{
    $this->validateOnly($fields, $this->validationRules[$this->currentPage],[
            'email.email' =>"<i class='fa fa-envelope'></i> সঠিক ইমেইল অ্যাড্রেস দিন!",
            'email.required' =>"<i class='fa fa-envelope'></i> ইমেইল অ্যাড্রেস দিন!",
            'email.unique' =>"<i class='fa fa-envelope'></i> ইমেইল অ্যাড্রেস পূর্ব নিবন্ধিত!",

            'delivery_system.required'=> 'সন্দেহজনক, আপনি কি করতে চাচ্ছেন???','delivery_system.min'=> 'সন্দেহজনক, আপনি কি করতে চাচ্ছেন???',
            'courier_details.required'=> 'কুরিয়ার সম্পর্কে বিস্তারিত লিখুন','delivery_charge.required'=> 'ডেলিভারি চার্জ লিখুন',
            'delivery_charge.numeric'=> 'সন্দেহজনক! ডেলিভারি চার্জ নম্বর হবে','country.required'=> 'দেশের নাম সিলেক্ট করুন',
            'city.required'=> 'শহরের নাম লিখুন','province.required'=> 'প্রদেশের নাম লিখুন','zipcode.required'=> 'জিপ কোড লিখুন','line1.required'=> 'বাড়ি নং,গ্রাম/মহল্লা সড়ক নং লিখুন',
            'products.required'=>'পণ্য নির্বাচন করুণ!','cloth_enclosure.required' => 'ঘেরের পরিমাপ দিন','hand_long.required' =>'হাতার লম্বার পরিমাপ দিন!','cloth_shoulder.required' => 'পুটের পরিমাপ দিন',
            'order_sample_images.image'=>'ছবি যুক্ত করুন','cloth_long.required' => 'লম্বার পরিমাপ দিন','order_sample_images.mimes'=>'jpg অথবা jpeg অথবা png এর ছবি যুক্ত করুন',
            'wages.required'=> "মজুরি লিখুন!",'wages.numeric'=> "মজুরি শুধুমাত্র নম্বর !",'discount.numeric'=> "ডিসকাউন্ট নম্বর হবে!",'advance.numeric'=> "অ্যাডভান্স নম্বর হবে!",'total.required'=> "মোট মজুরি দিন!",'total.numeric'=> "মোট মজুরি নম্বর হবে!",
    ]);
}
public function placeIteam()
{
    dd('Placed');
}

public function goToNextPage()
{
    // $this->validate($this->validationRules[$this->currentPage]);
    if ( $this->currentPage < $this->pages ) {
        $this->currentPage++;
    }else{$this->currentPage=$this->currentPage;}
    
}

public function goToPreviousPage()
{
    if($this->currentPage > 1 && $this->currentPage <= $this->pages ){
        $this->currentPage--;
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
        $orderItems = OrderItem::where('order_number', $this->order_number)->where('customer_id', $this->customer_id)->get();
        return view('livewire.customer.tailors-customer-order-items', compact('orderItems'))->layout('layouts.manage_layout');
    }
}


//`order_number`, `wages`, `discount`, `delivery_system`, `courier_details`, `delivery_charge`, `total`, `status`, `delivered_date`