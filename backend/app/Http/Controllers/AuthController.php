<?php

namespace App\Http\Controllers;

use App\Models\Cart;
use App\Models\User;
use Exception;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Laravel\Socialite\Facades\Socialite;
use Tymon\JWTAuth\Exceptions\JWTException;
use Tymon\JWTAuth\Facades\JWTAuth;

class AuthController extends Controller
{
    public function getUserData(Request $request): JsonResponse
    {
        $user = auth()->user();
        return response()->json(['user' => $user]);
    }

    public function register(Request $request): JsonResponse
    {
        $validatedData = $request->validate([
            'email' => 'required|email|unique:users,email',
            'password' => 'required|confirmed|min:6',
        ]);
        $validatedData['password'] = bcrypt($validatedData['password']);
        $user = User::create($validatedData);
        Cart::create(['userId' => $user->id]);
        $token = JWTAuth::fromUser($user);
        return response()->json(compact('user', 'token'), 201);
    }


    public function login(Request $request): JsonResponse
    {
        $credentials = $request->only('email', 'password');

        try {
            if (!$token = JWTAuth::attempt($credentials)) {
                return response()->json(['error' => 'Invalid credentials'], 401);
            }
        } catch (JWTException $e) {
            return response()->json(['error' => 'Could not create token'], 500);
        }

        $user = Auth::user();

        return response()->json(['user' => $user, 'token' => $token]);
    }


    public function handleGoogleCallback(): JsonResponse
    {

        try {
            $googleUser = Socialite::driver('google')->stateless()->user();
            $user = User::where('email', $googleUser->email)->first();
            if (!$user) {
                $user = User::create([
                    'email' => $googleUser->email,
                    'password' => bcrypt(rand(100000, 999999))
                ]);
            }
            $token = JWTAuth::fromUser($user);
            return response()->json(['user' => $user, 'token' => $token]);
        } catch (Exception $e) {
            return response()->json(['error' => 'Error handling Google login'], 500);
        }
    }

}
