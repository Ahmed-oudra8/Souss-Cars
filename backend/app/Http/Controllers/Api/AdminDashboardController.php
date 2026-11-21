<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Car;
use App\Models\Reservation;
use App\Models\User;

class AdminDashboardController extends Controller
{
    public function index()
    {
        $stats = [
            'cars' => Car::count(),

            'reservations' => Reservation::count(),

            'clients' => User::count(),

            'pending_reservations' => Reservation::where(
                'status',
                'pending'
            )->count(),

            'confirmed_reservations' => Reservation::where(
                'status',
                'confirmed'
            )->count(),

            'cancelled_reservations' => Reservation::where(
                'status',
                'cancelled'
            )->count(),
        ];

        return response()->json([
            'success' => true,
            'data' => $stats
        ]);
    }
}