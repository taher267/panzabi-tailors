<?php

namespace App\Http\Livewire\Admin;

use Livewire\Component;
use App\Tailors\TailorsTrait;

class MeasurementManager extends Component
{
    use TailorsTrait;
    public $activatedTab, $name, $slug, $position, $option, $option2;

    public function updated( $fields)
    {
        $this->validateOnly($fields, [
            'name'      => 'required|unique:products',
            'slug'      => 'required|unique:products',
            'position'  => 'nullable',
            'option'    => 'nullable',
            'option2'   => 'nullable',
        ]);
    }

    public function productStore()
    {
        $this->validate([
            'name'      => 'required|unique:products',
            'slug'      => 'required|unique:products',
            'position'  => 'nullable',
            'option'    => 'nullable',
            'option2'   => 'nullable',
        ]);  
    }
    public function navTabsActivating(string $TabValue)
    {
        $this->TraintNavActivation($TabColumn= 'measurestabsetting', $TabValue);

    }

     //activated Nav
     public function ActivatedNav($TabColumn='measurestabsetting')
     {
             $this->TraitActivaredNavTab($TabColumn);
     }


    public function render()
    {
        $this->ActivatedNav();
        return view('livewire.admin.measurement-manager')->layout('layouts.admin_layout');
    }
}
