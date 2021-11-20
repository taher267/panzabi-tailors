<?php

namespace App\Http\Livewire;

use Livewire\Component;
use Illuminate\Support\Facades\Validator;

class FormTestComonent extends Component
{
    public $email, $password, $formId;
    public $state=[];
    public function mount()
    {
        // $this->state['email'] = 'email@gmail';
        // $this->state['password'] = 'email@gmail';
        // $this->email = 'email@gmail';
        // $this->password = 'email@gmail';
    }
    public function updated($fields)
    {
        $this->validateOnly($fields,[
            'email' =>"required|email|unique:users",
            'password' =>"required|numeric"
        ]);
    }
    
    public function createTest()
    {
        $this->validate([
            'email' =>"required|numeric",
            'password' =>"required|numeric"
        ]);
        dd('bismillah');
    }

    public function valid()
    {
        
    }

    public function formController($params)
    {
        $this->formId = $params;
    }

    public function render()
    {
        $this->dispatchBrowserEvent('alert', ['message' => "<i class='fa fa-thumbs-up text-success'></i> কাস্টমারের তথ্য যথাযথভাবে যুক্ত হয়েছে!"]);
        return view('livewire.form-test-comonent')->layout('layouts.manage_layout');
    }
    

    
}
