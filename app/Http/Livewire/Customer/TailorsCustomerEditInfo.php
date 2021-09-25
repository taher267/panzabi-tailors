<?php

namespace App\Http\Livewire\Customer;

use Livewire\Component;
use App\Models\Customer;
use Livewire\WithPagination;
use App\Tailors\TailorsTrait;
use Livewire\WithFileUploads;
use Illuminate\Support\Facades\Storage;

class TailorsCustomerEditInfo extends Component
{
    use TailorsTrait;
    use WithFileUploads;
    use WithPagination;
    public $errorOut, $customer_id, $Full_Name, $mobile, $email, $address, $country, $city, $province, $line1, $line2, $new_photo, $photo, $zipcode ;
    public function mount($customer_id)
    {
        $customer = Customer::find( $customer_id);
        $this->customer_id      = $customer->id;
        $this->Full_Name        = $customer->Full_Name;
        $this->mobile           = $customer->mobile;
        $this->email            = $customer->email;
        $this->photo            = $customer->photo;
        $this->address          = $customer->address;
        $this->country          = $customer->country;
        $this->city             = $customer->city;
        $this->province         = $customer->province;
        $this->line1            = $customer->line1;
        $this->line2            = $customer->line2;
        $this->zipcode          = $customer->zipcode;
    }
    public function updated( $fields)
    {
        $this->validateOnly($fields, [
            'Full_Name'         => 'required|max:50|regex:/[a-zA-Z\s]/',
            'mobile'            => ["required","numeric",\Illuminate\Validation\Rule::unique('customers')
                                    ->ignore($this->customer_id),"digits:11"],
            'email'             =>  ["email",\Illuminate\Validation\Rule::unique('customers')
                                    ->ignore($this->customer_id),"nullable"],
            'new_photo'         => 'image|mimes:jpg,jpeg,png|nullable',
            'address'           => 'string|nullable',
            'country'           => 'required',
            'city'              => 'string|nullable',
            'province'          => 'string|nullable',
            'line1'             => 'string|nullable',
            'line2'             => 'string|nullable',
            'zipcode'           => 'string|nullable',
        ],[
            'Full_Name.regex' =>':attribute only Letters',
        ]);
    }

    public function updateCustomer()
    {
        $this->validate([
            'Full_Name'         => 'required|max:50|regex:/[a-zA-Z\s]/',
            'mobile'            => ["required","numeric",\Illuminate\Validation\Rule::unique('customers')
                                    ->ignore($this->customer_id),"digits:11"],
            'email'             =>  ["email",\Illuminate\Validation\Rule::unique('customers')
                                    ->ignore($this->customer_id),"nullable"],
            'new_photo'         => 'image|mimes:jpg,jpeg,png|nullable',
            
            'address'           => 'string|nullable',
            'country'           => 'required',
            'city'              => 'string|nullable',
            'province'          => 'string|nullable',
            'line1'             => 'string|nullable',
            'line2'             => 'string|nullable',
            'zipcode'           => 'string|nullable',
        ],[
            'Full_Name.regex' =>':attribute only Letters',
        ]); 
        $customer               = Customer::find($this->customer_id);
        $customer->Full_Name    = $this->Full_Name;
        $customer->mobile       = $this->mobile;
        $customer->email        = $this->email??null;
        $customer->address      = $this->address??null;
        $customer->country      = $this->country;
        $customer->city         = $this->city    ??null;
        $customer->province     = $this->province??null;
        $customer->line1        = $this->line1   ??null;
        $customer->line2        = $this->line2   ??null;
        $customer->zipcode      = $this->zipcode ??null;
        if($this->new_photo){
            $customer->photo    = $this->imageNameMake($this->Full_Name, $this->new_photo);
            if($this->photo && $this->new_photo){
                // dd('image && new image');
                if(Storage::disk('public')->exists("customers/$this->photo")){
                    Storage::disk('public')->delete("customers/$this->photo");
                }
                $this->uploadImage( $this->new_photo,'customers', $customer->photo);
            }
            elseif($this->new_photo){
                $this->uploadImage( $this->new_photo,'customers', $customer->photo);
            }
        }
        if($customer->save()){

            // $queryImageName = Customer::find( $this->customer_id)->photo;
            // if($this->photo && $this->new_photo){
            //     // dd('image && new image');
            //     if(Storage::disk('public')->exists("customers/$this->photo")){
            //         Storage::disk('public')->delete("customers/$this->photo");
            //     }
            //     $this->updateUploadImage( $this->new_photo,'customers', $queryImageName);
            // }
            // elseif($this->new_photo){
            //     $this->updateUploadImage( $this->new_photo,'customers', $queryImageName);
            // }

            session()->flash( 'msg', "<i class='fa fa-thumbs-up text-success'></i> কাস্টমারের তথ্য যথাযথভাবে আপডেট হয়েছে!,success" );
        }


    }

    public function render()
    {
        return view('livewire.customer.tailors-customer-edit-info')->layout('layouts.manage_layout');
    }
}
