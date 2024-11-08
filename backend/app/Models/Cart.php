<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Cart extends Model
{
    use HasFactory;

    protected $guarded = [];
    public $timestamps = false;

    public function cartItems(): HasMany
    {
        return $this->hasMany(CartItem::class, "cartId");
    }

}
