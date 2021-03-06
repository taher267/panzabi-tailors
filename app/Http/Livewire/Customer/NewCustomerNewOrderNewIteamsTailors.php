<?php

namespace App\Http\Livewire\Customer;

use Carbon\Carbon;
use App\Models\Order;
use App\Models\OffDay;
use App\Models\Product;
use Livewire\Component;
use App\Models\Customer;
use App\Models\OrderItem;
use App\Models\SizeChart;
use App\Models\DesignItem;
use App\Tailors\TailorsTrait;
use Livewire\WithFileUploads;
use App\Models\OrderItemStyle;
use App\Models\StyleMeasurePart;
use App\Models\OrderDeliveryAddress;
use Illuminate\Support\Facades\Auth;
use App\Tailors\TailorsErrorMsgTrait;

class NewCustomerNewOrderNewIteamsTailors extends Component
{
    use WithFileUploads;
    use TailorsTrait;
    use TailorsErrorMsgTrait;
    public $showloader;
    public $errorOut, $customer_id, $instand_customer, $Full_Name, $mobile, $email, $address, $country, $city, $province, $line1, $line2, $new_photo, $photo, $zipcode ;
    public $allproduct, $products, $weekendholiday;//$new_customer_id=0
    //Order
    public $delivery_date, $order_number, $collar_measure_type, $cloth_additional, $additional,$quantity=1,$subtotal,$discount=0,
    $delivery_charge,$delivery_system,$total,$delivered_date, $wages, $order_sample_images=[], $advance;//মজুরি
    //Order Item
    public $cloth_long,$cloth_body,$body_loose,$cloth_belly,$belly_loose,$cloth_enclosure,$hand_long ,$sleeve_enclosure,$sleeve_pasting ,
    $cloth_throat,$cloth_collar ,$cloth_shoulder ,$cloth_mora,$noke_shoho;
    public $currentStep = 1; public $minOrderId, $maxOrderId;
    public $name, $price, $detail, $stepstatus = 1, $status;
    public $successMsg = '', $hidesidebar;
    public $formErrorOne,$formErrorTwo, $cloothDesignOutpurResult;
    //style
    public $col_0,$col_1, $validOnlyFields, $designs_check=[],$design_fields=[];
    public $force_id,$confirm_mail;
    //Order Delivery
    public $order_delivery, $courier_details, $wagesOutpurResult;



    public $user_id,  $order_date, $selected_product, $couriar_details;
    public $every_dress_measurement_size, $fixed_size;
    
    //Order
    public $validCustomMessage, $todayDate, $todayDay;

    public $personal_info_open, $delivery_policy, $selectedtypes,  $clothstyles, $define_key, $desingsIputKey=[], $designsresult, $date,$test;
    
    public $errMessages = [
        'customer'=>[
            
            
        ],'delivery'=>[
            'delivery_system.required'=> 'সন্দেহজনক, আপনি কি করতে চাচ্ছেন???','delivery_system.min'=> 'সন্দেহজনক, আপনি কি করতে চাচ্ছেন???',
            'courier_details.required'=> 'কুরিয়ার সম্পর্কে বিস্তারিত লিখুন','delivery_charge.required'=> 'ডেলিভারি চার্জ লিখুন',
            'delivery_charge.numeric'=> 'সন্দেহজনক! ডেলিভারি চার্জ নম্বর হবে','country.required'=> 'দেশের নাম সিলেক্ট করুন',
            'city.required'=> 'শহরের নাম লিখুন','province.required'=> 'প্রদেশের নাম লিখুন','zipcode.required'=> 'জিপ কোড লিখুন','line1.required'=> 'বাড়ি নং,গ্রাম/মহল্লা সড়ক নং লিখুন',
        ],'measurement'=>[
            'products.required'=>'পণ্য নির্বাচন করুণ!','cloth_enclosure.required' => 'ঘেরের পরিমাপ দিন','hand_long.required' =>'হাতার লম্বার পরিমাপ দিন!','cloth_shoulder.required' => 'পুটের পরিমাপ দিন',
            'order_sample_images.image'=>'ছবি যুক্ত করুন','cloth_long.required' => 'লম্বার পরিমাপ দিন','order_sample_images.mimes'=>'jpg অথবা jpeg অথবা png এর ছবি যুক্ত করুন',
            
        ],'wages'=>[
            'wages.required'=> "মজুরি লিখুন!",'wages.numeric'=> "মজুরি শুধুমাত্র নম্বর !",'discount.numeric'=> "ডিসকাউন্ট নম্বর হবে!",'advance.numeric'=> "অ্যাডভান্স নম্বর হবে!",'total.required'=> "মোট মজুরি দিন!",'total.numeric'=> "মোট মজুরি নম্বর হবে!",
        ],
    ];
    public function mount()
    {
        $this->Full_Name="মজুরি";
        $this->mobile= "01".rand();
        $dt =date( "Y-m-d");
        $this->delivery_date = date( "Y-m-d", strtotime( date( "Y-m-d")." +10 days" ) );
        $this->fixed_size = 1;
        $this->products = 1;
        // $this->delivery_date = Carbon::now('Asia/Dhaka')->format('Y-m-d');
        $this->country ='bd';
        
        $this->discount = 0;
        $this->advance = 0;
            $this->delivery_system =2;
        $lastOrder = Order::orderBy('id',"DESC")->first();
        
        if( $lastOrder== null){
        $this->order_number =1;
        }else{
            $this->order_number = $lastOrder->order_number+1;   
        }
        $this->date = $this->todayDate();
         
        if (OffDay::where('purpose',"weekendholiday")->first() !=null) {
            $lastOrder = OffDay::where('purpose',"weekendholiday")->first()->name_of_day;
            $this->weekendholiday=$lastOrder;
        }

        

    }

    public function updated($fields)
    {
        $maxOrderNo=$this->maxOrderNoFixed($this->order_number);


        $this->validateOnly($fields,[
            'delivery_date'     => 'required|date|date_format:Y-m-d|after:yesterday',
            // 'delivery_date'     => 'required|date|date_format:Y-m-d|after_or_equal:'.$this->todayDate(),
            'Full_Name'         => 'required|max:150|string',
            'mobile'            => 'required|unique:customers|numeric|digits:11',
            // 'mobile'            => 'required|unique:customers|regex:/^(\+88)?(88)?01([0-9]){9}$/',
            'photo'             => 'image|mimes:jpg,jpeg,png|nullable',
            'order_sample_images.*'=>'image|mimes:jpg,jpeg,png|nullable',
            'address'           => 'string|nullable',
            'email'             => 'email|unique:customers|nullable',
            //Measure
            'products'          => 'required|numeric',
            'order_number'      => 'required|numeric|unique:orders|min:1|max:'.$this->maxOrderNoFixed($this->order_number),
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
            'designs_check.*'   => 'nullable',
            'design_fields.*'   => 'nullable',
            'cloth_additional'  => 'nullable|string',
            'wages'             => 'integer|numeric|gt:0',
            'quantity'          => 'gt:0|required|numeric',
            'discount'          => 'nullable|numeric',
            'advance'          => 'nullable|numeric',
            'total'             => 'required|numeric',
        ], 
        [
            'order_number.unique' =>"$this->order_number নং অর্ডার পূর্ব নিবন্ধিত!",'order_number.max' =>$maxOrderNo." নং অর্ডার পূর্ব নিবন্ধিত!",
            "delivery_date.after"=> "অবশ্যই ডেলিভারির তারিখ আজকের ($this->todayDate) তারিখ বা তার পরের তারিখ হবে।",
            'quantity.required' => ($this->products ? Product::find($this->products)->name:'')." পশাকের পরিমাপ দিন!",'quantity.numeric' => ($this->products? Product::find($this->products)->name:'')." পরিমাণ নম্বর হবে!",
            "delivery_date.required"=>'ডেলিভারির তারিখ দিন!',"delivery_date.date"=>'সঠিকভাবে তারিখ দিন!','Full_Name.regex' =>'নাম শুধুমাত্র অক্ষর। সংখ্যা গ্রহণযোগ্য নহে','Full_Name.required' =>'নাম লিখুন!',
            'order_number.numeric' =>'অর্ডার নম্বর শুধুমাত্র সংখ্যা!','order_number.required' =>'অর্ডার নম্বর দিন!','email.email' =>"<i class='fa fa-envelope'></i> সঠিক ইমেইল অ্যাড্রেস দিন!",
            'mobile.regex' =>'সঠিক মোবাইল নম্বর দিন!','mobile.digits' =>'মোবাইল নম্বর ১১ সংখ্যার হবে!','mobile.required' =>'মোবাইল নম্বর দিন!','mobile.unique' =>'মোবাইল নম্বর পূর্ব নিবন্ধিত!','email.required' =>"<i class='fa fa-envelope'></i> ইমেইল অ্যাড্রেস দিন!",
            'email.unique' =>"<i class='fa fa-envelope'></i> ইমেইল অ্যাড্রেস পূর্ব নিবন্ধিত!",

            'delivery_system.required'=> 'সন্দেহজনক, আপনি কি করতে চাচ্ছেন???','delivery_system.min'=> 'সন্দেহজনক, আপনি কি করতে চাচ্ছেন???',
            'courier_details.required'=> 'কুরিয়ার সম্পর্কে বিস্তারিত লিখুন','delivery_charge.required'=> 'ডেলিভারি চার্জ লিখুন',
            'delivery_charge.numeric'=> 'সন্দেহজনক! ডেলিভারি চার্জ নম্বর হবে','country.required'=> 'দেশের নাম সিলেক্ট করুন',
            'city.required'=> 'শহরের নাম লিখুন','province.required'=> 'প্রদেশের নাম লিখুন','zipcode.required'=> 'জিপ কোড লিখুন','line1.required'=> 'বাড়ি নং,গ্রাম/মহল্লা সড়ক নং লিখুন',
            'products.required'=>'পণ্য নির্বাচন করুণ!','cloth_enclosure.required' => 'ঘেরের পরিমাপ দিন','hand_long.required' =>'হাতার লম্বার পরিমাপ দিন!','cloth_shoulder.required' => 'পুটের পরিমাপ দিন',
            'order_sample_images.image'=>'ছবি যুক্ত করুন','cloth_long.required' => 'লম্বার পরিমাপ দিন','order_sample_images.mimes'=>'jpg অথবা jpeg অথবা png এর ছবি যুক্ত করুন',
            'wages.required'=> "মজুরি লিখুন!",'wages.numeric'=> "মজুরি শুধুমাত্র নম্বর !",'discount.numeric'=> "ডিসকাউন্ট নম্বর হবে!",'advance.numeric'=> "অ্যাডভান্স নম্বর হবে!",'total.required'=> "মোট মজুরি দিন!",'total.numeric'=> "মোট মজুরি নম্বর হবে!",
        ],);
        if (! empty($this->cloth_long) &&  !empty($this->cloth_enclosure) && !empty($this->hand_long) && $this->cloth_shoulder !="" && (empty($this->cloth_collar) && empty($this->cloth_throat)) && $this->currentStep==2 ) {
            $this->validateOnly($fields, ['cloth_throat'          => 'required|string','cloth_collar'          => 'required|string', ],['cloth_throat.required'=>'গলার পরিমাপ করুণ!','cloth_collar.required' =>'কলারের পরিমাপ দিন!',]);
            
        }
        
        if (count($this->design_fields)>0) {
            $filterOne = array_filter($this->design_fields);
            if(count(array_filter($this->design_fields))>0){

                // for ($i=0; $i <count(array_keys($filterOne)); $i++) {
                //     $validate = $this->validateOnly($fields,[
                //         "designs_check.".array_keys($filterOne)[$i] => "required",

                //     ]);
                    
                // }
            }
            
        }
        // $this->validateOnly($propertyName, $this->validationRules[$this->currentPage]);
        
        //order delivery validation
        if ( $this->order_delivery ) {
            $this->validateOnly($fields,[
                'delivery_system'   => 'required|gt:0',
                'courier_details'   =>  'required',
                'delivery_charge'   =>  'required|numeric',
                'country'           =>  'required',
                'city'              =>  'required',
                'province'          =>  'required',
                'zipcode'           =>  'required',
                'line1'             =>  'required',
            ],
            $this->errMessages['delivery'],
        );
        }
    }
    /**
     * Write code on Method
     */
    public function firstStepSubmit()
    {
        $maxOrderNo=$this->maxOrderNoFixed($this->order_number);
        $this->validate([
            'delivery_date'     => 'required|date_format:Y-m-d|after:yesterday',
            'Full_Name'         => 'required|max:150|string',
            'mobile'            => 'required|unique:customers|numeric|digits:11',
            // 'mobile'            => 'required|unique:customers|regex:/^(\+88)?(88)?01([0-9]){9}$/',
            'photo'             => 'image|mimes:jpg,jpeg,png|nullable',
            'address'           => 'string|nullable',
            'email'             => 'email|unique:customers|nullable',
            'order_number'      => 'required|numeric|unique:orders|min:1|max:'.$this->maxOrderNoFixed($this->order_number),
        ],[
            'order_number.unique' =>"$this->order_number নং অর্ডার পূর্ব নিবন্ধিত!",'order_number.max' =>$maxOrderNo." নং অর্ডার পূর্ব নিবন্ধিত!",
            "delivery_date.after"=> "অবশ্যই ডেলিভারির তারিখ আজকের ($this->todayDate) তারিখ বা তার পরের তারিখ হবে।",
            'mobile.regex' =>'সঠিক মোবাইল নম্বর দিন!','mobile.digits' =>'মোবাইল নম্বর ১১ সংখ্যার হবে!','mobile.unique' =>'মোবাইল নম্বর পূর্ব নিবন্ধিত!',]
    );
        $this->currentStep = 2;
    }
    public function OrderItemMeasureformCheck()
    {
        // if ( $this->products=="" || $this->cloth_long =='' || $this->cloth_enclosure ==''||$this->hand_long ==''||$this->cloth_shoulder  =='' || ( $this->cloth_throat=='' && $this->cloth_collar=='')) {//
        //     $this->formErrorTwo=1;
        // }else {
        //     $this->formErrorTwo=0;
        // }
    }
  
    /**
     * Write code on Method
     */
    public function measurementSubmit()
    {
        $this->validate([
            'order_sample_images.*' =>'image|mimes:jpg,jpeg,png|nullable',
            'products'              => 'required|numeric',            
            'cloth_long'            => 'required',
            'cloth_enclosure'       => 'required',
            'hand_long'             => 'required',
            'collar_measure_type'   => 'numeric|nullable',
            'cloth_shoulder'        => 'required'],
        );
        if ($this->cloth_long !=" " && $this->cloth_enclosure !=" " && $this->hand_long !=" " && $this->cloth_shoulder !=" " && ($this->cloth_collar == ''  && $this->cloth_throat == '')  && $this->currentStep==2 ) {
            $this->validate(['cloth_throat'          => 'required|string','cloth_collar'          => 'required|string', ],
        );
            
        }

        $this->currentStep = 3;
    }

    public function checkAndValueFieldMatching()
    {
        $checkFilter = array_filter($this->designs_check);
        if ( count($checkFilter) > 0 ) {
            $filter1 = array_filter($this->designs_check);
            $filter2 = array_filter($this->design_fields);
            $newArr = [];
            $firstKeyofArr = array_keys($filter1);
            for ($i=0; $i < count($filter1); $i++) {
                if (in_array($firstKeyofArr[$i], array_keys($filter2))) {
                $newArr[$firstKeyofArr[$i]]=$filter2[$firstKeyofArr[$i]];
                }else {
                    $newArr[$firstKeyofArr[$i]]=""; 
                }
            }
           return $newArr;

        }else {
            // session()->flash( 'msg', "<i class='fas fa-exclamation-triangle text-danger'></i> কিছু ডিজাইন যুক্ত করুণ!,danger" );
            $this->dispatchBrowserEvent('alert', ['custom'=>"",'message' => "লাল রঙের বক্স গুলো <i class='fa fa-check text-success'></i> দিন! </span>",'effect'=>'warning',]);
        }
    }
   
    public function designStepSubmit()
    {
        if( count(array_filter($this->designs_check)) > 0 && count($this->design_fields) > 0 && count(array_filter($this->designs_check)) == count($this->design_fields) ){
        $this->currentStep = 4;
    
        }else {
            if (count(array_filter($this->designs_check))=== 0 && count(array_filter($this->design_fields)) === 0) {
                $this->dispatchBrowserEvent('alert', ['custom'=>"",'message' => "কিছু ডিজাইন যুক্ত করুণ!",'effect'=>'warning',]);
            }
            else {
                $this->checkAndValueFieldMatching();
            }
        }

       
        
        
        
    }
    public function itemDesignFormCheck()
    {
        $filtered=array_filter(array_values($this->designs_check));
        if ( count(array_values($this->designs_check)) == 0 && count($filtered)==0) {
            $this->cloothDesignOutpurResult=1;

        }else {
            
            if (count(array_filter(array_values($this->designs_check)))==0) {
                $this->cloothDesignOutpurResult=1;
            }else {
                $this->cloothDesignOutpurResult=0;
            }
        }
    }

    /**
     * wages
     */
    public function wagesStepSubmit()
    {  
        $this->currentStep = 5;
    }
    public function wagesFormCheck()
    {
        
        if ( $this->quantity == "" || $this->wages == "" || $this->total == "") {
            $this->wagesOutpurResult=1;
        }else {
            if($this->order_delivery==1 && ( $this->delivery_system == "" 
            || $this->delivery_charge == "" ||  $this->courier_details== "" ||  $this->country== "" ||  $this->line1== "" ||  $this->city== "" ||  $this->province 
           == "" ||  $this->zipcode == "" )){
            $this->wagesOutpurResult=1;
           }
            else {
                $this->wagesOutpurResult=0;
            }
        }   
    }
    /**
     * Preview Page/Step
     */
    public function previewStepSubmit()
    {  
        $this->currentStep = 6;
    }
    /**
     * Write code on Method
     */
    public function submitForm()
    {
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
    
    public function minMaxOrderId()
    {
        if( count(Order::all())>0 && ! $this->force_id ){
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

    public function fillEmptyStyleCheck($style_detail_id)
    {
        // $this->TraitFillEmptyStyleCheck($style_detail_id);
    }

    public function fillEmptyStyleField($style_id){
        
        $this->TraitfillEmptyStyleField($style_id);
        
    }
    public function desingCheckedUpdate()
    {
        // $this->designs_check = count(array_values($this->designs_check));
    }
        
       
    public function placeOrder()
    {
        $maxOrderNo=$this->maxOrderNoFixed($this->order_number);        
        $this->validate([
            'delivery_date'     => 'required|date_format:Y-m-d|after:yesterday',
            
            'Full_Name'         => 'required|max:150|string',
            'mobile'            => 'required|unique:customers|numeric|digits:11',
            // 'mobile'            => 'required|unique:customers|regex:/^(\+88)?(88)?01([0-9]){9}$/',
            'photo'             => 'image|mimes:jpg,jpeg,png|nullable',
            'order_sample_images.*'=>'image|mimes:jpg,jpeg,png|nullable',
            'address'           => 'string|nullable',
            'products'          => 'required',
            'email'             => 'email|unique:customers|nullable',
            //Measure
            'order_number'      => 'required|numeric|unique:orders|min:1|max:'.$this->maxOrderNoFixed($this->order_number),
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
            'designs_check.*'   => 'nullable',
            'design_fields.*'   => 'nullable',
            'cloth_additional'  => 'nullable|string',            
            'wages'             => 'required|integer|min:1',
            'quantity'          => 'min:1|required|numeric',
            'discount'          => 'nullable|numeric',
            'advance'          => 'nullable|numeric',
            'total'             => 'required|numeric',
        ],
        [
            'order_number.unique' =>"$this->order_number নং অর্ডার পূর্ব নিবন্ধিত!",'order_number.max' =>$maxOrderNo." নং অর্ডার পূর্ব নিবন্ধিত!",
            "delivery_date.after"=> "অবশ্যই ডেলিভারির তারিখ আজকের ($this->todayDate) তারিখ বা তার পরের তারিখ হবে।",
            'quantity.required' => ($this->products ? Product::find($this->products)->name:'')." পশাকের পরিমাপ দিন!",'quantity.numeric' => ($this->products? Product::find($this->products)->name:'')." পরিমাণ নম্বর হবে!",
            "delivery_date.required"=>'ডেলিভারির তারিখ দিন!',"delivery_date.date"=>'সঠিকভাবে তারিখ দিন!','Full_Name.regex' =>'নাম শুধুমাত্র অক্ষর। সংখ্যা গ্রহণযোগ্য নহে','Full_Name.required' =>'নাম লিখুন!',
            'order_number.numeric' =>'অর্ডার নম্বর শুধুমাত্র সংখ্যা!','order_number.required' =>'অর্ডার নম্বর দিন!','email.email' =>"<i class='fa fa-envelope'></i> সঠিক ইমেইল অ্যাড্রেস দিন!",
            'mobile.regex' =>'সঠিক মোবাইল নম্বর দিন!','mobile.digits' =>'মোবাইল নম্বর ১১ সংখ্যার হবে!','mobile.required' =>'মোবাইল নম্বর দিন!','mobile.unique' =>'মোবাইল নম্বর পূর্ব নিবন্ধিত!','email.required' =>"<i class='fa fa-envelope'></i> ইমেইল অ্যাড্রেস দিন!",
            'email.unique' =>"<i class='fa fa-envelope'></i> ইমেইল অ্যাড্রেস পূর্ব নিবন্ধিত!",

            'delivery_system.required'=> 'সন্দেহজনক, আপনি কি করতে চাচ্ছেন???','delivery_system.min'=> 'সন্দেহজনক, আপনি কি করতে চাচ্ছেন???',
            'courier_details.required'=> 'কুরিয়ার সম্পর্কে বিস্তারিত লিখুন','delivery_charge.required'=> 'ডেলিভারি চার্জ লিখুন',
            'delivery_charge.numeric'=> 'সন্দেহজনক! ডেলিভারি চার্জ নম্বর হবে','country.required'=> 'দেশের নাম সিলেক্ট করুন',
            'city.required'=> 'শহরের নাম লিখুন','province.required'=> 'প্রদেশের নাম লিখুন','zipcode.required'=> 'জিপ কোড লিখুন','line1.required'=> 'বাড়ি নং,গ্রাম/মহল্লা সড়ক নং লিখুন',
            'products.required'=>'পণ্য নির্বাচন করুণ!','cloth_enclosure.required' => 'ঘেরের পরিমাপ দিন','hand_long.required' =>'হাতার লম্বার পরিমাপ দিন!','cloth_shoulder.required' => 'পুটের পরিমাপ দিন',
            'order_sample_images.image'=>'ছবি যুক্ত করুন','cloth_long.required' => 'লম্বার পরিমাপ দিন','order_sample_images.mimes'=>'jpg অথবা jpeg অথবা png এর ছবি যুক্ত করুন',
            'wages.required'=> "মজুরি লিখুন!",'wages.numeric'=> "মজুরি শুধুমাত্র নম্বর !",'discount.numeric'=> "ডিসকাউন্ট নম্বর হবে!",'advance.numeric'=> "অ্যাডভান্স নম্বর হবে!",'total.required'=> "মোট মজুরি দিন!",'total.numeric'=> "মোট মজুরি নম্বর হবে!",
        ],);
        if (! empty($this->cloth_long) &&  !empty($this->cloth_enclosure) && !empty($this->hand_long) && $this->cloth_shoulder !="" && (empty($this->cloth_collar) && empty($this->cloth_throat)) && $this->currentStep==2 ) {
            $this->validateOnly($fields, ['cloth_throat'          => 'required|string','cloth_collar'          => 'required|string', ],['cloth_throat.required'=>'গলার পরিমাপ করুণ!','cloth_collar.required' =>'কলারের পরিমাপ দিন!',]);
            
        }

        if ( $this->confirm_mail ) {
            $this->validateOnly($fields,[
                'email'             =>  'required|email|unique:customers',
               ]);
    
        }
        
        //order delivery validation
        if ( $this->order_delivery ) {
            $this->validate([
                'delivery_system'   => 'required|gt:0',
                'courier_details'   =>  'required',
                'delivery_charge'   =>  'required',
                'country'           =>  'required',
                'city'              =>  'required',
                'province'          =>  'required',
                'zipcode'           =>  'required',
                'line1'             =>  'required',
            ]);
        }
       
        $this->OrderIncluding();

        session()->flash( 'msg', ['icon'=>"<i class='fa fa-thumbs-up text-success'></i>",'message'=>"কাস্টমারের তথ্য যথাযথভাবে যুক্ত হয়েছে!",'alert'=>'success' ]);
        redirect()->route('new.customer');
        // usleep(1000000);
        // $this->dispatchBrowserEvent('alert', ['message' => "এর তথ্য যথাযথভাবে যুক্ত হয়েছে!",'effect'=>'success','custom'=>"$this->Full_Name",]);

    }
    
    public function showPreloader($param)
    {
        $this->showloader=$param;
    }
    public function render()
    {
        if ($this->wages != null && is_numeric($this->wages) && $this->quantity != null && is_numeric($this->quantity)) {
            if($this->wages>0 || $this->quantity): $this->total = $this->quantity * $this->wages - ($this->discount ? $this->discount: 0)+ (($this->delivery_charge && is_numeric($this->delivery_charge)) ? $this->delivery_charge: 0); endif;
        }else {
            $this->total='';
        }
        
        if($this->fixed_size>0){$this->fixedsizeshow();}
        $this->desingCheckedUpdate();
        $this->minMaxOrderId();
        $this->OrderItemMeasureformCheck();
        $this->itemDesignFormCheck();
        $this->wagesFormCheck();
        $styleGroup = StyleMeasurePart::all();
        $designItems = DesignItem::all();
        $allproducts = Product::all();
        
        $allOrders = Order::where('customer_id', $this->customer_id)->get();
        return view('livewire.customer.new-customer-new-order-new-iteams-tailors', compact('allproducts', 'allOrders', 'styleGroup', 'designItems'))->layout('layouts.manage_layout');
    }
}
