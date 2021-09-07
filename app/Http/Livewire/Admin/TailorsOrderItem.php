<?php

namespace App\Http\Livewire\Admin;

use Livewire\Component;

class TailorsOrderItem extends Component
{
    public function render()
    {
        return view('livewire.admin.tailors-order-item')->layout('layouts.admin_layout');
    }
}
