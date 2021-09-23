<?php

namespace App\Http\Livewire\Admin;

use App\Models\Role;
use App\Tailors\TailorsTrait;

use Livewire\Component;

class TailorsEditAdminRole extends Component
{
    use TailorsTrait;
    public $name, $short_role, $role_id, $user_id, $errorOut;
    public function mount($role_id)
    {
        $role_edit          = Role::find($role_id);
        $this->name         = $role_edit->name;
        $this->short_role   = $role_edit->short_role;
        $this->role_id      = $role_edit->id;

    }
    public function updated($fields)
    {
        $this->validateOnly($fields,[
            'name' => ['required', \Illuminate\Validation\Rule::unique('roles')->ignore($this->role_id)],
            'short_role' =>['required', \Illuminate\Validation\Rule::unique('roles')->ignore($this->role_id)],
        ]);
    }
    public function updateRole()
    {
        $this->validate([
            'name' => ['required', \Illuminate\Validation\Rule::unique('roles')->ignore($this->role_id)],
            'short_role' =>['required', \Illuminate\Validation\Rule::unique('roles')->ignore($this->role_id)],
        ]);

        $role               = Role::find( $this->role_id);
        $role->name         = $this->name;
        $role->short_role   = strtoupper($this->short_role);
        $role->save();
        session()->flash('msg', 'Role has been updated successfully!,success');
    }

    public function checkError()
    {
        $checkrole = Role::find( $this->role_id);
        if( !$this->name || !$this->short_role || ( $checkrole->name == $this->name && $checkrole->short_role == $this->short_role ) ){
            $this->errorOut = 'err';
        }
        else{
            $this->errorOut=0;
        }

    }
    public function render()
    {
        $this->checkError();
        return view('livewire.admin.tailors-edit-admin-role')->layout('layouts.admin_layout');
    }
}
