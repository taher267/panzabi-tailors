<?php

namespace App\Http\Livewire\Customer;

use App\Models\Order;
use Livewire\Component;
use App\Models\Customer;

class TailorsCustomerOrders extends Component
{
    public $customer_id,$Full_Name;
   
    public function mount($customer_id)
    {
        $customer = Customer::find($customer_id);
        $this->customer_id = $customer->id;
        $this->Full_Name = $customer->Full_Name;
    }
    public function render()
    {
        $allOrders = Order::where('customer_id', $this->customer_id)->get();
        return view('livewire.customer.tailors-customer-orders', compact('allOrders'))->layout('layouts.manage_layout');
    }
}
