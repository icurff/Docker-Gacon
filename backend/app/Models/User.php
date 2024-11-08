<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Relations\HasOne;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Notifications\Notifiable;
use Tymon\JWTAuth\Contracts\JWTSubject;

class User extends Authenticatable implements JWTSubject
{

    use HasFactory, Notifiable;

    protected $guarded = [];

    protected $hidden = [
        'password',
    ];
    protected $casts = [
        'isAdmin' => 'boolean',
    ];


    public function cart(): HasOne
    {
        return $this->hasOne(Cart::class, "userId");
    }

    public function orders(): HasMany
    {
        return $this->hasMany(Order::class, "userId");
    }

    public function addresses(): HasMany
    {
        return $this->hasMany(Address::class, "userId");
    }

    public function reviews(): HasMany
    {
        return $this->hasMany(Review::class, "userId");
    }

    // const CREATED_AT = 'createDate';

    public function getJWTIdentifier()
    {
        return $this->getKey();
    }

    public function getJWTCustomClaims()
    {
        return [];
    }
}
