<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class OrderItem extends Model
{
    public $timestamps=false;
    use HasFactory;
    /**
     * Get all of the collarsStaylePart for the OrderItem
     *
     * @return \Illuminate\Database\Eloquent\Relations\HasMany
     */
    public function OrderItemStyles()
    {
        return $this->hasMany(OrderItemStyle::class, 'order_number', 'id');
    }

}
