<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\User;

class ClientController extends Controller
{
    public function index()
    {
        $clients = User::select(
            'id',
            'name',
            'email',
            'created_at'
        )
        ->latest()
        ->get();

        return response()->json([
            'success' => true,
            'data' => $clients
        ]);
    }
}