<?php

namespace App\Http\Livewire\Admin;

use Livewire\Component;

class TailorsNewAdminUser extends Component
{
    public function render()
    {
        return view('livewire.admin.tailors-new-admin-user')->layout('layouts.admin_layout');
    }
}
