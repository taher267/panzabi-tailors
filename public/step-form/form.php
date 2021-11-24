<?php

namespace App\Http\Livewire\Customer;

use App\Models\Order;
use Livewire\Component;
use App\Models\Customer;
use App\Models\OrderItem;
use Livewire\WithPagination;
use App\Tailors\TailorsTrait;
use Livewire\WithFileUploads;

class TailorsCustomerOrderItems extends Component
{   
    use WithFileUploads;
    use WithPagination;
    use TailorsTrait;
    public $formId, $currentPage = 1;
    //Order Item

    public function mount($customer_id, $order_number)
    {
        $customer = Customer::find($customer_id);
        $this->customer_id = $customer->id;
        $this->Full_Name = $customer->Full_Name;

        $order = Order::find($order_number);
        $this->order_number     = $order->order_number;
        
    }
    /**Modal */
    public function formController($params)
    {
        $this->formId = $params;
    }
    /**step form ////////////////////////////*/
    public $pages =5;

    public $pages2 = [
        1 => [
            'heading' => 'Personal Information',
            'subheading' => 'Enter your name and email to get started.',
        ],
        2 => [
            'heading' => 'Password',
            'subheading' => 'Create a password for the new account.',
        ],
        3 => [
            'heading' => 'Password3',
            'subheading' => 'Create a password for the new account.3',
        ],
        4 => [
            'heading' => 'Password4',
            'subheading' => 'Create a password for the new account.4',
        ],
        5 => [
            'heading' => 'Password5',
            'subheading' => 'Create a password for the new account.5',
        ],
    ];
    
    private $validationRules = [
        1 => [
            
        ],
        2 => [
            'password' => ['required', 'string', 'min:8'],
            'confirmPassword' => ['required', 'string', 'same:password', 'min:8'],
        ],
        3 => [
            'password' => ['required', 'string', 'min:8'],
            'confirmPassword' => ['required', 'string', 'same:password', 'min:8'],
        ],
        4 => [
            'password' => ['required', 'string', 'min:8'],
            'confirmPassword' => ['required', 'string', 'same:password', 'min:8'],
        ],
        5 => [
            'password' => ['required', 'string', 'min:8'],
            'confirmPassword' => ['required', 'string', 'same:password', 'min:8'],
        ],
    ];
    public function updated($fields)
{
    // $this->validateOnly($fields, $this->validationRules[$this->currentPage],[]);
}
public function placeIteam()
{
    dd('Placed');
}

public function goToNextPage()
{
    // $this->validate($this->validationRules[$this->currentPage]);
    if ( $this->currentPage < $this->pages ) {
        $this->currentPage++;
    }else{$this->currentPage=$this->currentPage;}
    
}

public function goToPreviousPage()
{
    if($this->currentPage > 1 && $this->currentPage <= $this->pages ){
        $this->currentPage--;
    }
    
}

public function resetSuccess()
{
    $this->reset('success');
}
    public function submit()
{
    // $rules = collect($this->validationRules)->collapse()->toArray();

    // $this->validate($rules);

    // User::create([
    //     'name' => "{$this->firstName} {$this->lastName}",
    //     'email' => $this->email,
    //     'password' => bcrypt($this->password),
    // ]);

    // $this->reset();
    // $this->resetValidation();

    // $this->success = 'User created successfully!';
}
///////////////////Step form End
    public function render()
    {
        $orderItems = OrderItem::where('order_number', $this->order_number)->where('customer_id', $this->customer_id)->get();
        return view('livewire.customer.tailors-customer-order-items', compact('orderItems'))->layout('layouts.manage_layout');
    }
}