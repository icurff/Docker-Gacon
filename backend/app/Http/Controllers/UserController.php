<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Auth;
use Illuminate\Http\JsonResponse;

class UserController extends Controller
{
    public function getAllUsers(Request $request): JsonResponse
    {
        $perPage = $request->input('per_page', 6);
        $query = User::query()->orderBy('created_at', 'desc');
        // Search
        if ($request->has('search') && !empty($request->search)) {
            $query->where('email', 'like', '%' . $request->search . '%');
        }
        // Filter by isAdmin
        if ($request->has('isAdmin') && $request->isAdmin !== 'All') {
            if ($request->isAdmin === 'Admin') {
                $query->where('isAdmin', true);
            }

        }
        $users = $query->paginate($perPage);
        return response()->json($users);
    }

    public function updateUser(Request $request, $userId): JsonResponse
    {
        $validatedData = $request->validate([
            'isAdmin' => 'sometimes|required|boolean',
            'password' => 'sometimes|required|string|min:6',
        ]);
        $user = User::find($userId);
        if (!$user) {
            return response()->json(['message' => 'User not found'], 404);
        }
        if (isset($validatedData['password'])) {
            $validatedData['password'] = bcrypt($validatedData['password']);
        }
        $user->update($validatedData);
        return response()->json(['message' => 'User updated successfully'], 200);
    }


    public function updatePassword(Request $request)
    {
        $request->validate([
            'old_password' => 'required',
            'new_password' => 'required|confirmed',
        ]);
        $user = Auth::user();
        if (!Hash::check($request->old_password, $user->password)) {
            return response()->json(['message' => 'Old password is incorrect'], 400);
        }
        $user->password = bcrypt($request->new_password);
        $user->save();

        return response()->json(['message' => 'Password updated successfully']);
    }

    public function updateProfile(Request $request): JsonResponse
    {
        $user = Auth::user();
        $request->validate([
            'avatar' => 'sometimes|required|string',
        ]);
        $user->avatar = $request->avatar;
        $user->save();
        return response()->json(['message' => 'User Profile updated successfully']);

    }

}
