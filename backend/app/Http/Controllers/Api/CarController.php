<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Car;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class CarController extends Controller
{
    // Afficher toutes les voitures disponibles
    public function index()
    {
        $cars = Car::where('is_available', true)->get();

        return response()->json([
            'success' => true,
            'data' => $cars
        ]);
    }

    // Afficher les détails d'une voiture
    public function show($id)
    {
        $car = Car::find($id);

        if (!$car) {
            return response()->json([
                'success' => false,
                'message' => 'Voiture introuvable'
            ], 404);
        }

        return response()->json([
            'success' => true,
            'data' => $car
        ]);
    }

    // Ajouter une voiture avec sa photo
    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'category' => 'required|string|max:255',
            'description' => 'nullable|string',
            'price_per_day' => 'required|numeric|min:0',
            'seats' => 'required|integer|min:1',
            'transmission' => 'required|string',
            'fuel' => 'required|string',
            'image' => 'nullable|image|mimes:jpg,jpeg,png,webp|max:5120',
            'is_available' => 'sometimes|boolean',
        ]);

        if ($request->hasFile('image')) {
            $validated['image'] = $request->file('image')
                ->store('cars', 'public');
        }

        $car = Car::create($validated);

        return response()->json([
            'success' => true,
            'message' => 'Voiture ajoutée avec succès.',
            'data' => $car
        ], 201);
    }

    // Modifier une voiture et éventuellement sa photo
    public function update(Request $request, $id)
    {
        $car = Car::find($id);

        if (!$car) {
            return response()->json([
                'success' => false,
                'message' => 'Voiture introuvable'
            ], 404);
        }

        $validated = $request->validate([
            'name' => 'sometimes|required|string|max:255',
            'category' => 'sometimes|required|string|max:255',
            'description' => 'nullable|string',
            'price_per_day' => 'sometimes|required|numeric|min:0',
            'seats' => 'sometimes|required|integer|min:1',
            'transmission' => 'sometimes|required|string',
            'fuel' => 'sometimes|required|string',
            'image' => 'nullable|image|mimes:jpg,jpeg,png,webp|max:5120',
            'is_available' => 'sometimes|boolean',
        ]);

        if ($request->hasFile('image')) {
            // Supprimer l'ancienne photo
            if ($car->image) {
                Storage::disk('public')->delete($car->image);
            }

            // Enregistrer la nouvelle photo
            $validated['image'] = $request->file('image')
                ->store('cars', 'public');
        }

        $car->update($validated);

        return response()->json([
            'success' => true,
            'message' => 'Voiture modifiée avec succès.',
            'data' => $car
        ]);
    }

    // Supprimer une voiture et sa photo
    public function destroy($id)
    {
        $car = Car::find($id);

        if (!$car) {
            return response()->json([
                'success' => false,
                'message' => 'Voiture introuvable'
            ], 404);
        }

        if ($car->image) {
            Storage::disk('public')->delete($car->image);
        }

        $car->delete();

        return response()->json([
            'success' => true,
            'message' => 'Voiture supprimée avec succès.'
        ]);
    }
}