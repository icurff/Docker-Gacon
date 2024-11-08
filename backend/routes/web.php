<?php


use App\Http\Controllers\AuthController;
use Illuminate\Support\Facades\Route;
use Laravel\Socialite\Facades\Socialite;


Route::get('/auth/redirect', function () {
    return Socialite::driver('google')->redirect();
});

Route::get('/auth/callback', [AuthController::class, 'handleGoogleCallback']);

Route::get('/IPN', [AuthController::class, 'handleGoogleCallback']);

