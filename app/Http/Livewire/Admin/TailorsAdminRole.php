<?php

namespace App\Http\Livewire\Admin;

use App\Models\Role;
use App\Models\User;
use Livewire\Component;
use App\Tailors\TailorsTrait;
use App\Models\TailorsPageSetting;
use Illuminate\Support\Facades\Auth;

class TailorsAdminRole extends Component
{
    use TailorsTrait;
    public $name, $short_role, $user_id;
    //Design property
    public $roleField, $errorOut, $role_id, $activatedTab;
    public function mount()
    {

    }

    public function updated( $fields )
    {
        $this->validateOnly( $fields, [
            'name' =>'required|string|regex:/^\S*$/u|unique:roles',
            'short_role' =>'required|regex:/^\S*$/u|string|in:ADM,MGR,AHR,EDT,CTB,USR|unique:roles',
        ],
        [
            'name.regex' => ':attribute, space not accepte',
            'short_role.in' => ':attribute should be in ADM/MGR/AHR/EDT/CTB/USR'
        ]);
    }
    public function storeRole()
    {
        $this->validate([
            'name' =>'required|regex:/^\S*$/u|string|unique:roles',
            'short_role' =>'required|regex:/^\S*$/u|string|in:ADM,MGR,AHR,EDT,CTB,USR|unique:roles'
            // in:ADM
        ],
        [
            'name.regex' => ':attribute space not accepte',
            'short_role' => ':attribute should be in ADM/MGR/AHR/EDT/CTB/USR'
        ]
    );

        $role               = new Role();
        $role->name         = $this->name;
        $role->short_role   = strtoupper($this->short_role);
        $role->save();
        $this->errorOut=1;
        session()->flash( 'msg', "<i class='fa fa-thumbs-up text-success'></i> Role has been added successfully!,success" );
    }
    public function checkError()
    {
        if( !$this->name || !$this->short_role){
            $this->errorOut = 'err';
        }
        else{
            $this->errorOut=0;
        }

    }

    public function roleDelete($role_id)
    {
        if(Role::find($role_id)->delete() ){
            session()->flash( 'msg', "<i class='fa fa-thumbs-down text-danger'></i> Role has been deleted successfully!,danger");
        }


    }
    /**
     * 
     */
    public function navTabsActivating(string $TabValue)
    {
        $this->TraintNavActivation( $TabColumn= 'rolestabsetting', $TabValue );

    }


    //activated Nav
    public function ActivatedNav($TabColumn='rolestabsetting')
    {
            $this->TraitActivaredNavTab($TabColumn);
    }
    public function render()
    {
        $this->ActivatedNav();
        if (session('utype') != 'ADM') {
            session()->flush();
        }
        $this->checkError();
        $roles = Role::all();
        return view('livewire.admin.tailors-admin-role', compact('roles'))->layout('layouts.admin_layout');
    }


}
