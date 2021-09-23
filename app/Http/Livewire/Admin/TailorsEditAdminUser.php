<?php

namespace App\Http\Livewire\Admin;

use App\Models\Role;
use Livewire\Component;

class TailorsEditAdminUser extends Component
{
    public function render()
    {
        $roles = Role::all();
        return view('livewire.admin.tailors-edit-admin-user', compact('roles'))->layout('layouts.admin_layout');
    }
}
