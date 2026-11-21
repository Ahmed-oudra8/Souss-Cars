<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use App\Models\User;
use Symfony\Component\HttpFoundation\Response;

class EnsureClient
{
    public function handle(Request $request, Closure $next): Response
    {
        if (!$request->user() instanceof User) {
            return response()->json([
                'message' => 'Accès réservé aux clients.'
            ], 403);
        }

        return $next($request);
    }
}