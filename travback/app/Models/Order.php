<?php

namespace App\Models;

use App\Models\Trip;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Order extends Model
{
    use HasFactory;
    protected $table = 'order';
    protected $fillable = [
        'user_id',
        'trip_id',
        'name',  
        'contact',
        'date',
        'qty',
        'status',
    ];

      
    protected $with = ['trip'];
    public function trip()
    {
        return $this->belongsTo(Trip::class, 'trip_id', 'id');
    }

}
