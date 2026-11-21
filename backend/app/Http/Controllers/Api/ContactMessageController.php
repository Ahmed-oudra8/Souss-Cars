<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\ContactMessage;
use Illuminate\Http\Request;

class ContactMessageController extends Controller
{
    // Enregistrer un nouveau message
    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|email|max:255',
            'subject' => 'required|string|max:255',
            'message' => 'required|string|max:5000',
        ]);

        $contactMessage = ContactMessage::create($validated);

        return response()->json([
            'success' => true,
            'message' => 'Votre message a été envoyé avec succès.',
            'data' => $contactMessage,
        ], 201);
    }

    // Afficher tous les messages pour Admin
    public function index()
    {
        $messages = ContactMessage::latest()->get();

        return response()->json([
            'success' => true,
            'data' => $messages,
        ]);
    }

    // Changer le statut du message
    public function updateStatus(Request $request, $id)
    {
        $validated = $request->validate([
            'status' => 'required|in:read,unread',
        ]);

        $contactMessage = ContactMessage::findOrFail($id);

        $contactMessage->update([
            'status' => $validated['status'],
        ]);

        return response()->json([
            'success' => true,
            'message' => 'Statut modifié avec succès.',
            'data' => $contactMessage,
        ]);
    }

    // Supprimer un message
    public function destroy($id)
    {
        $contactMessage = ContactMessage::findOrFail($id);

        $contactMessage->delete();

        return response()->json([
            'success' => true,
            'message' => 'Message supprimé avec succès.',
        ]);
    }
}