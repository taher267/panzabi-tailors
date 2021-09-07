<?php

use Illuminate\Support\Facades\Route;

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
        Route::get('/admin-user', App\Http\Livewire\Admin\TailorsNewAdminUser::class)->name('admin.newuser');
        Route::get('/order-fields', App\Http\Livewire\Admin\TailorsOrderItem::class)->name('admin.productfield');
        Route::get('/order-measure-fields', App\Http\Livewire\Admin\TailorsOrderItemMeasurment::class)->name('admin.measurefield');
        Route::get('/user-roles', App\Http\Livewire\Admin\TailorsAdminRole::class)->name('admin.roles');
    });



});

//Route::get('/home', [App\Http\Controllers\HomeController::class, 'index'])->name('home');

