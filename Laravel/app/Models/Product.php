<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Product extends Model
{
    use HasFactory;
    use HasFactory;
    protected $table ='product';
    protected $fillable = [
        'id',
        'productname',
        'productdescription',
        'price',
        'productimage',
        'productownerid',
        'buyeruserid'

        
    ];
}
