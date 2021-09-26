<?php

namespace App\Http\Livewire\Customer;

use App\Models\Product;
use Livewire\Component;
use App\Models\Customer;

class CustomerTailorsOrderDetails extends Component
{
    public $errorOut, $customer_id, $Full_Name, $mobile, $email, $address, $country, $city, $province, $line1, $line2, $new_photo, $photo, $zipcode ;
    public $allproduct, $products=[];
    //Order
    public $delivery_date, $additional,$quantity,$subtotal,$discount,$delivery_charge,$delivery_system,$total,$delivered_date, $wages;//মজুরি
    //Order Item
    public $cloth_long,$cloth_body,$body_loose,$cloth_belly,$belly_loose,$cloth_enclosure,$hand_long ,$sleeve_less,$sleeve_pasting ,$cloth_throat,$cloth_collar ,$cloth_put ,$cloth_mora,$noke_shoho;
    public $currentStep = 1;
    public $name, $price, $detail, $stepstatus = 1, $status;
    public $successMsg = '', $hidesidebar;
    public $formErrorOne,$formErrorTwo, $formErrorThree;
    //style
    public $col_0,$col_1;

    public function mount($customer_id)
    {
        $customer = Customer::find( $customer_id);
        $this->customer_id      = $customer->id;
        $this->Full_Name        = $customer->Full_Name;
        $this->mobile           = $customer->mobile;
        $this->email            = $customer->email;
        $this->photo            = $customer->photo;
        $this->address          = $customer->address;
        $this->country          = $customer->country;
        $this->city             = $customer->city;
        $this->province         = $customer->province;
        $this->line1            = $customer->line1;
        $this->line2            = $customer->line2;
        $this->zipcode          = $customer->zipcode;
    }

    ///////////////////////////////////////////////////////////////
    public function updated($fields)
    {
        $todayDate= date('Y-m-d');
        $this->validateOnly($fields,[
            'delivery_date'     => 'required|date_format:Y-m-d|after_or_equal:'.$todayDate,
            //Measure
            'products'          => 'required|array',
            'additional'        => 'string|nullable',
            'cloth_long'        => 'required|numeric|min:5|max:100',
            'cloth_body'        => 'required|numeric|min:5|max:100',
            'body_loose'        => 'required|numeric|min:5|max:100',
            'cloth_belly'       => 'required|numeric|min:5|max:100',
            'belly_loose'       => 'required|numeric|min:5|max:100',
            'cloth_enclosure'   => 'required|numeric|min:5|max:100',
            'hand_long'         => 'required|numeric|min:5|max:100',
            'sleeve_less'       => 'required|numeric|min:5|max:100',
            'sleeve_pasting'    => 'required|numeric|min:5|max:100',
            'cloth_throat'      => 'required|numeric|min:5|max:100',
            'cloth_collar'      => 'required|numeric|min:5|max:100',
            'cloth_put'         => 'required|numeric|min:5|max:100',
            'cloth_mora'        => 'required|numeric|min:5|max:100',
            'noke_shoho'        => 'numeric|nullable|min:5|max:100',
        ]);
        
    }
    public function formCheckOne()
    {
        if ( $this->delivery_date=='' || sizeof($this->products) ==0) {
            $this->formErrorOne=1;
        }else {
            $this->formErrorOne=0;
        }
    }
    /**
     * Write code on Method
     */
    public function firstStepSubmit()
    {
        // $validatedData = $this->validate([
        //     'Full_Name' => 'required',
        //     'mobile' => 'required|numeric',
        //     'address' => 'required',
        // ]);
 
        $this->currentStep = 2;
    }
    public function formCheckTwo()
    {
        if ( $this->cloth_long =='' ||$this->cloth_body ==''||$this->body_loose ==''||$this->cloth_belly ==''||$this->belly_loose ==''||$this->cloth_enclosure ==''||$this->hand_long ==''||$this->sleeve_less ==''||$this->sleeve_pasting ==''||$this->cloth_throat==''||$this->cloth_collar==''||$this->cloth_put  ==''||$this->cloth_mora =='') {//||$this->cloth_body ==''||$this->body_loose ==''||$this->cloth_belly ==''||$this->belly_loose ==''||$this->cloth_enclosure ==''||$this->hand_long ==''||$this->sleeve_less ==''||$this->sleeve_pasting ==''||$this->cloth_throat==''||$this->cloth_collar==''||$this->cloth_put  ==''||$this->cloth_mora ==''||$this->noke_shoho =='' 
            $this->formErrorTwo=1;
        }else {
            $this->formErrorTwo=0;
        }
    }
  
    /**
     * Write code on Method
     */
    public function secondStepSubmit()
    {
        $validatedData = $this->validate([
            'stepstatus' => 'required',
        ]);
  
        $this->currentStep = 3;
    }
    public function thirdStepSubmit()
    {
        $validatedData = $this->validate([
            'stepstatus' => 'required',
        ]);
  
        $this->currentStep = 4;
    }
    public function formCheckThree()
    {
        if ( $this->name =='' || $this->price=='') {
            $this->formErrorThree=1;

        }else {
            $this->formErrorThree=0;
        }
    }
    /**
     * Write code on Method
     */
    public function submitForm()
    {
        // Team::create([
        //     'name' => $this->Full_Name,
        //     'price' => $this->mobile,
        //     'detail' => $this->address,
        //     'stepstatus' => $this->stepstatus,
        // ]);
  
        $this->successMsg = 'Team successfully created.';
  
        $this->clearForm();
  
        $this->currentStep = 1;
    }
  
    /**
     * Write code on Method
     */
    public function back($step)
    {
        $this->currentStep = $step;    
    }
  
    /**
     * Write code on Method
     */
    public function clearForm()
    {
        $this->Full_Name = '';
        $this->mobile = '';
        $this->address = '';
        $this->stepstatus = 1;
    }
    public function sidebar()
    {
        $this->col_0 = 1;
    }
    ////////////////////////////////////////////////////////////////////////////////////
    
    public function render()
    {
        $this->formCheckOne();
        $this->formCheckTwo();
        $this->formCheckThree();
        $allproducts = Product::all();
        return view('livewire.customer.customer-tailors-order-details', compact('allproducts'))->layout('layouts.manage_layout');
    }
}
