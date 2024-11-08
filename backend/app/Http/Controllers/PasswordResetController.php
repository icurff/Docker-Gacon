<?php

namespace App\Http\Controllers;

use App\Mail\PasswordResetMail;
use App\Models\PasswordReset;
use App\Models\User;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Str;
use Illuminate\Http\JsonResponse;

class PasswordResetController extends Controller
{
    public function createPasswordResetToken(Request $request): JsonResponse
    {
        $request->validate([
            'email' => 'required|email|exists:users,email',
        ]);
        $user = User::where('email', $request->email)->first();
        $token = Str::random(64);
        PasswordReset::create([
            'userId' => $user->id,
            'token' => $token,
            'expires_at' => Carbon::now()->addHour(),
        ]);
        Mail::to($user->email)->send(new PasswordResetMail($token));
        return response()->json(['message' => 'Password reset email sent.']);
    }

    public function resetPassword(Request $request)
    {
        $request->validate([
            'token' => 'required|string',
            'password' => 'required|string|confirmed',
        ]);
        $passwordReset = PasswordReset::where('token', $request->token)->first();
        if (Carbon::parse($passwordReset->expires_at)->isPast() || !$passwordReset) {
            return response()->json(['message' => 'Invalid or expired token.'], 400);
        }
        $user = User::find($passwordReset->userId);
        $user->password = bcrypt($request->password);
        $user->save();
        PasswordReset::where('token', $request->token)->delete();
        return response()->json(['message' => 'Password reset successful.']);
    }
}
