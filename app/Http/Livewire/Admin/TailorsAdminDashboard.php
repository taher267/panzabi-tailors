<?php

namespace App\Http\Livewire\Admin;

use Livewire\Component;

class TailorsAdminDashboard extends Component
{
    public function render()
    {
        return view('livewire.admin.tailors-admin-dashboard')->layout('layouts.admin_layout');
    }
}
