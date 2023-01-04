<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class UserDetails extends Model
{
    use HasFactory;
    protected $table ='userdetails';
    protected $fillable = [
        'id',
        'name',
        'dob',
        'address',
        'contact',
        'email',
        'password',
        'usertype',
        'userimage'
    ];
}
