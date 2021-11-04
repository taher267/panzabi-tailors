<?php
// ↓
namespace App\Http\Livewire\Customer;

use Carbon\Carbon;
use App\Models\Order;
use App\Models\Product;
use Livewire\Component;
use App\Models\Customer;
use App\Models\OrderItem;
use App\Models\DesignItem;
use Illuminate\Support\Str;
use App\Tailors\TailorsTrait;
use Livewire\WithFileUploads;
use App\Models\OrderItemStyle;
use App\Models\SleeveStylePart;
use App\Models\StyleMeasurePart;
use App\Models\OrderDeliveryAddress;
use Illuminate\Support\Facades\Auth;
use Intervention\Image\Facades\Image;
use Illuminate\Support\Facades\Storage;

class NewCustomerNewOrderNewIteamsTailors extends Component
{
    use WithFileUploads;
    use TailorsTrait;
    //cloth
    public $order_number,$user_id, $products,$designs_check=[], $design_fields=[], $Full_Name, $mobile, $photo, $address, $email, $country,
     $province, $city, $line1, $line2, $zipcode, $delivery_date, $order_date, $selected_product, $couriar_details;
    public $peoducts, $cloth_long, $cloth_body, $body_loose, $cloth_enclosure, $hand_long, $cloth_belly, $belly_loose, $sleeve_enclosure,$sleeve_pasting,
     $cloth_throat, $cloth_collar, $cloth_shoulder, $cloth_mora, $noke_shoho, $cloth_additional, $every_dress_measurement_size;
    
    //Order
    public $quantity=1,$wages,$discount=0,$total, $delivery_charge,$delivery_system, $force_id, $collar_measure_type,$validCustomMessage,
    $todayDate;

    public $personal_info_open, $confirm_mail, $delivery_policy, $order_delivery, $courier_details, $test , $selectedtypes, $errorOut, $clothstyles, $define_key, $desingsIputKey=[], $designsresult;
    public $collars_check=[], $sleeves_check=[], $cuffs_check=[], $plates_check=[], $pockets_check=[], $backs_check=[], $pipings_check=[], $zips_check=[], $sewings_check=[], $embroiderys_check=[], $karchupis_check=[], $others_check=[];
    public $collar_fields=[], $sleeve_fields=[], $cuff_fields=[], $plate_fields=[], $pocket_fields=[], $back_fields=[], $piping_fields=[], $zip_fields=[], $sewing_fields=[], $embroidery_fields=[], $karchupi_fields=[], $other_fields=[];
    public $collerFirstArea,$collerLastArea,$sleeveFirstArea,$sleeveLastArea,$cuffFirstArea,$cuffLastArea,$plateFirstArea,$plateLastArea,$pocketFirstArea,$pocketLastArea,$backFirstArea,$backLastArea,$pipingFirstArea,$pipingLastArea,$zipFirstArea,$zipLastArea,$sewingFirstArea,$sewingLastArea,$embroideryFirstArea,$embroideryLastArea,$karchupiFirstArea,$karchupiLastArea,$karchupotheriFirstArea,$otherLastArea;

    public function mount()
    {
        
        $this->country ='bd';
        $this->delivery_system ='byhand';
        // $this->discount =0;
        $lastOrder = Order::orderBy('id',"DESC")->first();
        if( $lastOrder== null){
        $this->order_number =1;
        }else{
            $this->order_number = $lastOrder->order_number+1;   
        }
        
    }
    public function updated($fields)
    {
//         $timezone= date_default_timezone_set('Asia/Dhaka');
//         $todayDate = new DateTime( 'Thu, 31 Mar 2011 02:05:59 GMT', new DateTimeZone($timezone) );
// echo $todayDate->format('Y-m-d');

 

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
            'Full_Name'         => 'required|max:255|regex:/[a-zA-Z\s]/',
            'mobile'            => 'required|numeric|unique:customers|digits:11',
            'photo'             => 'image|mimes:jpg,jpeg,png|nullable',
            'address'           => 'string|nullable',
            'products'          => 'required',
            'email'             => 'email|unique:customers|nullable',
            
            
            //Measure
            'order_number'      => 'required|numeric|unique:orders|min:1|max:'.$maxOrderNo,
            'cloth_long'        => 'required|numeric',
            'cloth_body'        => 'required|numeric',
            'body_loose'        => 'required|numeric',
            'cloth_belly'       => 'required|numeric',
            'belly_loose'       => 'required|numeric',
            'cloth_enclosure'   => 'required|numeric',
            'hand_long'         => 'required|numeric',
            'sleeve_enclosure'  => 'required|numeric',
            'sleeve_pasting'    => 'required|numeric',
            'cloth_throat'      => 'numeric|nullable',
            'cloth_collar'      => 'required|numeric',
            'collar_measure_type'=> 'numeric|nullable',
            'cloth_shoulder'    => 'required|numeric',
            'cloth_mora'        => 'required|numeric',
            'noke_shoho'        => 'nullable|numeric',
            'designs_check.*'   => 'nullable',
            'design_fields.*'   => 'nullable',
            'cloth_additional'  => 'nullable|string',
            'wages'             => 'required|numeric',
            'quantity'          => 'required|numeric|min:1',
            'discount'          => 'nullable|numeric',
            'total'             => 'required|numeric',
        ],
        ['Full_Name.regex' =>'নাম শুধুমাত্র অক্ষর। সংখ্যা গ্রহণযোগ্য নহে',"delivery_date.after_or_equal"=> "অবশ্যই ডেলিভারির তারিখ আজকের ($this->todayDate()) তারিখ বা তার পরের তারিখ হবে।"]
    );

        if ( $this->confirm_mail ) {
            $this->validateOnly($fields,[
                'email'             =>  'required|email|unique:customers',
               ]);
    
        }
        
        //ohter delivery validation
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
    public function placeOrder3()
    {
        dd(count($this->designs_check));
       
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
            'order_number'      => 'required|numeric|unique:orders|min:1|max:'.$maxOrderNo,
            'Full_Name'         => 'required|max:255|regex:/[a-zA-Z\s]/',
            'mobile'            => 'required|numeric|unique:customers|digits:11',
            'photo'             => 'image|mimes:jpg,jpeg,png|nullable',
            'address'           => 'string|nullable',
            'products'          => 'required',
            'email'             => 'email|unique:customers|nullable',
            
            //Measure
            'order_number'      => 'required|numeric|unique:orders',
            'cloth_long'        => 'required|numeric',
            'cloth_body'        => 'required|numeric',
            'body_loose'        => 'required|numeric',
            'cloth_belly'       => 'required|numeric',
            'belly_loose'       => 'required|numeric',
            'cloth_enclosure'   => 'required|numeric',
            'hand_long'         => 'required|numeric',
            'sleeve_enclosure'  => 'required|numeric',
            'sleeve_pasting'    => 'required|numeric',
            'cloth_throat'      => 'numeric|nullable',
            'cloth_collar'      => 'required|numeric',
            'collar_measure_type'=> 'numeric|nullable',
            'cloth_shoulder'    => 'required|numeric',
            'cloth_mora'        => 'required|numeric',
            'noke_shoho'        => 'nullable|numeric',
            'designs_check.*'   => 'nullable',
            'design_fields.*'   => 'nullable',
            'cloth_additional'  => 'nullable|string',
            'wages'             => 'required|numeric',
            'discount'          => 'nullable|numeric',
            'total'             => 'required|numeric',
        ],
        
        [
            'Full_Name.regex' =>':attribute only Letters',
        ]
        
    
    );

        if ( $this->confirm_mail ) {
            $this->validate([
                'email' =>  'required|email|unique:customers',
            ]);
        }
        //ohter delivery validation
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
                'line2'             =>  'string|nullable',
            ]);
        }
       

        //customer personal infor 
        $customer              = new Customer();
        $customer->user_id     = Auth::user()->id;
        $customer->Full_Name   = $this->Full_Name;
        $customer->mobile      = $this->mobile;
        $customer->address     = $this->address ?? null;
        if ($this->email != ' ' && $this->email != null) {
            $customer->email       = $this->email;
        }else {
            $customer->email       = null;
        }
        
        //has cusltomer photo
        if($this->photo){
            $customer->photo = $this->imageNameMake($this->Full_Name, $this->photo);
            $this->uploadImage( $this->photo,'customers', $customer->photo);
        }
        
            $customer->save();
        //Order Add
        $order                  = new Order();
        $order->user_id         = Auth::user()->id;
        $order->customer_id     = $customer->id;
        if (count(Order::all())>0 && ! $this->force_id) {
            $order->order_number    = $this->order_number;
        }elseif ($this->force_id) {
            $order->order_number    = $this->order_number;
        }else {
            $order->order_number    = 1;
        }
        
        $order->wages           = $this->wages;
        $order->discount        = $this->discount??0;
        
        $order->total           = $this->total-$this->discount;
        $order->status          = true;
        $order->delivered_date = $this->delivery_date;
        $order->save();

        
        
        //has Order delivery
        if($this->order_delivery){
            $delivery_address                   = new OrderDeliveryAddress();
            $delivery_address->customer_id      = $customer->id;
            $delivery_address->order_id         = $order->id;
            $delivery_address->order_number     = $this->order_number;
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
        $orderitem->customer_id       = $customer->id;
        $orderitem->order_id          = $order->id;

        $orderitem->order_number      = $this->order_number;
        $orderitem->product_id        = $this->products;
        $orderitem->cloth_long        = $this->cloth_long;
        $orderitem->cloth_body        = $this->cloth_body;
        $orderitem->cloth_belly       = $this->cloth_belly;
        $orderitem->belly_loose       = $this->belly_loose;
        $orderitem->body_loose        = $this->body_loose;
        $orderitem->cloth_enclosure   = $this->cloth_enclosure;
        $orderitem->hand_long         = $this->hand_long;
        $orderitem->sleeve_enclosure  = $this->sleeve_enclosure;
        $orderitem->sleeve_pasting    = $this->sleeve_pasting;
        $orderitem->cloth_throat      = $this->cloth_throat;
        if( $this->collar_measure_type ):
            $orderitem->cloth_collar      = $this->cloth_collar .' মোট';
        else:
            $orderitem->cloth_collar      = $this->cloth_collar;
        endif;
        
        $orderitem->cloth_shoulder    = $this->cloth_shoulder;
        $orderitem->cloth_mora        = $this->cloth_mora;
        $orderitem->noke_shoho        = $this->noke_shoho;
        $orderitem->cloth_additional  = $this->cloth_additional;
        $orderitem->save();

        /**
         * Design part or Style part of dress
         * 
         */
         
        if (0 < count($this->designs_check) ) {
            $loopCount = count($this->designs_check);
            for($i=0; $i < $loopCount; $i++){
                if(0 != array_values($this->designs_check)[$i]){
                    // dd(  array_values($this->designs_check)[$i]);
                    $OrderItemStyles = new OrderItemStyle();
                        $OrderItemStyles->customer_id    = $customer->id;
                        $OrderItemStyles->order_id       = $order->id;
                        $OrderItemStyles->order_number   = $this->order_number;
                        $OrderItemStyles->order_item_id  = $orderitem->id;
                    //কলার/collar
                    if(array_keys($this->designs_check)[$i] >= $this->collerFirstArea->id && array_keys($this->designs_check)[$i] 
                    <= $this->collerLastArea->id){
                        $OrderItemStyles->style_id       = array_values($this->designs_check)[$i];
                        $OrderItemStyles->style_details  = array_values($this->design_fields)[$i]??null;
                        $OrderItemStyles->item_style_type= $this->collerFirstArea->dependency;
                        $OrderItemStyles->save();
                        }
                        //হাতা/sleeve
                        else if(array_keys($this->designs_check)[$i] >= $this->sleeveFirstArea->id && array_keys($this->designs_check)[$i] 
                        <= $this->sleeveLastArea->id){
                            $OrderItemStyles->style_id       = array_values($this->designs_check)[$i];
                            $OrderItemStyles->style_details  = array_values($this->design_fields)[$i]??null;
                            $OrderItemStyles->item_style_type= $this->sleeveFirstArea->dependency;
                            $OrderItemStyles->save();
                            }
                            // কাফ/cuff
                            else if(array_keys($this->designs_check)[$i] >= $this->cuffFirstArea->id && array_keys($this->designs_check)[$i] 
                        <= $this->cuffLastArea->id){
                            $OrderItemStyles->style_id       = array_values($this->designs_check)[$i];
                            $OrderItemStyles->style_details  = array_values($this->design_fields)[$i]??null;
                            $OrderItemStyles->item_style_type= $this->cuffFirstArea->dependency;
                            $OrderItemStyles->save();
                            }
                            //প্লেট/plate
                            else if(array_keys($this->designs_check)[$i] >= $this->plateFirstArea->id && array_keys($this->designs_check)[$i] 
                        <= $this->plateLastArea->id){
                            $OrderItemStyles->style_id       = array_values($this->designs_check)[$i];
                            $OrderItemStyles->style_details  = array_values($this->design_fields)[$i]??null;
                            $OrderItemStyles->item_style_type= $this->plateFirstArea->dependency;
                            $OrderItemStyles->save();
                            }
                            //পকেট/pocket
                            else if(array_keys($this->designs_check)[$i] >= $this->pocketFirstArea->id && array_keys($this->designs_check)[$i] 
                        <= $this->pocketLastArea->id){
                            $OrderItemStyles->style_id       = array_values($this->designs_check)[$i];
                            $OrderItemStyles->style_details  = array_values($this->design_fields)[$i]??null;
                            $OrderItemStyles->item_style_type= $this->pocketFirstArea->dependency;
                            $OrderItemStyles->save();
                            }



                            //পাইপিং/piping
                            else if(array_keys($this->designs_check)[$i] >= $this->pipingFirstArea->id && array_keys($this->designs_check)[$i] 
                        <= $this->pipingLastArea->id){
                            $OrderItemStyles->style_id       = array_values($this->designs_check)[$i];
                            $OrderItemStyles->style_details  = array_values($this->design_fields)[$i]??null;
                            $OrderItemStyles->item_style_type= $this->pipingFirstArea->dependency;
                            $OrderItemStyles->save();
                            }
                    }

                    
            }
        }
        //  if($orderitem->save()){
            
            session()->flash( 'msg', "<i class='fa fa-thumbs-up text-success'></i> কাস্টমারের তথ্য যথাযথভাবে যুক্ত হয়েছে!,success" );
        // }

        
    }


    //Customer Image upload

    // public function uploadImage($whatImg, $uploadOn, $slugby)
    // {
    //     //Resize image for Category and upload
    //     $resizeImage = Image::make($whatImg)->resize( 250, 250 )->save( 90 );
    //     Storage::disk('public')->put("customers/" . $this->imageNameMake($this->Full_Name, $this->photo), $resizeImage);
    // }


    
    public function formError()
    {
        $this->TraitFormError( $this->Full_Name, $this->mobile);
    }
    public function checkboxKeyDefine()
    {
        
        if ( count($this->designs_check) > 0 ) {
        $str = implode(',', $this->designs_check);
        foreach (explode(',', $str) as $val2) {
                $this->desingsIputKey[$val2] = $val2;
        }
        return $this->desingsIputKey;
        }else {
            $this->desingsIputKey=[];
            
        }


    }
    
    public $output;
    public function isRequiredField()
    {
        $this->output=[];
        if ( count($this->design_fields)> 0 && is_array($this->design_fields)) {
            
        }
        
    }
    
    public function StyleIdArea()
    {
        $this->collerFirstArea = StyleMeasurePart::where('dependency', 'collar')->first();//->id;
        $this->collerLastArea = StyleMeasurePart::where('dependency', 'collar')->orderBy('id','DESC')->first();//->id;

        $this->sleeveFirstArea = StyleMeasurePart::where('dependency', 'sleeve')->first();//->id;
        $this->sleeveLastArea = StyleMeasurePart::where('dependency', 'sleeve')->orderBy('id','DESC')->first();//->id;

        $this->cuffFirstArea = StyleMeasurePart::where('dependency', 'cuff')->first();//->id;
        $this->cuffLastArea = StyleMeasurePart::where('dependency', 'cuff')->orderBy('id','DESC')->first();//->id;

        $this->plateFirstArea = StyleMeasurePart::where('dependency', 'plate')->first();//->id;
        $this->plateLastArea = StyleMeasurePart::where('dependency', 'plate')->orderBy('id','DESC')->first();//->id;

        $this->pocketFirstArea = StyleMeasurePart::where('dependency', 'pocket')->first();//->id;
        $this->pocketLastArea = StyleMeasurePart::where('dependency', 'pocket')->orderBy('id','DESC')->first();//->id;

        $this->backFirstArea = StyleMeasurePart::where('dependency', 'back')->first();//->id;
        $this->backLastArea = StyleMeasurePart::where('dependency', 'back')->orderBy('id','DESC')->first();//->id;

        $this->pipingFirstArea = StyleMeasurePart::where('dependency', 'piping')->first();//->id;
        $this->pipingLastArea = StyleMeasurePart::where('dependency', 'piping')->orderBy('id','DESC')->first();//->id;

        // $this->zipFirstArea = StyleMeasurePart::where('dependency', 'zip')->first()->id;
        // $this->zipLastArea = StyleMeasurePart::where('dependency', 'zip')->orderBy('id','DESC')->first()->id;

        // $this->sewingFirstArea = StyleMeasurePart::where('dependency', 'sewing')->first()->id;
        // $this->sewingLastArea = StyleMeasurePart::where('dependency', 'sewing')->orderBy('id','DESC')->first()->id;

        // $this->embroideryFirstArea = StyleMeasurePart::where('dependency', 'embroidery')->first()->id;
        // $this->embroideryLastArea = StyleMeasurePart::where('dependency', 'embroidery')->orderBy('id','DESC')->first()->id;

        // $this->karchupiFirstArea = StyleMeasurePart::where('dependency', 'karchupi')->first()->id;
        // $this->karchupiLastArea = StyleMeasurePart::where('dependency', 'karchupi')->orderBy('id','DESC')->first()->id;

        // $this->karchupotheriFirstArea = StyleMeasurePart::where('dependency', 'other')->first()->id;
        // $this->otherLastArea = StyleMeasurePart::where('dependency', 'other')->orderBy('id','DESC')->first()->id;

        // print_r($collerFirstArea+$collerLastArea-1);
        // print_r($collerFirstArea);
        // echo '</pre>';
    }
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
    public function render()
    {
        
        $this->minMaxOrderId();
        $this->WagesCalculation();
        $this->StyleIdArea();
        $allproducts = Product::all();
        $styles = StyleMeasurePart::all();
        $designItems = DesignItem::all();
        $collarStyle = OrderItemStyle::all();
        return view('livewire.customer.new-customer-new-order-new-iteams-tailors', compact('allproducts', 'styles', 'designItems','collarStyle'))->layout('layouts.manage_layout');
    }


























    // $countSubject = count($request->subject_id);

    // AssignSubject::where('class_id',$class_id)->delete();

    // for ($i=0; $i < $countSubject ; $i++) { 
            
    //         $assign_subject                    = new AssignSubject();
    //         $assign_subject->class_id          = $request->class_id;
    //         $assign_subject->subject_id        = $request->subject_id[$i];
    //         $assign_subject->full_mark         = $request->full_mark[$i];
    //         $assign_subject->pass_mark         = $request->pass_mark[$i];
    //         $assign_subject->subjective_mark   = $request->subjective_mark[$i];
            
    ////          $assign_subject->save();

}
