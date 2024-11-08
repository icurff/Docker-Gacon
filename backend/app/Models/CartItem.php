<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class CartItem extends Model
{
    use HasFactory;

    protected $guarded = [];
    public $timestamps = false;

    public function book(): BelongsTo
    {
        return $this->belongsTo(Book::class, "bookId");
    }

    public function cart(): BelongsTo
    {
        return $this->belongsTo(Cart::class, "cardId");
    }
}
