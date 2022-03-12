<?php

namespace App\Http\Livewire;

use App\Models\Order;
use Livewire\Component;
use Livewire\WithPagination;

class CustomerAllOrder extends Component
{
    use WithPagination;
    public $searchBy, $showeditform = 0, $order_number_for_edit,$showform,$confirm_mail,$photo,$editOrder=[],
    $Full_Name, $mobile, $email, $address, $new_photo,$customer;
    

    public function formControl($param, $odr_num=null)
    {
        $this->showeditform = $param;
        if ($odr_num != null) {
            $this->order_number_for_edit=$odr_num;
        }
    }
    public function editorder(Order $order)
    {
        $this->showform=1;
        $this->editOrder = $order;
        $this->Full_Name = $order->customer->Full_Name;

    }
    public function formClose()
    {
        $this->showform=0;
    }

    public function render()
    {
        $specificOrder = Order::where('order_number', $this->searchBy)->paginate();
        // $specificCustomer = Order::where('order_number', 'like', '%'. $this->searchBy.'%')->orWhere('mobile', 'like', '%'. $this->searchBy. '%')->orWhere('email', 'like', '%'. $this->searchBy. '%')->orderBy('created_at', 'DESC')->paginate(5);
        $allOrders = Order::paginate(5);
        return view('livewire.customer-all-order', compact('allOrders','specificOrder'))->layout('layouts.manage_layout');
    }
}
