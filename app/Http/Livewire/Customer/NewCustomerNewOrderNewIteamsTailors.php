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

class NewCustomerNewOrderNewIteamsTailors extends Component
{
    use WithFileUploads;
    use TailorsTrait;
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
    public $collars_check=[], $sleeves_check=[], $cuffs_check=[], $plates_check=[], $pockets_check=[], $backs_check=[], $pipings_check=[], $zips_check=[], $sewings_check=[], $embroiderys_check=[], $karchupis_check=[], $others_check=[];
    public $collar_fields=[], $sleeve_fields=[], $cuff_fields=[], $plate_fields=[], $pocket_fields=[], $back_fields=[], $piping_fields=[], $zip_fields=[], $sewing_fields=[], $embroidery_fields=[], $karchupi_fields=[], $other_fields=[];
    public $collerFirstArea,$collerLastArea,$sleeveFirstArea,$sleeveLastArea,$cuffFirstArea,$cuffLastArea,$plateFirstArea,$plateLastArea,$pocketFirstArea,$pocketLastArea,$backFirstArea,$backLastArea,$pipingFirstArea,$pipingLastArea,$zipFirstArea,$zipLastArea,$sewingFirstArea,$sewingLastArea,$embroideryFirstArea,$embroideryLastArea,$karchupiFirstArea,$karchupiLastArea,$karchupotheriFirstArea,$otherLastArea;
    
    public function mount()
    {
        $this->Full_Name="Jaza";
        $this->mobile='65652564924';
        $this->delivery_date = '2021-11-25';
        // $this->delivery_date = Carbon::now('Asia/Dhaka')->format('Y-m-d');
        $this->country ='bd';
        $this->delivery_system ='byhand';
        $this->discount = 0;
        $this->advance = 0;
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
            'delivery_date'     => 'required|date|date_format:Y-m-d|after_or_equal:'.$this->todayDate(),
            'Full_Name'         => 'required|max:255|regex:/[a-zA-Z\s]/',
            'mobile'            => ['required','numeric','unique:customers','digits:11'],
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
            // 'design_fields.36'  => 'required',
            'cloth_additional'  => 'nullable|string',
            'wages'             => 'required|numeric',
            'quantity'          => 'min:1|required|numeric',
            'discount'          => 'nullable|numeric',
            'advance'          => 'nullable|numeric',
            'total'             => 'required|numeric',
        ],
        [
        'order_number.required' =>'অর্ডার নম্বর দিন!','order_number.unique' =>"$this->order_number নং অর্ডার পূর্ব নিবন্ধিত!",'order_number.numeric' =>'অর্ডার নম্বর শুধুমাত্র সংখ্যা!','order_number.max' =>$maxOrderNo." নং অর্ডার পূর্ব নিবন্ধিত!",
        'Full_Name.regex' =>'নাম শুধুমাত্র অক্ষর। সংখ্যা গ্রহণযোগ্য নহে','Full_Name.required' =>'নাম লিখুন!',//'order_number.max' =>"$this->maxOrderNo($this->order_number) নং অর্ডার পূর্ব নিবন্ধিত!",
        "delivery_date.required"=>'ডেলিভারির তারিখ দিন!',"delivery_date.date"=>'সঠিকভাবে তারিখ দিন!',"delivery_date.after_or_equal"=> "অবশ্যই ডেলিভারির তারিখ আজকের ($this->todayDate) তারিখ বা তার পরের তারিখ হবে।",
        'mobile.digits' =>'মোবাইল নম্বর অবশ্যই ১১ সংখ্যার হবে!','mobile.required' =>'মোবাইল নম্বর দিন!','mobile.unique' =>'মোবাইল নম্বর পূর্ব নিবন্ধিত!',
        'cloth_long.required' => 'লম্বার পরিমাপ দিন','cloth_enclosure.required' => 'ঘেরের পরিমাপ দিন','cloth_shoulder.required' => 'পুটের পরিমাপ দিন','hand_long.required' =>'হাতার লম্বার পরিমাপ দিন!',
        'quantity.required' => $this->products? Product::find($this->products)->name:''." পশাকের পরিমাপ দিন!",'email.unique' =>"<i class='fa fa-envelope'></i> ইমেইল অ্যাড্রেস পূর্ব নিবন্ধিত!",'email.email' =>"<i class='fa fa-envelope'></i> সঠিক ইমেইল অ্যাড্রেস দিন!",
        ]);
        if ($this->cloth_long !="" && $this->cloth_enclosure !="" && $this->hand_long !="" && $this->cloth_shoulder !="" && ($this->cloth_collar == ''  && $this->cloth_throat == '')  && $this->currentStep==2 ) {
            $this->validateOnly($fields, ['cloth_throat'          => 'required|string','cloth_collar'          => 'required|string', ],['cloth_throat.required'=>'গলার পরিমাপ করুণ!','cloth_collar.required' =>'কলারের পরিমাপ দিন!',]);
            
        }
        // if ($this->cloth_collar == ''  && $this->cloth_throat == ''  && $this->currentStep==2 ) {
        //     $this->validate( ['cloth_throat'          => 'required|string','cloth_collar'          => 'required|string', ]);
            
        // }elseif ($this->cloth_collar == ''  && $this->currentStep==2 ) {
        //     $this->validate( ['cloth_throat'          => 'required|string' ]);
            
        // }elseif ($this->cloth_throat == ''  && $this->currentStep==2 ) {
        //     $this->validate( ['cloth_collar'          => 'required|string' ]);
            
        // }

        // if ($this->cloth_throat) {
        //     $this->validate( ['cloth_collar'          => 'required|string']);
        // }

        if ( $this->confirm_mail ) {
            $this->validateOnly($fields,[
                'email'             =>  'required|email|unique:customers',
               ],['email.required' =>"<i class='fa fa-envelope'></i> ইমেইল অ্যাড্রেস দিন!",'email.unique' =>"<i class='fa fa-envelope'></i> ইমেইল অ্যাড্রেস পূর্ব নিবন্ধিত!",'email.email' =>"<i class='fa fa-envelope'></i> সঠিক ইমেইল অ্যাড্রেস দিন!", ]);
    
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
                'delivery_system'   => 'required|min:1',
                'courier_details'   =>  'required',
                'delivery_charge'   =>  'required',
                'country'           =>  'required',
                'city'              =>  'required',
                'province'          =>  'required',
                'zipcode'           =>  'required',
                'line1'             =>  'required',
            ]);
        }
    }
    /**
     * Write code on Method
     */
    public function firstStepSubmit()
    {
        $maxOrderNo=$this->maxOrderNoFixed($this->order_number);
        $this->validate([
            'delivery_date'     => 'required|date_format:Y-m-d|after_or_equal:'.$this->todayDate(),
            'Full_Name'         => 'required|max:255|regex:/[a-zA-Z\s]/',
            'mobile'            => 'required|numeric|unique:customers|digits:11',
            'photo'             => 'image|mimes:jpg,jpeg,png|nullable',
            'address'           => 'string|nullable',
            'email'             => 'email|unique:customers|nullable',
            'order_number'      => 'required|numeric|unique:orders|min:1|max:'.$this->maxOrderNoFixed($this->order_number),
        ],[
        'order_number.required' =>'অর্ডার নম্বর দিন!','order_number.numeric' =>'অর্ডার নম্বর শুধুমাত্র সংখ্যা!','order_number.unique' =>"$this->order_number নং অর্ডার পূর্ব নিবন্ধিত!",'order_number.max' =>$maxOrderNo." নং অর্ডার পূর্ব নিবন্ধিত!",'Full_Name.regex' =>'নাম শুধুমাত্র অক্ষর। সংখ্যা গ্রহণযোগ্য নহে',
        "delivery_date.required"=>'ডেলিভারির তারিখ দিন!',"delivery_date.after_or_equal"=> "অবশ্যই ডেলিভারির তারিখ আজকের ($this->todayDate) তারিখ বা তার পরের তারিখ হবে।",
        'mobile.digits' =>'মোবাইল নম্বর অবশ্যই ১১ সংখ্যার হবে!','mobile.required' =>'মোবাইল নম্বর দিন!','mobile.unique' =>'মোবাইল নম্বর পূর্ব নিবন্ধিত!',
        'email.required' =>'ইমেইল অ্যাড্রেস দিন!','email.unique' =>'ইমেইল অ্যাড্রেস পূর্ব নিবন্ধিত!', 'cloth_long' => 'লম্বার পরিমাপ দিন','cloth_enclosure' => 'ঘেরের পরিমাপ দিন','cloth_shoulder.required' => 'পুটের পরিমাপ দিন',
        'photo.image'=>'ছবি যুক্ত করুন','photo.mimes'=>'jpg অথবা jpeg অথবা png এর ছবি যুক্ত করুন',
        ]
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
            'order_sample_images.*'=>'image|mimes:jpg,jpeg,png|nullable',
            'products'          => 'required|numeric',
            //Measure
            
            'cloth_long'        => 'required',
            'cloth_enclosure'   => 'required',
            'hand_long'         => 'required',
            'collar_measure_type'=> 'numeric|nullable',
            'cloth_shoulder'    => 'required',
        ],
        [
            'order_sample_images.image'=>'ছবি যুক্ত করুন','order_sample_images.mimes'=>'jpg অথবা jpeg অথবা png এর ছবি যুক্ত করুন',
            'products.required'=>'পণ্য নির্বাচন করুণ!',
            'cloth_long.required' =>'লম্বার পরিমাপ দিন!','cloth_enclosure.required' =>"ঘেরের পরিমাপ দিন!",'hand_long.required' =>'হাতার লম্বার পরিমাপ দিন!','cloth_shoulder.required' =>"পুটের পরিমাপ দিন!",
        ]
        );
        if ($this->cloth_long !="" && $this->cloth_enclosure !="" && $this->hand_long !="" && $this->cloth_shoulder !="" && ($this->cloth_collar == ''  && $this->cloth_throat == '')  && $this->currentStep==2 ) {
            $this->validate(['cloth_throat'          => 'required|string','cloth_collar'          => 'required|string', ],
            ['cloth_throat.required'=>'গলার পরিমাপ করুণ!','cloth_collar.required' =>'কলারের পরিমাপ দিন!' ]
        );
            
        }

        $this->currentStep = 3;
    }

   
    public function designStepSubmit()
    {
        // dd(count($this->designs_check));
        if (count($this->designs_check)>0) {
            $filterOne = array_filter($this->designs_check);
            if(count(array_filter($this->designs_check))>0){

                $this->validate([
                    'designs_check'=>'required',
                ]);
                // $this->validate([
                //     'designs_check.3'=>'required',
                // ]);
                // $this->validate([
                //     'designs_check.42'=>'required',
                // ]);
                $this->currentStep = 4;
            }else {
                $this->dispatchBrowserEvent('alert', ['custom'=>"",'message' => "কিছু ডিজাইন যুক্ত করুণ!",'effect'=>'warning',]);
            }
            
        }else {
            // session()->flash( 'msg', "<i class='fas fa-exclamation-triangle text-danger'></i> কিছু ডিজাইন যুক্ত করুণ!,danger" );
            $this->dispatchBrowserEvent('alert', ['custom'=>"",'message' => "কিছু ডিজাইন যুক্ত করুণ!",'effect'=>'warning',]);
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
    public function fillEmptyStyleField($style_id){
        
        $this->TraitfillEmptyStyleField($style_id);
        
    }
    public function desingCheckedUpdate()
    {
        // $this->designs_check = count(array_values($this->designs_check));
    }
        
       
    public function placeOrder()
    {
        
        $this->validate([
            'delivery_date'     => 'required|date_format:Y-m-d|after_or_equal:'.$this->todayDate(),
            'Full_Name'         => 'required|max:255|regex:/[a-zA-Z\s]/',
            'mobile'            => 'required|numeric|unique:customers|digits:11',
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
            'wages'             => 'required|numeric',
            'quantity'          => 'min:1|required|numeric',
            'discount'          => 'nullable|numeric',
            'advance'          => 'nullable|numeric',
            'total'             => 'required|numeric',
        ],
        ['Full_Name.regex' =>'নাম শুধুমাত্র অক্ষর। সংখ্যা গ্রহণযোগ্য নহে',
        "delivery_date.after_or_equal"=> "অবশ্যই ডেলিভারির তারিখ আজকের ($this->todayDate()) তারিখ বা তার পরের তারিখ হবে।",
        'mobile.digits' =>'মোবাইল নম্বর অবশ্যই ১১ সংখ্যার হবে!'
        ]
    );

        if ( $this->confirm_mail ) {
            $this->validateOnly($fields,[
                'email'             =>  'required|email|unique:customers',
               ]);
    
        }
        
        //order delivery validation
        if ( $this->order_delivery ) {
            $this->validate([
                'delivery_system'   => 'required|min:1',
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
        // if (Customer::find($this->instand_customer)->photo) {
        //     $customer_image = "<img width='30' src='".asset("storage/assets/customers/".Customer::find($this->instand_customer)->photo)."'>";
        // }
        session()->flash( 'msg', ['icon'=>"<i class='fa fa-thumbs-up text-success'></i>",'message'=>"কাস্টমারের তথ্য যথাযথভাবে যুক্ত হয়েছে!",'alert'=>'success' ]);
        redirect()->route('new.customer');
        // usleep(1000000);
        // $this->dispatchBrowserEvent('alert', ['message' => "এর তথ্য যথাযথভাবে যুক্ত হয়েছে!",'effect'=>'success','custom'=>"$this->Full_Name",]);

    }
    
    public function showPreloader($param)
    {
        $this->showloader=$param;
    }
    public function fixedsizeshow()
    {
        if ( $this->fixed_size >0 && SizeChart::find($this->fixed_size)->count()>0 ) {
            $sizeData = SizeChart::find($this->fixed_size);$this->cloth_long = $sizeData->cloth_long;$this->body_loose = $sizeData->body_loose;$this->belly_loose = $sizeData->belly_loose;$this->cloth_enclosure = $sizeData->cloth_enclosure;$this->hand_long = $sizeData->hand_long;$this->sleeve_enclosure = $sizeData->sleeve_enclosure;$this->sleeve_pasting = $sizeData->sleeve_pasting;$this->cloth_collar = $sizeData->cloth_collar;$this->cloth_shoulder = $sizeData->cloth_shoulder;$this->cloth_mora = $sizeData->cloth_mora;$this->plate_fara = $sizeData->plate_fara;$this->noke_shoho = $sizeData->noke_shoho;$this->cloth_additional = $sizeData->cloth_additional;
        }
    }
    public function render()
    {
        if ($this->wages != null && $this->quantity != null) {
            if($this->wages>0 || $this->quantity): $this->total = $this->quantity * $this->wages - ($this->discount ? $this->discount: 0)+ ($this->delivery_charge ? $this->delivery_charge: 0); endif;
        }else {
            $this->total='';
        }
        
        $this->fixedsizeshow();
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
