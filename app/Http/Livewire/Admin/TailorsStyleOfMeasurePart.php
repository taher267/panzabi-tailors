<?php

namespace App\Http\Livewire\Admin;

use Carbon\Carbon;
use Livewire\Component;
use App\Models\DesignItem;
use Illuminate\Support\Str;
use App\Tailors\TailorsTrait;
use Livewire\WithFileUploads;
use App\Models\StyleMeasurePart;
use Intervention\Image\Facades\Image;
use Illuminate\Support\Facades\Storage;

class TailorsStyleOfMeasurePart extends Component
{
    use TailorsTrait;
    use WithFileUploads;
    public $activatedTab, $name, $dependency, $image, $option , $errorOut, $products, $image_width, $image_height;
     public function mount()
     {
        //  $this->;
     }
     public function formError()
     {
         if( $this->name =='' || $this->dependency ==0){ $this->errorOut='err'; }else{$this->errorOut='';}
     }
    public function updated( $fields)
    {
        $this->validateOnly($fields, [
            'name'          => 'required|unique:style_measure_parts',
            'dependency'    => 'required',
            'image'         => 'image|mimes:png,jpg,jpeg|nullable',
            'option'        => 'nullable',
            'image_width'   => 'numeric|max:1000|nullable',
            'image_height'  => 'numeric|max:1000|nullable',
        ],[
            'image_height.max'  => 'লম্বা সর্বোচ্চ ১০০০px',  'image_width.max'  => 'চওড়া সর্বোচ্চ ১০০০px ',  
        ]);
    }

    public function storeStayle()
    {
        $this->validate([
            'name'          => 'required|unique:style_measure_parts',
            'dependency'    => 'required',
            'image'         => 'image|mimes:png,jpg,jpeg|nullable',
            'option'        => 'nullable',
            'image_width'   => 'numeric|max:1000|nullable',
            'image_height'  => 'numeric|max:1000|nullable',
        ],[
            'image_height.max'  => 'লম্বা সর্বোচ্চ ১০০০px',  'image_width.max'  => 'চওড়া সর্বোচ্চ ১০০০px ',  
        ]);
        $style = new StyleMeasurePart();
        $style->name        = $this->name;
        $style->dependency  = $this->dependency;
        if( $this->image ){
            $imageName      = Str::slug($this->name).'-'. Carbon::now()->timestamp  . '.' . $this->image->extension(); 
            $style->image   = $imageName;
            
        }
        $style->option      = $this->option;
        if( $style->save() ){
            if( $this->image ){
                $resizeImage = Image::make($this->image)->resize($this->image_width??250,$this->image_height??250)->save(90);
                Storage::disk('public')->put('styles/'.$imageName, $resizeImage);
            }
            session()->flash('msg', "<i class='far fa-thumbs-up text-success'></i> আইটেম যথাযথভাবে যুক্ত হয়েছে!,success");
        }
    }
   
    public function navTabsActivating(string $TabValue)
    {
        $this->TraintNavActivation($TabColumn= 'measurestyleparttabsetting', $TabValue);

    }

     //activated Nav
     public function ActivatedNav($TabColumn='measurestyleparttabsetting')
     {
             $this->TraitActivaredNavTab($TabColumn);
     }

    public function render()
    {
        $this->formError();
        $this->ActivatedNav();
        $measeureallstyles = StyleMeasurePart::all();
        $designItems = DesignItem::all();
        return view('livewire.admin.tailors-style-of-measure-part', compact('measeureallstyles', 'designItems'))->layout('layouts.admin_layout');
    }
}
