<?php

use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Route;
use App\Http\Livewire\Customer\CustomerTailorsOrders;
use App\Http\Livewire\Customer\CustomerTailorsEditOrder;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/', function () {
    return view('base');
})->name('home');
Route::get('/table', function () {
    return view('table');
})->name('table');

//Route::middleware(['auth:sanctum', 'verified'])->get('/dashboard', function () {
 //   return view('dashboard');
//})->name('dashboard');


Route::middleware(['auth:sanctum', 'verified'])->group(function(){
    Route::get('/dashboard', function () {
        // dd(Auth::user()->utype);
        return view('dashboard');
    })->name('dashboard');
});


Route::middleware(['auth:sanctum', 'verified', 'tailorsauth'])->group(function () {
    Route::prefix('admin')->group(function () {
        Route::get('/dashboard', App\Http\Livewire\Admin\TailorsAdminDashboard::class)->name('admin.dashboard');
        // dd(session('utype'));
        Route::get('/users', App\Http\Livewire\Admin\TailorsAdminUser::class)->name('admin.users');
        Route::get('/edit-user/{user_id}', App\Http\Livewire\Admin\TailorsEditAdminUser::class)->name('admin.edituser');
        // Route::get('/order-fields', App\Http\Livewire\Admin\TailorsOrderItem::class)->name('admin.productfield');
        Route::get('/order-measure-fields', App\Http\Livewire\Admin\TailorsOrderItemMeasurment::class)->name('admin.measurefield');
        Route::get('/user-roles', App\Http\Livewire\Admin\TailorsAdminRole::class)->name('admin.roles');
        Route::get('/user-roles/edit/{role_id}', App\Http\Livewire\Admin\TailorsEditAdminRole::class)->name('admin.editrole');
        Route::get('/product-manager', App\Http\Livewire\Admin\ProductNameManager::class)->name('admin.productmanager');
        Route::get('/measure-manager', App\Http\Livewire\Admin\MeasurementManager::class)->name('admin.measuremanager');
        Route::get('/measure-manager/product/edit/{product_id}', App\Http\Livewire\Admin\TailorsEditAdminProduct::class)->name('admin.editproduct');
        Route::get('/measure-manager/style', App\Http\Livewire\Admin\TailorsStyleOfMeasurePart::class)->name('admin.stylemeasure');
        Route::get('/measure-manager/style/edit/{style_id}', App\Http\Livewire\Admin\TailorsEditStyleOfMeasurePart::class)->name('admin.editstylemeasure');


    });

});

Route::middleware(['auth:sanctum', 'verified', 'manager.auth'])->group(function () {
    Route::prefix('customer')->group(function () {
        Route::get('/customers', App\Http\Livewire\Customer\CustomerTailorsOrders::class)->name('customer.customers');
        Route::get('/new-order', App\Http\Livewire\Customer\CustomerTailorsNewOrder::class)->name('customer.neworder');
        // dd(session('utype'));
        Route::get('/edit/{customer_id}', App\Http\Livewire\Customer\TailorsCustomerEditInfo::class)->name('customer.editinfo');

        Route::get('/details/{customer_id}', App\Http\Livewire\Customer\CustomerTailorsOrderDetails::class)->name('customer.details');

        Route::get('/order/edit/{order_id}', App\Http\Livewire\Customer\CustomerTailorsEditOrder::class)->name('customer.editorder');
        // Route::get('/edit-user/{user_id}', App\Http\Livewire\Admin\TailorsEditAdminUser::class)->name('admin.edituser');
        // Route::get('/order-fields', App\Http\Livewire\Admin\TailorsOrderItem::class)->name('admin.productfield');
        // Route::get('/order-measure-fields', App\Http\Livewire\Admin\TailorsOrderItemMeasurment::class)->name('admin.measurefield');
        // Route::get('/user-roles', App\Http\Livewire\Admin\TailorsAdminRole::class)->name('admin.roles');
        // Route::get('/user-roles/edit/{role_id}', App\Http\Livewire\Admin\TailorsEditAdminRole::class)->name('admin.editrole');

    });
});

//Route::get('/home', [App\Http\Controllers\HomeController::class, 'index'])->name('home');

