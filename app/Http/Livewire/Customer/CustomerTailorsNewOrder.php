<?php
// ↓
namespace App\Http\Livewire\Customer;

use Carbon\Carbon;
use App\Models\Order;
use App\Models\OffDay;
use App\Models\Product;
use Livewire\Component;
use App\Models\Customer;
use App\Models\OrderItem;
use App\Models\DesignItem;
use Illuminate\Support\Str;
use App\Tailors\TailorsTrait;
use Livewire\WithFileUploads;
use App\Models\StyleMeasurePart;
use Illuminate\Support\Facades\Auth;
use Intervention\Image\Facades\Image;
use Illuminate\Support\Facades\Storage;

class CustomerTailorsNewOrder extends Component
{ use WithFileUploads;
    use TailorsTrait;
    public $errorOut, $customer_id, $Full_Name, $mobile, $email, $address, $country, $city, $province, $line1, $line2, $new_photo, $photo, $zipcode ;
    public $allproduct, $products, $weekendholiday, $new_customer_id=0;
    
    //Order
    public $delivery_date, $order_number, $collar_measure_type, $cloth_additional, $additional,$quantity=1,$subtotal,$discount=0,
    $delivery_charge,$delivery_system,$total,$delivered_date, $wages, $order_sample_images, $advance;//মজুরি
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
    public $every_dress_measurement_size;
    
    //Order
    public $validCustomMessage, $todayDate, $todayDay;

    public $personal_info_open, $delivery_policy, $selectedtypes,  $clothstyles, $define_key, $desingsIputKey=[], $designsresult, $date;
    
    
    

    public function mount($customer_id)//$customer_id
    {
        $customer = Customer::find($customer_id);
        $this->customer_id = $customer->id;
        $this->Full_Name=$customer->name;
        $this->order_number='3';
        $this->mobile='12555555555';

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
       $Order = Order::orderBy('id',"DESC")->first();
        if($this->force_id==1){
            $maxOrderNo = $this->order_number;
        }else{
            if(strlen($Order)>0){
                $maxOrderNo = $Order->order_number+1;
            }else{
                $maxOrderNo = 1;
            }
        }
        $this->validateOnly($fields,[
            'delivery_date'     => 'required|date_format:Y-m-d|after_or_equal:'.$this->todayDate(),
            'products'          => 'required',
            'email'             => 'email|unique:customers|nullable',
            
            
            //Measure
            'order_number'      => 'required|numeric|unique:orders|min:1|max:'.$maxOrderNo,
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
            'discount'          => 'nullable|numeric',
            'advance'          => 'nullable|numeric',
            'total'             => 'required|numeric',
        ],
        ['Full_Name.regex' =>'নাম শুধুমাত্র অক্ষর। সংখ্যা গ্রহণযোগ্য নহে',"delivery_date.after_or_equal"=> "অবশ্যই ডেলিভারির তারিখ আজকের ($this->todayDate) তারিখ বা তার পরের তারিখ হবে।",'mobile.digits' =>'মোবাইল নম্বর অবশ্যই ১১ সংখ্যার হবে!']
        );

        if ( $this->confirm_mail ) {
            $this->validateOnly($fields,[
                'email'             =>  'required|email|unique:customers',
               ]);
    
        }
        
        
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
    
    public function OrderInfoformCheck()
    {
        // if ( $this->delivery_date == '' || $this->order_number=='' || $this->Full_Name=='' || $this->mobile=='') {//|| $this->products ==0
        //     $this->formErrorOne=1; 
        // }else {
        //     if ($this->confirm_mail ==1 && $this->email=="") {
        //         $this->formErrorOne=1; 
        //     }else {
        //         $this->formErrorOne=0;
        //     }
        // }
    }
    /**
     * Write code on Method
     */
    public function firstStepSubmit()
    { 
        $this->currentStep = 2;
    }
    public function OrderItemMeasureformCheck()
    {
        if ( $this->products=="" || $this->cloth_long =='' || $this->cloth_enclosure ==''||$this->hand_long ==''||$this->cloth_shoulder  =='' || ( $this->cloth_throat=='' && $this->cloth_collar=='')) {//
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
        $this->currentStep = 3;
    }
    public function designStepSubmit()
    {  
        $this->currentStep = 4;
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
    
    public function WagesCalculation()
    {
        if ($this->wages != null && $this->quantity != null) {
            if($this->wages>0 || $this->quantity): $this->total = $this->quantity * $this->wages - ($this->discount ? $this->discount: 0)+ ($this->delivery_charge ? $this->delivery_charge: 0); endif;
        }else {
            $this->total='';
        }
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
        
        if ($style_id != null) {
            if (in_array($style_id,array_keys($this->designs_check), true) ) {
                if (in_array($style_id,array_keys($this->design_fields), true )) {
                    $this->design_fields[$style_id]=$this->design_fields[$style_id];
                }else {
                    $this->design_fields[$style_id]=' ';
                }
            }
           
            
        }
        
    }
    public function desingCheckedUpdate()
    {
        // $this->designs_check = count(array_values($this->designs_check));
    }
    public function placeOrder2()
    {
        //has sample photo
        if($this->order_sample_images){
            $customer->photo = $this->imageNameMake( $this->Full_Name, $this->photo );
            $this->uploadImage( $this->photo, 'customers', $customer->photo );
        }
    }
        
       
    public function placeOrder()
    {
        $Order = Order::orderBy('id',"DESC")->first();
        if($this->force_id==1){
            $maxOrderNo = $this->order_number;
        }else{
            if(strlen($Order)>0){
                $maxOrderNo = $Order->order_number+1;
            }else{
                $maxOrderNo = 1;
            }
        }
        $this->validate([
            'delivery_date'     => 'required|date_format:Y-m-d|after_or_equal:'.$this->todayDate(),
            'products'          => 'required',
            'email'             => 'email|unique:customers|nullable',
            
            
            //Measure
            'order_number'      => 'required|numeric|unique:orders|min:1|max:'.$maxOrderNo,
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
            'discount'          => 'nullable|numeric',
            'advance'           => 'nullable|numeric',
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
       

        $this->OrderIncluding($this->customer_id);
            
            session()->flash( 'msg', "<i class='fa fa-thumbs-up text-success'></i> কাস্টমারের তথ্য যথাযথভাবে যুক্ত হয়েছে!,success" );
        

        
    }
   
    
    public function render()
    {
        $this->desingCheckedUpdate();
        $this->minMaxOrderId();
        $this->OrderInfoformCheck();
        $this->OrderItemMeasureformCheck();
        $this->itemDesignFormCheck();
        $this->wagesFormCheck();
        $this->WagesCalculation();
        $styleGroup = StyleMeasurePart::all();
        $designItems = DesignItem::all();
        $allproducts = Product::all();
        $allOrders = Order::where('customer_id', $this->customer_id)->get();
        return view('livewire.customer.customer-tailors-new-order', compact('allproducts', 'allOrders', 'styleGroup', 'designItems'))->layout('layouts.manage_layout');
    }





}
