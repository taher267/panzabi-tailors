<?php

namespace App\Http\Livewire\Admin;

use App\Models\Product;
use Livewire\Component;
use Illuminate\Support\Str;
use App\Tailors\TailorsTrait;

class ProductNameManager extends Component
{
    use TailorsTrait;
    public $activatedTab, $errorOut, $name, $slug, $status, $option, $customSlug;

    public function updated( $fields )
    {
        $this->validateOnly( $fields, [
            'name'      => 'required|string|unique:products',
            'slug'      => 'required|unique:products',
            'status'    => 'nullable',
            'option'    => 'nullable'
        ]);
    }

    public function generateSlug()
    {
        $this->slug = Str::slug($this->name);
    }
    public function storeProduct()
    {
        $this->validate( [
            'name'      => 'required|string|unique:products',
            'slug'      => 'required|unique:products',
            'status'    => 'nullable',
            'option'    => 'nullable'
        ]);
        $product            = new Product();
        $product->name      = $this->name;
        $product->slug      = $this->slug;
        $product->status    = $this->status ?? true;
        $product->option    = $this->option;
        $product->save();
        session()->flash('msg', "<i class='far fa-thumbs-up text-success'></i> Product has been added!,success");


    }

    /**
     * 
     */
    public function navTabsActivating(string $TabValue)
    {
        $this->TraintNavActivation( $TabColumn= 'productstabsetting', $TabValue );

    }


    //activated Nav
    public function ActivatedNav($TabColumn='productstabsetting')
    {
            $this->TraitActivaredNavTab($TabColumn);
    }
    //not submit in error
    public function formError()
    {
        $this->TraitFormError( $this->name, $this->slug);
    }

    public function render()
    {
        $this->formError();
        $this->ActivatedNav();
        $products = Product::all();
        return view('livewire.admin.product-name-manager', compact('products'))->layout('layouts.admin_layout');
    }
}
