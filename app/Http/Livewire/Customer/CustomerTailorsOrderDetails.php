<?php

namespace App\Http\Livewire\Customer;

use Livewire\Component;
use App\Models\Customer;

class CustomerTailorsOrderDetails extends Component
{
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

    public function render()
    {
        return view('livewire.customer.customer-tailors-order-details')->layout('layouts.manage_layout');
    }
}
