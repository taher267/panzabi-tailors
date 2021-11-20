<?php

namespace App\Http\Livewire\Customer;

use Carbon\Carbon;
use App\Models\Order;
use App\Models\Product;
use Livewire\Component;
use App\Models\Customer;
use App\Models\OrderItem;
use App\Models\DesignItem;
use Livewire\WithPagination;
use App\Tailors\TailorsTrait;
use Livewire\WithFileUploads;
use App\Models\OrderItemStyle;
use App\Models\StyleMeasurePart;
use App\Models\OrderDeliveryAddress;
use Illuminate\Support\Facades\Auth;

class CustomerTailorsOrderDetails extends Component
{
    use WithFileUploads;
    use WithPagination;
    use TailorsTrait;
    public $errorOut, $customer_id, $Full_Name, $mobile, $email, $address, $country, $city, $province, $line1, $line2, $new_photo, $photo, $zipcode ;
    public $allproduct, $products, $weekendholiday='Thursday';
    //Order
    public $delivery_date, $order_number, $collar_measure_type, $cloth_additional, $additional, $order_sample_images,$quantity=1,$subtotal,$discount=0,
    $delivery_charge,$delivery_system,$total,$delivered_date, $wages, $advance;//মজুরি
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



    public $user_id,  $order_date, $selected_product, $couriar_details, $reg_customer_id;
   public $every_dress_measurement_size;
   
   //Order
   public $validCustomMessage, $todayDate;

   public $personal_info_open, $delivery_policy, $selectedtypes,  $clothstyles, $define_key, $desingsIputKey=[], $designsresult, $date;
   public $collars_check=[], $sleeves_check=[], $cuffs_check=[], $plates_check=[], $pockets_check=[], $backs_check=[], $pipings_check=[], $zips_check=[], $sewings_check=[], $embroiderys_check=[], $karchupis_check=[], $others_check=[];
   public $collar_fields=[], $sleeve_fields=[], $cuff_fields=[], $plate_fields=[], $pocket_fields=[], $back_fields=[], $piping_fields=[], $zip_fields=[], $sewing_fields=[], $embroidery_fields=[], $karchupi_fields=[], $other_fields=[];
   public $collerFirstArea,$collerLastArea,$sleeveFirstArea,$sleeveLastArea,$cuffFirstArea,$cuffLastArea,$plateFirstArea,$plateLastArea,$pocketFirstArea,$pocketLastArea,$backFirstArea,$backLastArea,$pipingFirstArea,$pipingLastArea,$zipFirstArea,$zipLastArea,$sewingFirstArea,$sewingLastArea,$embroideryFirstArea,$embroideryLastArea,$karchupiFirstArea,$karchupiLastArea,$karchupotheriFirstArea,$otherLastArea;
   




    public function mount($customer_id)//$customer_id
    {
        $regCustomer = Customer::find($customer_id);
        $this->reg_customer_id  = $regCustomer->id;
        $this->Full_Name        = $regCustomer->Full_Name;
        $this->mobile           = $regCustomer->mobile;
        $this->email            = $regCustomer->email;
        
        $this->country ='bd';
        $this->delivery_system ='byhand';
        $this->discount =0;
        $lastOrder = Order::orderBy('id',"DESC")->first();
        if( $lastOrder== null){
        $this->order_number = 1;
        }else{
            $this->order_number = $lastOrder->order_number+1;   
        }


        $this->order_date = Carbon::now('Asia/Dhaka')->format('Y-m-d');
        // dd($this->order_date);


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
            'order_number'      => 'required|numeric|unique:orders|min:1|max:'.$this->maxOrderNoFixed($this->order_number),
            //Measure
            'products'          => 'required',
            'order_number'      => 'required|numeric|unique:orders',
            'cloth_long'        => 'required|string',
            'cloth_body'        => 'nullable|string',
            'body_loose'        => 'nullable|string',
            'cloth_belly'       => 'nullable|string',
            'belly_loose'       => 'nullable|string',
            'cloth_enclosure'   => 'required|string',
            'hand_long'         => 'required|string',
            'sleeve_enclosure'  => 'nullable|string',
            'sleeve_pasting'    => 'nullable|string',
            'cloth_throat'      => 'numeric|nullable',
            'cloth_collar'      => 'nullable|numeric',
            'collar_measure_type'=> 'numeric|nullable',
            'cloth_shoulder'    => 'required|string',
            'cloth_mora'        => 'nullable|string',
            'noke_shoho'        => 'nullable|string',
            'designs_check.*'   => 'nullable',
            'design_fields.*'   => 'nullable',
            'cloth_additional'  => 'nullable|string',
            'order_sample_images'=> 'image|mimes:jpg,jpeg,png|nullable',
            'wages'             => 'required|numeric',
            'discount'          => 'nullable|numeric',
            'discount'          => 'nullable|numeric',
            'advance'          => 'nullable|numeric',
            'total'             => 'required|numeric',
        ],
        ['Full_Name.regex' =>'নাম শুধুমাত্র অক্ষর। সংখ্যা গ্রহণযোগ্য নহে',"delivery_date.after_or_equal"=> "অবশ্যই ডেলিভারির তারিখ আজকের ($this->todayDate) তারিখ বা তার পরের তারিখ হবে।",]
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
    
    /**
     * Write code on Method
     */
    public function firstStepSubmit()
    {
        $this->validate([
            'delivery_date'     => 'required|date_format:Y-m-d|after_or_equal:'.$this->todayDate(),
            'order_number'      => 'required|numeric|unique:orders|min:1|max:'.$this->maxOrderNoFixed($this->order_number),
            ]);
        $this->currentStep = 2;
    }
    public function formCheckTwo()
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
    public function secondStepSubmit()
    {
        $validatedData = $this->validate([
            'products'          => 'required|numeric',
            'cloth_long'        => 'required|string',
            'cloth_enclosure'   => 'required|string',
            'hand_long'         => 'required|string',
            'cloth_shoulder'    => 'required|string',
            ]);
            if ($this->cloth_collar == '' && $this->cloth_throat =='' ) {
                $this->validate( ['cloth_collar'          => 'required|string', 'cloth_throat'          => 'required|string' ]);
            }
        $this->currentStep = 3;
    }
    public function designStepSubmit()
    {
        // $validatedData = $this->validate([
        //     'stepstatus' => 'required',
        // ]);
  
        $this->currentStep = 4;
    }
    public function formCheckThree()
    {
        if ( count(array_values($this->designs_check)) == 0 ) {
            $this->cloothDesignOutpurResult=1;

        }else {
            $this->cloothDesignOutpurResult=0;
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
    ////////////////////////////////////////////////////////////////////////////////////
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
    public function placeOrder3()
    {
        // dd((array_values($this->designs_check)));
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
            
            
            
            //Measure
            'order_number'      => 'required|numeric|unique:orders|min:1|max:'.$maxOrderNo,
            'cloth_long'        => 'required|numeric',
            'cloth_body'        => 'nullable|numeric',
            'body_loose'        => 'nullable|numeric',
            'cloth_belly'       => 'nullable|numeric',
            'belly_loose'       => 'nullable|numeric',
            'cloth_enclosure'   => 'required|numeric',
            'hand_long'         => 'required|numeric',
            'sleeve_enclosure'  => 'nullable|numeric',
            'sleeve_pasting'    => 'nullable|string',
            'cloth_throat'      => 'numeric|nullable',
            'cloth_collar'      => 'nullable|numeric',
            'collar_measure_type'=> 'numeric|nullable',
            'cloth_shoulder'    => 'required|numeric',
            'cloth_mora'        => 'nullable|numeric',
            'noke_shoho'        => 'nullable|numeric',
            'designs_check.*'   => 'nullable',
            'design_fields.*'   => 'nullable',
            'cloth_additional'  => 'nullable|string',
            'order_sample_images'=> 'image|mimes:jpg,jpeg,png|nullable',
            'wages'             => 'required|numeric',
            'discount'          => 'nullable|numeric',
            'advance'          => 'nullable|numeric',
            'total'             => 'required|numeric',
        ],
        ['Full_Name.regex' =>'নাম শুধুমাত্র অক্ষর। সংখ্যা গ্রহণযোগ্য নহে',"delivery_date.after_or_equal"=> "অবশ্যই ডেলিভারির তারিখ আজকের ($this->todayDate()) তারিখ বা তার পরের তারিখ হবে।"]
    );

        // if ( $this->confirm_mail ) {
        //     $this->validateOnly($fields,[
        //         'email'             =>  'required|email|unique:customers',
        //        ]);
    
        // }
        
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
       
        /**
         * Design part or Style part of dress
         * 
         */
        // $this->Full_Name
        $this->OrderIncluding($this->reg_customer_id);
       
            // $this->('alert', ['message' => "<i class='fa fa-thumbs-up text-success'></i>  এর অর্ডার যথাযথভাবে যুক্ত হয়েছে!"]);
       

        
    }
    public function alert()
    {
        // $this->('alert', ['message' => "এর অর্ডার যথাযথভাবে যুক্ত হয়েছে!"]);
    }
    public $todayDay;
    public function render()
    {
        $this->alert();

        $this->desingCheckedUpdate();
        $this->minMaxOrderId();
        $this->formCheckTwo();
        $this->formCheckThree();
        $this->wagesFormCheck();
        $this->WagesCalculation();
        $styleGroup = StyleMeasurePart::all();
        $designItems = DesignItem::all();
        $allproducts = Product::all();
        $allOrders = Order::where('customer_id', $this->customer_id)->get();
        return view('livewire.customer.customer-tailors-order-details', compact('allproducts', 'allOrders', 'styleGroup', 'designItems'))->layout('layouts.manage_layout');
    }
}
