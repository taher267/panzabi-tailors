<?php

namespace App\Http\Livewire\Admin;

use App\Models\Product;
use Livewire\Component;
use Illuminate\Support\Str;
use App\Tailors\TailorsTrait;

class ProductNameManager extends Component
{
    use TailorsTrait;
    public $activatedTab, $errorOut, $name, $slug,$price, $status, $option, $customSlug;

    public function updated( $fields )
    {
        $this->validateOnly( $fields, [
            'name'      => 'required|string|unique:products',
            'slug'      => 'required|unique:products',
            'price'     => 'regex:/^\d+(\.\d{1,2})?$/|nullable|max:7',
            'status'    => 'nullable',
            'option'    => 'nullable'
        ]);
    }

    public function generateSlug()
    {
        $this->slug = Str::slug( $this->name );
    }
    public function storeProduct()
    {
        $this->validate( [
            'name'      => 'required|string|unique:products',
            'slug'      => 'required|unique:products',
            'status'    => 'nullable',
            'price'     => 'regex:/^\d+(\.\d{1,2})?$/|nullable|max:7',
            'option'    => 'nullable'
        ]);
        $product            = new Product();
        $product->name      = $this->name;
        $product->slug      = $this->slug;
        $product->price      = $this->price??null;
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
// (1, '??????????????????', '??????????????????', 1, ''),
// (2, '????????????????????????', '????????????????????????', 1, NULL),
// (3, '???????????? ????????????????????????', '???????????? ????????????????????????', 1, ''),
// (4, '????????????????????????', '????????????????????????', 1, NULL),
// (5, '?????????????????? ??????????????????', '?????????????????? ??????????????????', 1, NULL),
// (6, ' ???????????????', ' ???????????????', 1, NULL),
// (7, '???????????????????????????', '???????????????????????????', 1, NULL),
// (8, ' ?????????????????????', ' ?????????????????????', 1, NULL),
// (9, '??????????????????', '??????????????????', 1, NULL),
// (10, '???????????????????????????', '???????????????????????????', 1, NULL),
// (11, '?????????', '?????????', 1, NULL),
// (12, '????????????????????????', '????????????????????????', 1, NULL),
// (13, '????????? ?????????????????????', '?????????-?????????????????????', 1, NULL),
// (14, '??????????????????', '??????????????????', 1, NULL),
// (15, ' ????????????', ' ????????????', 1, NULL);