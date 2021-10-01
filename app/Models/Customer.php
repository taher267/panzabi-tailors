<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Customer extends Model
{
    use HasFactory;
    /**
     * Get all of the Orders for the Customer
     *
     * @return \Illuminate\Database\Eloquent\Relations\HasMany
     */
    public function Orders(): HasMany
    {
        return $this->hasMany(Order::class, 'foreign_key', 'local_key');
    }
}
