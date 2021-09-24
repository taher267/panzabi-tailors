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


// INSERT INTO `products` (`id`, `name`, `slug`, `status`, `option`) VALUES
// (1, 'একছাটা', 'একছাটা', 1, ''),
// (2, 'পাঞ্জাবী', 'পাঞ্জাবী', 1, NULL),
// (3, 'শর্ট পাঞ্জাবী', 'শর্ট পাঞ্জাবী', 1, ''),
// (4, 'পায়জামা', 'পায়জামা', 1, NULL),
// (5, 'একছাটা জুব্বা', 'একছাটা জুব্বা', 1, NULL),
// (6, ' কাবলী', ' কাবলী', 1, NULL),
// (7, 'এরাবিয়ান', 'এরাবিয়ান', 1, NULL),
// (8, ' গোলজামা', ' গোলজামা', 1, NULL),
// (9, 'ফতুয়া', 'ফতুয়া', 1, NULL),
// (10, 'শেরওয়ানী', 'শেরওয়ানী', 1, NULL),
// (11, 'কটি', 'কটি', 1, NULL),
// (12, 'সালোয়ার', 'সালোয়ার', 1, NULL),
// (13, 'চোষ পায়জামা', 'চোষ-পায়জামা', 1, NULL),
// (14, 'আলিগড়', 'আলিগড়', 1, NULL),
// (15, ' ধুতি', ' ধুতি', 1, NULL);