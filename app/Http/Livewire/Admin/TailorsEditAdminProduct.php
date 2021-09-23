<?php

namespace App\Http\Livewire\Admin;

use App\Models\Product;
use Livewire\Component;
use Illuminate\Support\Str;

class TailorsEditAdminProduct extends Component
{
    public $product_id, $name, $slug, $status, $option, $errorOut ,$customSlug;
    public function mount( $product_id)
    {
        $product = Product::find($product_id);
        $this->name         = $product->name;
        $this->slug         = $product->slug;
        $this->status       = $product->status;
        $this->option       = $product->option;
        $this->product_id   = $product->id;
    }
    public function updated( $fields )
    {
        $this->validateOnly( $fields, [
            'name'      => ["required","string",\Illuminate\Validation\Rule::unique('products')->ignore($this->product_id)],
            'slug'      => ["required","string",\Illuminate\Validation\Rule::unique('products')->ignore($this->product_id)],
            'status'    => 'nullable',
            'option'    => 'nullable'
        ]);
    }

    public function generateSlug()
    {
        $this->slug = Str::slug($this->name);
    }

    public function updateProduct()
    {
        $this->validate( [
            'name'      => ["required","string", \Illuminate\Validation\Rule::unique('products')->ignore($this->product_id)],
            'slug'      => ["required","string", \Illuminate\Validation\Rule::unique('products')->ignore($this->product_id)],
            'status'    => 'nullable',
            'option'    => 'nullable'
        ]);
        $product            = Product::find($this->product_id);
        if( $product->name=== $this->name && $product->slug=== $this->slug 
            && $product->status=== $this->status && $product->option === $this->option){
                session()->flash('msg', "<i class='far fa-thumbs-down text-warning'></i> Nothing has been updated!,warning");
        }else{
            $product->name      = $this->name;
            $product->slug      = $this->slug;
            $product->status    = $this->status ?? true;
            $product->option    = $this->option;
            $product->save();
            session()->flash('msg', "<i class='fa fa-check text-info'></i> Product has been updated!,info");
        }
        
    }
    public function submitError()
    {
        $product = Product::find($this->product_id);
        if( $product->name=== $this->name && $product->slug=== $this->slug 
            && $product->status=== $this->status && $product->option === $this->option){
            $this->errorOut ='err';
        }else{
            $this->errorOut ='';
        }
    }
    public function render()
    {
        $this->submitError();
        return view('livewire.admin.tailors-edit-admin-product')->layout('layouts.admin_layout');
    }
}
