<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class OrderItemStyle extends Model
{
    use HasFactory;
    public $timestamps=false;
    protected $table = 'order_item_styles';
    // protected $casts = [
    //     'collars_check'=>'array'
    // ];
}
