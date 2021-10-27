<?php

namespace App\Http\Livewire\Customer;

use App\Models\Order;
use Livewire\Component;
use App\Models\Customer;

class TailorsCustomerOrderItems extends Component
{
    public $customer_id,$Full_Name, $order_id, $order_number, $wages, $discount, $delivery_system, $courier_details, $delivery_charge, $total, $status, $delivered_date;
    public function mount($customer_id, $order_number)
    {
        $customer = Customer::find($customer_id);
        $this->customer_id = $customer->id;
        $this->Full_Name = $customer->Full_Name;

        $order = Order::find($order_number);
        $this->order_number     = $order->order_number;
        $this->wages            = $order->wages;
        $this->discount         = $order->discount;
        $this->delivery_system  = $order->delivery_system;
        $this->courier_details  = $order->courier_details;
        $this->delivery_charge  = $order->delivery_charge;
        $this->total            = $order->total;
        $this->status           = $order->status;
        $this->delivered_date   = $order->delivered_date;
        
    }
    public function render()
    {
        $orders = Order::where('order_number', $this->order_number)->get();
        return view('livewire.customer.tailors-customer-order-items', compact('orders'))->layout('layouts.manage_layout');
    }
}


//`order_number`, `wages`, `discount`, `delivery_system`, `courier_details`, `delivery_charge`, `total`, `status`, `delivered_date`