<?php

namespace App\Http\Livewire\Customer;

use Carbon\Carbon;
use App\Models\Order;
use App\Models\Product;
use Livewire\Component;
use App\Models\Customer;
use App\Models\DesignItem;
use Illuminate\Support\Str;
use Livewire\WithPagination;
use App\Tailors\TailorsTrait;
use Livewire\WithFileUploads;
use App\Models\StyleMeasurePart;
use Illuminate\Support\Facades\Auth;
use Intervention\Image\Facades\Image;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Validator;

class AllCustomers extends Component
{
    use WithFileUploads;
    use WithPagination;
    use TailorsTrait;
     //Customer Edit info
     public $EditCustomerInfo, $showEditModal=false, $state=[], $force_id, $photo, $order_number, $isDetailModalOpen=true;
    //cloth
    public $user_id, $products=[],$designs=[],$design_values=[], $Full_Name, $customer_image, $address, $email, $country,
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
    //Search
    public $searchBy,$searchByName, $searchByEmail;
    public $selectedCustomer;
    public function mount()
    {
        $this->country ='bd';
        
    }
  
    public function updted($fields)
    {
        $this->validateOnly($fields, [
            'state.Full_Name' => 'required|numeric'
        ]);
    }

    // public 
    public function createCustomer(){
        $alldate = Validator::make($this->state,[
            'Full_Namae'=>'required|numeric'
        ])->validate();
        dd($alldate);
    }

    public function AddNewCustomer(){
        $this->dispatchBrowserEvent('show-form');
    }
    /**Customer detail Modal Open */
    
    public function customerDetailsModalOpen(Customer $customer)
    {
        // $this->isDetailModalOpen=!$this->isDetailModalOpen;
        $this->selectedCustomer=$customer;
    }

    public function render()
    {
        $allproducts = Product::all();
        $styles = StyleMeasurePart::all();
        $designItems = DesignItem::all();
        $customers = Customer::orderBy('id', "DESC")->paginate(6);
        $todaysCustomers = Customer::where('created_at', '>=', Carbon::today())->paginate(6);
        if( $this->searchBy ){
            // $specificCustomer = Customer::where('mobile', $this->searchBy)->orWhere('Full_Name', $this->searchBy)->orWhere('email', $this->searchBy)->paginate(2);
            $specificCustomer = Customer::where('Full_Name', 'like', '%'. $this->searchBy.'%')->orWhere('mobile', 'like', '%'. $this->searchBy. '%')->orWhere('email', 'like', '%'. $this->searchBy. '%')->orderBy('created_at', 'DESC')->paginate(5);
        }else{ $specificCustomer = [];}
        
        return view('livewire.customer.all-customers', compact('allproducts', 'styles', 'designItems', 'customers', 'specificCustomer','todaysCustomers'))->layout('layouts.manage_layout');
    }
}
