<?php

namespace App\Http\Livewire\Customer;

use Livewire\Component;

class CustomerTailorsEditOrder extends Component
{
    public function render()
    {
        return view('livewire.customer.customer-tailors-edit-order')->layout('manage_layout');
    }
}
