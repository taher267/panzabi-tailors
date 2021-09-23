<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Role extends Model
{
    use HasFactory;

    /**
     * Get all of the roles for the Role
     *
     * @return \Illuminate\Database\Eloquent\Relations\HasMany
     */
    public function role()
    {
        return $this->hasOne(User::class);
    }
}
