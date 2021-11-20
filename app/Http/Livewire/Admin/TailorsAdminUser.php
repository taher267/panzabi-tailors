<?php

namespace App\Http\Livewire\Admin;

use App\Models\Role;
use App\Models\User;
use Livewire\Component;
use App\Tailors\TailorsTrait;

class TailorsAdminUser extends Component
{
    use TailorsTrait;
    public $activatedTab, $name, $email,$username, $password,$role_id, $status;
    public function mount()
    {
        if (session('utype') != 'ADM') {
            // session()->flush();
            return redirect()->route('admin.dashboard');
        }
    }

    public function navTabsActivating(string $TabValue)
    {
        $this->TraintNavActivation($TabColumn= 'userstabsetting', $TabValue);

    }

     //activated Nav
     public function ActivatedNav($TabColumn='userstabsetting')
     {
             $this->TraitActivaredNavTab($TabColumn);
     }

    public function render()
    {
        $this->ActivatedNav();
        $roles = Role::all(); $users = User::all();
        return view('livewire.admin.tailors-admin-user', compact('users', 'roles'))->layout('layouts.admin_layout');
    }
}
