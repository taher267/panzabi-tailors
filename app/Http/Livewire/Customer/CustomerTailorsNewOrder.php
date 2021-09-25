<?php

namespace App\Http\Livewire\Customer;

use Carbon\Carbon;
use App\Models\Order;
use App\Models\Product;
use Livewire\Component;
use App\Models\Customer;
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
    public $user_id, $products=[],$designs=[],$design_values=[], $Full_Name, $mobile, $photo, $address, $email, $country,
     $province, $city, $line1, $line2, $zipcode, $delivery_date, $order_date, $selected_product;
    public $peoducts, $cloth_long, $cloth_body, $body_loose, $cloth_enclosure, $hand_long, $cloth_belly, $belly_loose, $sleeve_less,$sleeve_pasting,
     $cloth_throat, $cloth_collar, $cloth_put, $cloth_mora, $noke_shoho, $cloth_additional;
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

    public $personal_info_open, $confirm_mail, $delivery_policy, $order_delivery, $test , $selectedtypes, $errorOut;
    public function mount()
    {
        $this->country ='bd';
        
    }
    public function updated($fields)
    {
        $todayDate= date('Y-m-d');
        $this->validateOnly($fields,[
            'delivery_date'     => 'required|date_format:Y-m-d|after_or_equal:'.$todayDate,
            'Full_Name'         => 'required|max:255|regex:/[a-zA-Z\s]/',
            'mobile'            => 'required|numeric|unique:customers|digits:11',
            'photo'    => 'image|mimes:jpg,jpeg,png|nullable',
            'address'           => 'string|nullable',
            'products'          => 'required',
            'email'             =>  'email|unique:customers|nullable',
            //Measure
            'products'          => 'required|array',
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
            'noke_shoho'        => 'numeric|nullable',
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
                'country'   =>  'required',
                'city'      =>  'required',
                'province'  =>  'required',
                'zipcode'   =>  'required',
                'line1'     =>  'required',
            ]);
        }
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
            'photo'    => 'image|mimes:jpg,jpeg,png|nullable',
            'address'           => 'string|nullable',
            'products'          => 'required',
            'email'             =>  'email|unique:customers|nullable',
            //Measure
            'products'          => 'required|array',
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
            'noke_shoho'        => 'numeric|nullable',
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
            $this->validateOnly($fields,[
                'country'   =>  'required',
                'city'      =>  'required',
                'province'  =>  'required',
                'zipcode'   =>  'required',
                'line1'     =>  'required',
                'line2'     =>  'string|nullable',
            ]);
        }
       

        //customer personal infor 
        $customer_info              = new Customer();
        $customer_info->user_id     = Auth::user()->id;
        $customer_info->Full_Name   = $this->Full_Name;
        $customer_info->mobile      = $this->mobile;
        $customer_info->address     = $this->address ?? null;
        $customer_info->email       = $this->email ?? null;
        //has cusltomer photo
        if($this->photo){
            $customer_info->photo = $this->imageNameMake($this->Full_Name, $this->photo);
            $this->uploadImage( $this->photo,'customers', $customer_info->photo);
        }
        $customer_info->country = $this->country;
        
        //has other delivery
        if($this->order_delivery){
              $customer_info->city      = $this->city;
              $customer_info->province  = $this->province;
              $customer_info->zipcode   = $this->zipcode;
              $customer_info->line1     = $this->line1;
              $customer_info->line2     = $this->line2?? null;
        }
        $customer_info->save();
        // if($customer_info->save()){
        //     if( $this->photo){
        //         /**
        //          * uploadImage($whatImg=$this->photo, $uploadOn='customers', $slugby=$this->Full_Name, $width= 250, $height=250, $resulation=90, $disk='public');
        //          */
        //         // $this->uploadImage( $this->photo,'customers', $this->Full_Name);
        //     }
        //     session()->flash( 'msg', "<i class='fa fa-thumbs-up text-success'></i> কাস্টমারের তথ্য যথাযথভাবে যুক্ত হয়েছে!,success" );
        // }
        //Order Add
        $order          = new Order();
        $order->user_id = Auth::user()->id;
        $order->customer_id = $customer_info->id;
        $order->wages=500;//মজুরি
        $order->quantity=1;
        $order->subtotal=500;
        $order->discount=0;
        $order->delivery_charge= 0;
        $order->delivery_system= 1;
        $order->total=500;
        $order->status='1';
        $order->delivered_date = $this->delivery_date;
        if($order->save()){
            
            session()->flash( 'msg', "<i class='fa fa-thumbs-up text-success'></i> কাস্টমারের তথ্য যথাযথভাবে যুক্ত হয়েছে!,success" );
        }
        
    }


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
        // $order->customer_id = $customer_info->id;
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
    public function render()
    {
        // $this->formError();
        // $this->openPersonalInfo();
        $allproducts = Product::all();
        $styles = StyleMeasurePart::all();
        $designItems = DesignItem::all();
        return view('livewire.customer.customer-tailors-new-order', compact('allproducts', 'styles', 'designItems'))->layout('layouts.manage_layout');
    }
}
