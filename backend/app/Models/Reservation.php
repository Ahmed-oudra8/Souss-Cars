<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use App\Models\User;
class Reservation extends Model
{
    protected $fillable = [
    'user_id',
    'car_id',
    'customer_name',
    'phone',
    'pickup_location',
    'start_date',
    'end_date',
    'total_price',
    'status',
];

    public function car(): BelongsTo
    {
        return $this->belongsTo(Car::class);
    }
    public function user(): BelongsTo
{
    return $this->belongsTo(User::class);
}
}