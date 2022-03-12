<?php

namespace App\Http\Livewire\Menu;

use Livewire\Component;
use App\Models\Customer;

class TailorsAdminNavMenu extends Component
{   

    public function render()
    {
        $customers = Customer::all();
        return view('livewire.menu.tailors-admin-nav-menu',compact('customers'));
    }
}
