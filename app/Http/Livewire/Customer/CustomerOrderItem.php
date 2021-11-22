<?php

namespace App\Http\Livewire\Customer;

use Livewire\Component;

class CustomerOrderItem extends Component
{
    public function render()
    {
        return view('livewire.customer.customer-order-item')->layout('layouts.manage_layout');
    }
}
