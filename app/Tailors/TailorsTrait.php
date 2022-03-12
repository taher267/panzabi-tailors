<?php

namespace App\Tailors;

use Carbon\Carbon;
use App\Models\Order;
use App\Models\Customer;
use App\Models\OrderItem;
use App\Models\SizeChart;
use Illuminate\Support\Str;
use App\Models\OrderItemStyle;
use App\Models\StyleMeasurePart;
use App\Models\TailorsPageSetting;
use Illuminate\Support\Facades\DB;
use App\Models\OrderDeliveryAddress;
use Illuminate\Support\Facades\Auth;
use Intervention\Image\Facades\Image;
use Illuminate\Support\Facades\Storage;


/**
 * 
 */
trait TailorsTrait
{
    public $orderitem_id;
    // Nav activation
/**
 * $Table DB table name
 * $TabColumn table column name
 * $tab column value
 * 
 */
    public function TraintNavActivation($TabColumn ,$TabValue)
    {
        $Table = 'tailors_page_settings';
        $nav = DB::table($Table)->where('name', $TabColumn)->first();
        if(!$nav){
            DB::table($Table)->insert([ 'name' => $TabColumn, 'value' => $TabValue]);
            session()->flash('msg', "<i class='fa fa-check text-success'></i> $TabValue is actived and add!,primary");
        }else{
            if( $nav->value == $TabValue ){
                session()->flash('msg', "<i class='fa fa-exclamation-triangle'></i> This tab allready sellected as primary!,danger");
            }else{
                DB::table( $Table )
                ->where( 'name', $TabColumn )
                ->update(['value' => $TabValue]);
                session()->flash('msg', "<i class='fa fa-check text-success'></i> $TabValue is actived!,primary");
            }
        }


    }

    public function TraitActivaredNavTab($TabColumn)
    {
        $nav = TailorsPageSetting::where('name', $TabColumn)->first();
        if($nav){
                $this->activatedTab = $nav->value;
            }
    }

    //add input from on error not submit

    public function TraitFormError($field, $field2=null, $field3=null, $field4=null, $field5=null, $field6=null, $field7=null, $field8=null, $field9=null, $field10=null, $field11=null, $field12 = null, $field13 = null, $field14 = null, $field15 = null, $field16 = null, $field17 = null, $field18 = null, $field19 = null, $field20 = null )
    {
        if( $field =='' || $field2 ==null  ){
            $this->errorOut = 'err';
        }else{
            $this->errorOut = '';
        }
    }

    /**
     * db image name
     */
    public function imageNameMake($slugby, $extension)
    {
       return Str::slug($slugby) . '-' . Carbon::now()->timestamp . '.'. $extension->extension();
    }
    /**image upload */
    public function uploadImage($whatImg, $uploadOn,  $slugby, $width= 250, $height=250, $disk='public')
    {
        //Resize image for Category and upload
        $resizeImage = Image::make($whatImg)->resize( $width, $height )->save();
        Storage::disk($disk)->put("$uploadOn/" .$slugby, $resizeImage);
    }
    // public function uploadImage($whatImg, $uploadOn,  $slugby, $width= 250, $height=250, $disk='public')
    // {
    //     //Resize image for Category and upload
    //     $resizeImage = Image::make($whatImg)->resize( $width, $height )->save();
    //     Storage::disk($disk)->put("$uploadOn/" . $this->imageNameMake($slugby, $whatImg), $resizeImage);

    // }

    /**image upload */
    // public function updateUploadImage($whatImg, $uploadOn,  $slugby, $width= 250, $height=250, $disk='public')
    // {
    //     //Resize image for Category and upload
    //     $resizeImage = Image::make($whatImg)->resize( $width, $height )->save();
    //     Storage::disk($disk)->put("$uploadOn/" .$slugby, $resizeImage);

    // }

        public function TraitfillEmptyStyleField($style_id){
            
            if ($style_id != null) {
                if (in_array($style_id,array_keys($this->designs_check), true) ) {
                    if (in_array($style_id,array_keys($this->design_fields), true )) {
                        $this->design_fields[$style_id] = $this->design_fields[$style_id];
                    }else {
                        $this->design_fields[$style_id]=' ';
                    }
                }
            
                
            }
            
        } 
        public function TraitFillEmptyStyleCheck($style_detail_id){
            if ($style_detail_id !=null) {
                if (in_array($style_detail_id ,array_keys($this->design_fields), true) ) {
                    if (in_array($style_detail_id,array_values( $this->designs_check ), true )) {
                    $this->designs_check[$style_detail_id]=$style_detail_id;
                        
                    }else {
                        
                    }
                }  
            }
            
        }
        public function TraitDesignStepSubmit()
    {
        
    }


        public function todayDate()
        {
            $this->todayDate= Carbon::now('Asia/Dhaka')->format('Y-m-d');
        }

        
        public function maxOrderNoFixed($order_number)
            {
                $Order = Order::orderBy('id',"DESC")->first();
                if($this->force_id==1){
                    return $maxOrderNo = $order_number;
                }else{
                    if(strlen($Order)>0){
                       return $maxOrderNo = $Order->order_number+1;
                    }else{
                       return $maxOrderNo = 1;
                    }
                }
  }
    
    public function OrderItems($customer_id, $order_id)
    {
        $orderitem                    = new OrderItem();
        $orderitem->customer_id       = $customer_id;
        $orderitem->order_id          = $order_id;

        $orderitem->order_number      = $added_order_number ?? $this->order_number;
        $orderitem->product_id        = $this->products;
        $orderitem->cloth_long        = $this->cloth_long;
        $orderitem->cloth_body        = $this->cloth_body;        
        $orderitem->body_loose        = $this->body_loose;
        $orderitem->cloth_belly       = $this->cloth_belly;
        $orderitem->belly_loose       = $this->belly_loose ?? null;
        $orderitem->cloth_enclosure   = $this->cloth_enclosure;
        $orderitem->hand_long         = $this->hand_long;
        $orderitem->sleeve_enclosure  = $this->sleeve_enclosure;
        $orderitem->sleeve_pasting    = $this->sleeve_pasting ?? null;
        $orderitem->cloth_throat      = $this->cloth_throat ?? null;
        if( $this->collar_measure_type && $this->cloth_collar ):
            $orderitem->cloth_collar      = $this->cloth_collar .' মোট';
        else:
            $orderitem->cloth_collar      = $this->cloth_collar ?? null;
        endif;
        
        $orderitem->cloth_shoulder    = $this->cloth_shoulder;
        $orderitem->cloth_mora        = $this->cloth_mora ?? null;
        $orderitem->noke_shoho        = $this->noke_shoho;
        $orderitem->cloth_additional  = $this->cloth_additional;
        $orderitem->save();
        $this->orderitem_id =$orderitem->id;

    }

    public function OrderIncluding($registered_customer_id = null,$added_order_id=null, $added_order_number=null)
    {
        // dd($registered_customer_id.' < customerid= > Order id '.$added_order_id.' order number > '. $added_order_number);
        //customer personal infor
        if ( $registered_customer_id == null) {
            $customer              = new Customer();
            $customer->user_id     = Auth::user()->id;
            $customer->Full_Name   = $this->Full_Name;
            $customer->mobile      = $this->mobile;
            $customer->address     = $this->address ?? null;
            if ($this->email != '' && $this->email != null) {
                $customer->email       = $this->email;
            }else {
                $customer->email       = null;
            }
            
            //has cusltomer photo
            if($this->photo){
                $customer->photo = $this->imageNameMake( $this->Full_Name, $this->photo );
                $this->uploadImage( $this->photo, 'customers', $customer->photo );
            }
                $customer->save();
            }else {
                $customer = Customer::find($registered_customer_id);
                if ($customer->email =='' && $this->email) {
                    $customer->email = $this->email;
                    $customer->save();
                }
            }

            if($added_order_id==null){
            //Order Add
            $order                  = new Order();
            $order->user_id         = Auth::user()->id;
            $order->customer_id     = $registered_customer_id?$registered_customer_id: $customer->id;
            $order->delivered_date = $this->delivery_date;
            if ( count(Order::all() )>0 && ! $this->force_id ) {
                $order->order_number    = $added_order_number ?$added_order_number : $this->order_number;
            }elseif ($this->force_id) {
                $order->order_number    = $added_order_number ?$added_order_number: $this->order_number;
            }else {
                $order->order_number    = 1;
            }
            
            $order->wages           = $this->wages;
            $order->discount        = $this->discount??0;
            $order->advance        = $this->advance??0;
            $order->total           = $this->total-$this->discount;
            $order->status          = true;
            //has sample photo
            $arrName = [];
            if($this->order_sample_images){
                foreach($this->order_sample_images as $key=> $sample){
                    $imagesName = ($added_order_number? $added_order_number : $this->order_number) . '-' . ($registered_customer_id ? $registered_customer_id : $customer->id ). '-'. Str::slug($this->Full_Name) . '-' .($key+1). '.'. $sample->extension();
                    $resizeImage = Image::make($sample)->resize(150, 150 )->save();
                    Storage::disk('public')->put("order-samples/" . $imagesName, $resizeImage);
                    $arrName[$key] = $imagesName;
                // $this->uploadImage( $sample, 'order-samples', $imagesName );
                }
                $order->order_sample_images = $arrName;
            }
            
            // $resizeImage = Image::make($sample)->resize(150, 150 )->save();
            // Storage::disk('public')->put("order-samples/" . $imagesName, $resizeImage);


            $order->save();
            
        }
        
        
        //has Order delivery
        if($this->order_delivery){
            $delivery_address                   = new OrderDeliveryAddress();
            $delivery_address->customer_id      = $registered_customer_id??$customer->id;
            $delivery_address->order_id         = $added_order_id ? $added_order_id : $order->id;
            $delivery_address->order_number     = $added_order_number ? $added_order_number: $this->order_number;
            $delivery_address->delivery_charge  = $this->delivery_charge??0;
            $delivery_address->delivery_system  = $this->delivery_system;
            $delivery_address->courier_details  = $this->courier_details;
            $delivery_address->country          = $this->country;
            $delivery_address->city             = $this->city;
            $delivery_address->province         = $this->province;
            $delivery_address->zipcode          = $this->zipcode;
            $delivery_address->line1            = $this->line1;
            $delivery_address->line2            = $this->line2 ?? null;
            $delivery_address->save();
        }

        $orderitem                    = new OrderItem();
        $orderitem->customer_id       = $registered_customer_id??$customer->id;
        $orderitem->order_id          = $added_order_id ? $added_order_id: $order->id;

        $orderitem->order_number      = $added_order_number ? $added_order_number: $this->order_number;
        $orderitem->product_id        = $this->products;
        $orderitem->cloth_long        = $this->cloth_long;
        $orderitem->cloth_body        = $this->cloth_body;        
        $orderitem->body_loose        = $this->body_loose;
        $orderitem->cloth_belly       = $this->cloth_belly;
        $orderitem->belly_loose       = $this->belly_loose ?? null;
        $orderitem->cloth_enclosure   = $this->cloth_enclosure;
        $orderitem->hand_long         = $this->hand_long;
        $orderitem->sleeve_enclosure  = $this->sleeve_enclosure;
        $orderitem->sleeve_pasting    = $this->sleeve_pasting ?? null;
        $orderitem->cloth_throat      = $this->cloth_throat ?? null;
        if( $this->collar_measure_type && $this->cloth_collar ):
            $orderitem->cloth_collar      = $this->cloth_collar .' মোট';
        else:
            $orderitem->cloth_collar      = $this->cloth_collar ?? null;
        endif;
        
        $orderitem->cloth_shoulder    = $this->cloth_shoulder;
        $orderitem->cloth_mora        = $this->cloth_mora ?? null;
        $orderitem->noke_shoho        = $this->noke_shoho;
        $orderitem->cloth_additional  = $this->cloth_additional;
        $orderitem->save();

        /**
         * Design part or Style part of dress
         * 
         */
         
        if ( 0 < count($this->designs_check) ) {
           
            $this->OrderItemDesign(($registered_customer_id?$registered_customer_id:$customer->id), ($added_order_id ? $added_order_id : $order->id), $orderitem->id);
        }
        $this->instand_customer= $registered_customer_id??$customer->id;
    }
    /**
     * item design
     */
    public function OrderItemDesign($customer_id,$order_id,$orderitem_id, $added_order_number=null)//, 
    {
        $loopCount = count($this->designs_check);
        for( $i=0; $i < $loopCount; $i++ ){
            if( 0 != array_values($this->designs_check)[$i] ){
                $OrderItemStyles = new OrderItemStyle();
                    $OrderItemStyles->customer_id    = $customer_id;
                    $OrderItemStyles->order_id       = $order_id;
                    $OrderItemStyles->order_number   = $added_order_number ? $added_order_number: $this->order_number;
                    $OrderItemStyles->order_item_id  = $orderitem_id;
                
                    $OrderItemStyles->style_id       = array_values($this->designs_check)[$i];
                    $OrderItemStyles->style_details  = array_values($this->design_fields)[$i]??null;
                    $OrderItemStyles->item_style_type= StyleMeasurePart::find(array_values($this->designs_check)[$i])->dependency;
                    $OrderItemStyles->save();
                    }      
        }
    }


    public function fixedsizeshow()
    {
        if ( $this->fixed_size >0 && SizeChart::find($this->fixed_size)->count()>0 ) {
            $sizeData = SizeChart::find($this->fixed_size);$this->cloth_long = $sizeData->cloth_long;$this->body_loose = $sizeData->body_loose;$this->belly_loose = $sizeData->belly_loose;$this->cloth_enclosure = $sizeData->cloth_enclosure;$this->hand_long = $sizeData->hand_long;$this->sleeve_enclosure = $sizeData->sleeve_enclosure;$this->sleeve_pasting = $sizeData->sleeve_pasting;$this->cloth_collar = $sizeData->cloth_collar;$this->cloth_shoulder = $sizeData->cloth_shoulder;$this->cloth_mora = $sizeData->cloth_mora;$this->plate_fara = $sizeData->plate_fara;$this->noke_shoho = $sizeData->noke_shoho;$this->cloth_additional = $sizeData->cloth_additional;
        }
    }

    public function wagesCalculation()
    {
        if ($this->wages != null && is_numeric($this->wages) && $this->quantity != null && is_numeric($this->quantity)) {
            if($this->wages>0 || $this->quantity): $this->total = $this->quantity * $this->wages - ($this->discount ? $this->discount: 0)+ (($this->delivery_charge && is_numeric($this->delivery_charge) && $this->order_delivery) ? $this->delivery_charge: 0); endif;
        }else {
            $this->total='';
        }
    }


}



//|| $field2 ==null || $field3 ==null || $field4==null || $field5==null || $field6==null || $field7==null || $field8 ==null || $field9 ==null ||$field10 ==null ||$field11 ==null || $field12 ==null || $field13 ==null || $field14==null || $field15==null || $field16==null || $field17==null ||$field18 ==null|| $field19==null ||$field20 ==null