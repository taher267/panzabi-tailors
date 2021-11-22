<?php

namespace App\Http\Livewire\Customer;

use Livewire\Component;
use App\Models\DesignItem;
use Livewire\WithPagination;
use App\Tailors\TailorsTrait;
use Livewire\WithFileUploads;
use App\Models\StyleMeasurePart;

class ProductStyleMeasurementField extends Component
{
    use TailorsTrait;
    use WithFileUploads;
    use WithPagination;
    public $currentStep;
    //design Part
    public $design_fields=[], $designs_check=[];
    public function fillEmptyStyleField($style_id){
        
        $this->TraitfillEmptyStyleField($style_id);
        
    }
    public function designStepSubmit()
    {
        if($this->TraitDesignStepSubmit()=='hasErr'){
            $this->dispatchBrowserEvent('alert', ['custom'=>"",'message' => "কিছু ডিজাইন যুক্ত করুণ!",'effect'=>'warning',]);
        }else {
            $this->currentStep=4;
           
        }
        
    }
    public function updated($fields)
    {
        $this->validateOnly($fields,['designs_check.*'   => 'nullable', 'design_fields.*'   => 'nullable']);
    }
    public function render()
    {
        $styleGroup = StyleMeasurePart::all();
        $designItems = DesignItem::all();
        return view('livewire.customer.product-style-measurement-field', compact('styleGroup','designItems'));
    }
}
