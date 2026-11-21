<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Car extends Model
{
    protected $fillable = [
        'name',
        'category',
        'description',
        'price_per_day',
        'seats',
        'transmission',
        'fuel',
        'image',
        'is_available',
    ];

    public function reservations(): HasMany
    {
        return $this->hasMany(Reservation::class);
    }
}