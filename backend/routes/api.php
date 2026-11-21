<?php

use Illuminate\Support\Facades\Route;

use App\Http\Controllers\Api\CarController;
use App\Http\Controllers\Api\ReservationController;
use App\Http\Controllers\Api\ClientAuthController;
use App\Http\Controllers\Api\AdminAuthController;
use App\Http\Controllers\Api\AdminDashboardController;
use App\Http\Controllers\Api\ContactMessageController;
use App\Http\Controllers\Api\ClientController;

use App\Http\Middleware\EnsureAdmin;
use App\Http\Middleware\EnsureClient;


// ========================================
// PUBLIC ROUTES
// ========================================

// VOITURES
Route::get('/cars', [CarController::class, 'index']);
Route::get('/cars/{id}', [CarController::class, 'show']);

// AUTHENTIFICATION CLIENT
Route::post('/register', [ClientAuthController::class, 'register']);
Route::post('/login', [ClientAuthController::class, 'login']);

// AUTHENTIFICATION ADMIN
Route::post('/admin/login', [AdminAuthController::class, 'login']);

// CONTACT
Route::post('/contact', [ContactMessageController::class, 'store']);


// ========================================
// CLIENT PROTECTED ROUTES
// ========================================

Route::middleware(['auth:sanctum', EnsureClient::class])
    ->group(function () {

        // DECONNEXION CLIENT
        Route::post('/logout', [ClientAuthController::class, 'logout']);

        // RESERVATIONS CLIENT
        Route::post('/reservations', [ReservationController::class, 'store']);
        Route::get('/reservations', [ReservationController::class, 'myReservations']);

    });


// ========================================
// ADMIN PROTECTED ROUTES
// ========================================

Route::middleware(['auth:sanctum', EnsureAdmin::class])
    ->prefix('admin')
    ->group(function () {

        // DASHBOARD
        Route::get('/dashboard/stats', [AdminDashboardController::class, 'index']);

        // DECONNEXION ADMIN
        Route::post('/logout', [AdminAuthController::class, 'logout']);

        // GESTION DES CLIENTS
        Route::get('/clients', [ClientController::class, 'index']);

        // GESTION DES MESSAGES
        Route::get('/messages', [ContactMessageController::class, 'index']);
        Route::put('/messages/{id}/status', [ContactMessageController::class, 'updateStatus']);
        Route::delete('/messages/{id}', [ContactMessageController::class, 'destroy']);

        // GESTION DES VOITURES
        Route::post('/cars', [CarController::class, 'store']);
        Route::post('/cars/{id}', [CarController::class, 'update']);
        Route::delete('/cars/{id}', [CarController::class, 'destroy']);

        // GESTION DES RESERVATIONS
        Route::get('/reservations', [ReservationController::class, 'index']);
        Route::put('/reservations/{id}/status', [ReservationController::class, 'updateStatus']);

    });