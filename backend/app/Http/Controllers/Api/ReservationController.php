<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Car;
use App\Models\Reservation;
use Illuminate\Http\Request;
use Carbon\Carbon;

class ReservationController extends Controller
{
    // CREER UNE RESERVATION
    public function store(Request $request)
    {
        $validated = $request->validate([
            'car_id' => 'required|exists:cars,id',
            'customer_name' => 'required|string|max:255',
            'phone' => 'required|string|max:20',
            'pickup_location' => 'required|string|max:255',
            'start_date' => 'required|date|after_or_equal:today',
            'end_date' => 'required|date|after:start_date',
        ]);

        $car = Car::findOrFail($validated['car_id']);

        if (!$car->is_available) {
            return response()->json([
                'success' => false,
                'message' => 'Cette voiture n’est pas disponible.'
            ], 409);
        }

        $alreadyReserved = Reservation::where('car_id', $car->id)
            ->where('status', '!=', 'cancelled')
            ->where('start_date', '<', $validated['end_date'])
            ->where('end_date', '>', $validated['start_date'])
            ->exists();

        if ($alreadyReserved) {
            return response()->json([
                'success' => false,
                'message' => 'Cette voiture est déjà réservée pendant ces dates.'
            ], 409);
        }

        $days = Carbon::parse($validated['start_date'])
            ->diffInDays(Carbon::parse($validated['end_date']));

        $totalPrice = $days * $car->price_per_day;

        $reservation = Reservation::create([
            ...$validated,
            'user_id' => $request->user()->id,
            'total_price' => $totalPrice,
            'status' => 'pending',
        ]);

        return response()->json([
            'success' => true,
            'message' => 'Réservation enregistrée avec succès.',
            'data' => $reservation
        ], 201);
    }

    // RESERVATIONS DU CLIENT CONNECTE
    public function myReservations(Request $request)
    {
        $reservations = Reservation::with('car')
            ->where('user_id', $request->user()->id)
            ->latest()
            ->get();

        return response()->json([
            'success' => true,
            'data' => $reservations
        ]);
    }

    // TOUTES LES RESERVATIONS POUR ADMIN
    public function index()
    {
        $reservations = Reservation::with('car')
            ->latest()
            ->get();

        return response()->json([
            'success' => true,
            'data' => $reservations
        ]);
    }

    // MODIFIER LE STATUT POUR ADMIN
    public function updateStatus(Request $request, $id)
    {
        $validated = $request->validate([
            'status' => 'required|in:pending,confirmed,cancelled',
        ]);

        $reservation = Reservation::findOrFail($id);

        $reservation->update([
            'status' => $validated['status'],
        ]);

        return response()->json([
            'success' => true,
            'message' => 'Statut modifié avec succès.',
            'data' => $reservation
        ]);
    }
}