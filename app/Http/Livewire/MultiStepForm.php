<?php

namespace App\Http\Livewire;

use Livewire\Component;
use Livewire\WithPagination;
use App\Tailors\TailorsTrait;
use Livewire\WithFileUploads;

class MultiStepForm extends Component
{
    use WithFileUploads;
    use WithPagination;
    use TailorsTrait;
    
    public $currentPage = 1;
    public $pages2 = 5;
    public $success;

    // Form properties
    public $firstName;
    public $lastName;
    public $email;
    public $password;
    public $confirmPassword;
////////////////////////// Start
public $pages = [
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
        'firstName' => ['required', 'min:3'],
        'lastName' => ['required', 'min:3'],
        'email' => ['required', 'email', 'unique:users,email'],
    ],
    2 => [
        'password' => ['required', 'string', 'min:8'],
        'confirmPassword' => ['required', 'string', 'same:password', 'min:8'],
    ],
];

public function updated($propertyName)
{
    $this->validateOnly($propertyName, $this->validationRules[$this->currentPage]);
}

public function goToNextPage()
{
    // $this->validate($this->validationRules[$this->currentPage]);
    $this->currentPage++;
}

public function goToPreviousPage()
{
    $this->currentPage--;
}

public function resetSuccess()
{
    $this->reset('success');
}

public function submit()
{
    $rules = collect($this->validationRules)->collapse()->toArray();

    $this->validate($rules);

    User::create([
        'name' => "{$this->firstName} {$this->lastName}",
        'email' => $this->email,
        'password' => bcrypt($this->password),
    ]);

    $this->reset();
    $this->resetValidation();

    $this->success = 'User created successfully!';
}
////////////////////////// End

    public function render()
    {
        return view('livewire.multi-step-form')->layout('layouts.manage_layout');
    }
}
