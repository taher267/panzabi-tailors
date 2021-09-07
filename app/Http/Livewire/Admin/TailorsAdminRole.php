<?php

namespace App\Http\Livewire\Admin;

use Livewire\Component;
use App\Models\Role;

class TailorsAdminRole extends Component
{
    public $name, $role_short, $user_id;
    
    public $newname, $newrole_short, $newuser_id;
    //Design property
    public $roleAddEdit, $roleField, $windowWidth, $windowHeight;
    
    public function updated($fields)
    {
        if( $this->roleAddEdit ==1 ){
            $this->validateOnly($fields, [
                'name' =>'required|string|unique:roles',
                'role_short' =>'required|string|unique:roles'
            ]);
        }else if( $this->roleAddEdit ==2 ){
            $this->validateOnly($fields, [
                'newname' =>'required|string|unique:roles',
                'newrole_short' =>'required|string|unique:roles'
            ]);
        }
    }
    public function storeRole()
    {
        $this->validate([
            'name' =>'required|string|unique:roles',
            'role_short' =>'required|string|unique:roles'
        ]);
        
        $role       = new Role();
        dd(Auth::user()->id);
        
    }
    public function checkField()
    {
        // if( $this == 1){

        // }
    }
    public function render()
    {
        return view('livewire.admin.tailors-admin-role')->layout('layouts.admin_layout');
    }
}
