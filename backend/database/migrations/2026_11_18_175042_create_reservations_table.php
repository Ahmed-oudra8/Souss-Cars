<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('reservations', function (Blueprint $table) {
            $table->id();

            // La voiture réservée
            $table->foreignId('car_id')
                  ->constrained('cars')
                  ->restrictOnDelete();

            // Informations du client
            $table->string('customer_name');
            $table->string('phone');
            $table->string('pickup_location');

            // Dates de réservation
            $table->date('start_date');
            $table->date('end_date');

            // Informations du paiement et du statut
            $table->decimal('total_price', 10, 2)->nullable();
            $table->string('status')->default('pending');

            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('reservations');
    }
};