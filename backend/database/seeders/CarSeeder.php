<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Car;

class CarSeeder extends Seeder
{
    public function run(): void
    {
        $cars = [
            [
                'name' => 'Dacia Logan',
                'category' => 'Économique',
                'description' => 'Voiture économique et confortable pour vos déplacements à Agadir.',
                'price_per_day' => 250,
                'seats' => 5,
                'transmission' => 'Manuelle',
                'fuel' => 'Diesel',
                'image' => null,
                'is_available' => true,
            ],
            [
                'name' => 'Dacia Sandero',
                'category' => 'Citadine',
                'description' => 'Petite voiture pratique pour circuler en ville.',
                'price_per_day' => 250,
                'seats' => 5,
                'transmission' => 'Manuelle',
                'fuel' => 'Essence',
                'image' => null,
                'is_available' => true,
            ],
            [
                'name' => 'Dacia Duster',
                'category' => 'SUV',
                'description' => 'SUV confortable pour les longs trajets et les excursions.',
                'price_per_day' => 450,
                'seats' => 5,
                'transmission' => 'Manuelle',
                'fuel' => 'Diesel',
                'image' => null,
                'is_available' => true,
            ],
            [
                'name' => 'Renault Clio 5',
                'category' => 'Citadine',
                'description' => 'Voiture moderne et agréable pour vos déplacements.',
                'price_per_day' => 300,
                'seats' => 5,
                'transmission' => 'Manuelle',
                'fuel' => 'Essence',
                'image' => null,
                'is_available' => true,
            ],
            [
                'name' => 'Renault Express',
                'category' => 'Familiale',
                'description' => 'Véhicule spacieux pour les familles et les bagages.',
                'price_per_day' => 350,
                'seats' => 5,
                'transmission' => 'Manuelle',
                'fuel' => 'Diesel',
                'image' => null,
                'is_available' => true,
            ],
            [
                'name' => 'Peugeot 208',
                'category' => 'Citadine',
                'description' => 'Citadine confortable et facile à conduire.',
                'price_per_day' => 300,
                'seats' => 5,
                'transmission' => 'Manuelle',
                'fuel' => 'Essence',
                'image' => null,
                'is_available' => true,
            ],
            [
                'name' => 'Peugeot 2008',
                'category' => 'SUV',
                'description' => 'SUV élégant et confortable pour vos voyages.',
                'price_per_day' => 450,
                'seats' => 5,
                'transmission' => 'Automatique',
                'fuel' => 'Diesel',
                'image' => null,
                'is_available' => true,
            ],
            [
                'name' => 'Hyundai i10',
                'category' => 'Économique',
                'description' => 'Petite voiture économique idéale pour la ville.',
                'price_per_day' => 230,
                'seats' => 5,
                'transmission' => 'Manuelle',
                'fuel' => 'Essence',
                'image' => null,
                'is_available' => true,
            ],
            [
                'name' => 'Kia Picanto',
                'category' => 'Économique',
                'description' => 'Voiture compacte et pratique pour Agadir.',
                'price_per_day' => 230,
                'seats' => 5,
                'transmission' => 'Manuelle',
                'fuel' => 'Essence',
                'image' => null,
                'is_available' => true,
            ],
            [
                'name' => 'Volkswagen Polo',
                'category' => 'Citadine',
                'description' => 'Citadine confortable pour vos déplacements quotidiens.',
                'price_per_day' => 350,
                'seats' => 5,
                'transmission' => 'Manuelle',
                'fuel' => 'Diesel',
                'image' => null,
                'is_available' => true,
            ],
            [
                'name' => 'Ford Fiesta',
                'category' => 'Citadine',
                'description' => 'Voiture compacte et agréable à conduire.',
                'price_per_day' => 300,
                'seats' => 5,
                'transmission' => 'Manuelle',
                'fuel' => 'Essence',
                'image' => null,
                'is_available' => true,
            ],
            [
                'name' => 'Fiat Tipo',
                'category' => 'Berline',
                'description' => 'Berline spacieuse et confortable pour les longs trajets.',
                'price_per_day' => 350,
                'seats' => 5,
                'transmission' => 'Manuelle',
                'fuel' => 'Diesel',
                'image' => null,
                'is_available' => true,
            ],
        ];

        foreach ($cars as $car) {
            Car::updateOrCreate(
                ['name' => $car['name']],
                $car
            );
        }
    }
}