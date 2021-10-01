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
use App\Models\StyleMeasurePart;
use Illuminate\Support\Facades\Auth;
use Intervention\Image\Facades\Image;
use Illuminate\Support\Facades\Storage;

class CustomerTailorsNewOrder extends Component
{
    use WithFileUploads;
    use TailorsTrait;
    //cloth
    public $order_number,$user_id, $products,$designs_check=[], $design_fields=[], $Full_Name, $mobile, $photo, $address, $email, $country,
     $province, $city, $line1, $line2, $zipcode, $delivery_date, $order_date, $selected_product, $couriar_details;
    public $peoducts, $cloth_long, $cloth_body, $body_loose, $cloth_enclosure, $hand_long, $cloth_belly, $belly_loose, $sleeve_less,$sleeve_pasting,
     $cloth_throat, $cloth_collar, $cloth_put, $cloth_mora, $noke_shoho, $cloth_additional, $every_dress_measurement_size;
    //collar
     public $sherwani_clr_catalog_in, $sherwani_clr_catalog_fld, $sherwani_rnd_clr_catalog_in, $sherwani_rnd_clr_catalog_fld, $sherwani_colar_in, $sherwani_colar_fld, $sherwani_rnd_colar_in, $sherwani_rnd_colar_fld, $round_bald_throat_clr_in, $round_bald_throat_clr_fld,$round_throat_clr_in, $round_throat_clr_fld, $beld_colar_in, $beld_colar_fld, $shart_collar_in, $shart_collar_fld, $tiny_shape_cor_in, $tiny_shape_cor_fld, $clr_plate_soft_pasting_in, $clr_plate_soft_pasting_fld, $clr_plate_7_suta_in, $clr_plate_7_suta_fld, $collar_plate_in, $collar_plate_fld;
     //Sleeve
     public $loose_sleeve_in, $loose_sleeve_fld, $sleeve_under_3_suta_in, $sleeve_under_3_suta_fld, $sleeve_side_one_and_half_in, $sleeve_side_one_and_half_fld;
     //Cuff
     public $state_cuf_in, $state_cuf_fld, $round_cuf_in, $round_cuf_fld;
     //Plate
     public $double_plate_in, $double_plate_fld, $invarce_double_plate_in, $invarce_double_plate_fld, $normal_plate_in, $normal_plate_fld, $plate_nok_shoho_in, $plate_nok_shoho_fld, $angle_plate_in, $angle_plate_fld, $design_button_in, $design_button_fld;
     //Pocket
     public $one_chest_pocket_in, $one_chest_pocket_fld, $one_and_half_chest_pocket_in, $one_and_half_chest_pocket_fld, $meswak_pocket_in, $meswak_pocket_fld;
     //piping
     public $collar_plate_and_sleeve_piping_in, $collar_plate_and_sleeve_piping_fld, $collar_one_side_3_side_and_sleeve_piping_in, $collar_one_side_3_side_and_sleeve_piping_fld, $collar_plate_sleeve_other_cloth_piping_in, $collar_plate_sleeve_other_cloth_piping_fld, $collar_cloth_by_other_cloth_piping_in, $collar_cloth_by_other_cloth_piping_fld;
    //Order
    public $quantity,$wages,$discount,$total, $delivery_charge,$delivery_system;

    public $personal_info_open, $confirm_mail, $delivery_policy, $order_delivery, $courier_details, $test , $selectedtypes, $errorOut, $clothstyles, $define_key, $desingsIputKey=[], $designsresult;
    public function mount()
    {
        $this->country ='bd';
        $this->delivery_system ='byhand';
        $this->discount =0;
        
    }
    public function updated($fields)
    {
        $todayDate= date('Y-m-d');
        $this->validateOnly($fields,[
            'delivery_date'     => 'required|date_format:Y-m-d|after_or_equal:'.$todayDate,
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
            'sleeve_less'       => 'required|numeric',
            'sleeve_pasting'    => 'required|numeric',
            'cloth_throat'      => 'required|numeric',
            'cloth_collar'      => 'required|numeric',
            'cloth_put'         => 'required|numeric',
            'cloth_mora'        => 'required|numeric',
            'noke_shoho'        => 'nullable|numeric',
            'designs_check.*'   => 'string|nullable',
            'design_fields.*'   => 'string|nullable',
            'cloth_additional'  => 'string|nullable',
            'wages'             => 'required|numeric',
            'discount'          => 'required|numeric',
            'total'             => 'required|numeric',
        ],[
            'Full_Name.regex' =>':attribute only Letters',
        ]);

        if ( $this->confirm_mail ) {
            $this->validateOnly($fields,[
                'email'             =>  'required|email|unique:customers',
               ]);
    
        }
        
        //ohter delivery validation
        if ( $this->order_delivery ) {
            $this->validateOnly($fields,[
                'courier_details'  =>  'required',
                'country'       =>  'required',
                'city'          =>  'required',
                'province'      =>  'required',
                'zipcode'       =>  'required',
                'line1'         =>  'required',
            ]);
        }
        
        //More Dress data
        // if ( count($this->products)>1 ) {
        //     $this->validateOnly($fields,[
        //         'every_dress_measurement_size'   =>  'required|numeric',
        //     ]);
        // }
    }
    public function placeOrder()
    {
        // dd($this->photo->extension());
        // dd($this->imageNameMake($this->Full_Name, $this->photo));
        $todayDate= date('Y-m-d');
        $this->validate([
            'delivery_date'     => 'required|date_format:Y-m-d|after_or_equal:'.$todayDate,
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
            'sleeve_less'       => 'required|numeric',
            'sleeve_pasting'    => 'required|numeric',
            'cloth_throat'      => 'required|numeric',
            'cloth_collar'      => 'required|numeric',
            'cloth_put'         => 'required|numeric',
            'cloth_mora'        => 'required|numeric',
            'noke_shoho'        => 'nullable|numeric',
            'designs_check.*'   => 'string|nullable',
            'design_fields.*'   => 'string|nullable',
            'cloth_additional'  => 'string|nullable',
            'wages'             => 'required|numeric',
            'discount'          => 'required|numeric',
            'total'             => 'required|numeric',
        ],[
            'Full_Name.regex' =>':attribute only Letters',
        ]);

        if ( $this->confirm_mail ) {
            $this->validate([
                'email' =>  'required|email|unique:customers',
            ]);
        }
        //ohter delivery validation
        if ( $this->order_delivery ) {
            $this->validate([
                'courier_details'   =>  'required',
                'country'   =>  'required',
                'city'      =>  'required',
                'province'  =>  'required',
                'zipcode'   =>  'required',
                'line1'     =>  'required',
                'line2'     =>  'string|nullable',
            ]);
        }
       

        //customer personal infor 
        $customer              = new Customer();
        $customer->user_id     = Auth::user()->id;
        $customer->Full_Name   = $this->Full_Name;
        $customer->mobile      = $this->mobile;
        $customer->address     = $this->address ?? null;
        $customer->email       = $this->email ?? null;
        //has cusltomer photo
        if($this->photo){
            $customer->photo = $this->imageNameMake($this->Full_Name, $this->photo);
            $this->uploadImage( $this->photo,'customers', $customer->photo);
        }
        $customer->country = $this->country;
        
        //has other delivery
        if($this->order_delivery){
              $customer->city      = $this->city;
              $customer->province  = $this->province;
              $customer->zipcode   = $this->zipcode;
              $customer->line1     = $this->line1;
              $customer->line2     = $this->line2 ?? null;
        }
        $customer->save();
        // $customer->save();
        // if($customer->save()){
        //     if( $this->photo){
        //         /**
        //          * uploadImage($whatImg=$this->photo, $uploadOn='customers', $slugby=$this->Full_Name, $width= 250, $height=250, $resulation=90, $disk='public');
        //          */
        //         // $this->uploadImage( $this->photo,'customers', $this->Full_Name);
        //     }
        //     session()->flash( 'msg', "<i class='fa fa-thumbs-up text-success'></i> কাস্টমারের তথ্য যথাযথভাবে যুক্ত হয়েছে!,success" );
        // }
        //Order Add
        $order                  = new Order();
        $order->user_id         = Auth::user()->id;
        $order->customer_id     = $customer->id;
        $order->order_number    = $this->order_number;
        $order->wages           = $this->wages;
        $order->discount        = $this->discount??0;
        $order->delivery_charge = $this->delivery_charge??0;
        $order->delivery_system = $this->delivery_system??'byhand';
        $order->total           = $this->total-$this->discount;
        $order->status          = true;
        $order->delivered_date = $this->delivery_date;
        $order->save();
       

        $orderitem                = new OrderItem();
        // for ($i=0; $i < ; $i++) { 
        //     # code...
        // }
        $orderitem->customer_id       = $customer->id;
        $orderitem->order_id          = $order->id;
        $orderitem->product_id        = $this->products;
        // $orderitem->order_number      = $this->order_number;
        $orderitem->cloth_long        = $this->cloth_long;
        $orderitem->cloth_body        = $this->cloth_body;
        $orderitem->cloth_belly       = $this->cloth_belly;
        $orderitem->belly_loose       = $this->belly_loose;
        $orderitem->body_loose        = $this->body_loose;
        $orderitem->cloth_enclosure   = $this->cloth_enclosure;
        $orderitem->hand_long         = $this->hand_long;
        $orderitem->sleeve_less       = $this->sleeve_less;
        $orderitem->sleeve_pasting    = $this->sleeve_pasting;
        $orderitem->cloth_throat      = $this->cloth_throat;
        $orderitem->cloth_collar      = $this->cloth_collar;
        $orderitem->cloth_put         = $this->cloth_put;
        $orderitem->cloth_mora        = $this->cloth_mora;
        $orderitem->noke_shoho        = $this->noke_shoho;
        $orderitem->cloth_additional  = $this->cloth_additional;
         if($orderitem->save()){
            
            session()->flash( 'msg', "<i class='fa fa-thumbs-up text-success'></i> কাস্টমারের তথ্য যথাযথভাবে যুক্ত হয়েছে!,success" );
        }
        
    }


//     $json_array = json_encode($array);

// $json_insert = new DataTable;
// $json_insert->json_column = $json_array;
// $json_insert->save();

    // public function uploadImage($whatImg, $uploadOn, $slugby)
    // {
    //     //Resize image for Category and upload
    //     $resizeImage = Image::make($whatImg)->resize( 250, 250 )->save( 90 );
    //     Storage::disk('public')->put("customers/" . $this->imageNameMake($this->Full_Name, $this->photo), $resizeImage);
    // }


    public function orders()
    {
        // $order          = new Order();
        // $order->user_id = Auth::user()->id;
        // $order->customer_id = $customer->id;
        // $order->wages=500;//মজুরি
        // $order->quantity=1;
        // $order->subtotal=500;
        // $order->discount=0;
        // $order->delivery_charge= 0;
        // $order->delivery_system= 'byhand';
        // $order->total=500;
        // $order->status='1';
        // $order->delivered_date= $this->delivery_date;
    }
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
    // public function FieldKeyDefine()
    // {
    //     // $this->desingsIputKey = [];
    //     if ( count($this->design_fields ) > 0 ) {
    //     $str = implode(',', $this->design_fields );
    //     foreach (explode(',', $str) as $val2) {
    //             $this->desingsIputKey[$val2] = $val2;
    //     }
    //     return $this->desingsIputKey;
    //     }else {
    //         $this->desingsIputKey=[];
    //     }


    // }
    public $output;
    public function isRequiredField()
    {
        $this->output=[];
        if ( count($this->design_fields)> 0 && is_array($this->design_fields)) {
            // foreach ($this->design_fields as $key => $requireOut) {
            //     // if($key==$style->id){

            //     // }
            // }
        }
        // @if( sizeof($design_fields) ) @foreach ( $design_fields as $key => $item ) @if( $key==$style->id ) 
        // required @else no @endif @endforeach @else  @endif
    }
    public $dresses;
    public function allproductsarray()
    {
        // $this->dresses=[];
        // foreach ( Product::all() as $value) {
        //     $this->dresses[$value->id] = $value->name;
        // }
        // return $this->dresses;
        if ( count($this->design_fields) > 3):
            //  dd($this->design_fields);       
        endif;
    }
    public function render()
    {
        $this->allproductsarray();
        // $this->checkboxKeyDefine();
        $allproducts = Product::all();
        $styles = StyleMeasurePart::all();
        $designItems = DesignItem::all();
        return view('livewire.customer.customer-tailors-new-order', compact('allproducts', 'styles', 'designItems'))->layout('layouts.manage_layout');
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
            
    //          $assign_subject->save();

}
