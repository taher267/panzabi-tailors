<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class DesignItem extends Model
{
    use HasFactory;
    public $timestamps = false;
    // INSERT INTO `design_items` (`id`, `name`, `slug`) VALUES (NULL, 'কলার', 'collar'), (NULL, 'হাতা', 'sleeve'), (NULL, 'কাফ', 'cuff'), (NULL, 'প্লেট', 'plate'), (NULL, 'পকেট', 'pocket'), (NULL, 'পাইপিং', 'piping'),(NULL, 'চেইন', 'zip'), (NULL, 'অন্যান্য', 'other');
}
