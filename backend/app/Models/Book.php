<?php

namespace App\Models;


use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Book extends Model
{

    protected $guarded = [];

    public function reviews(): HasMany
    {
        return $this->hasMany(Review::class, "bookId");
    }

}
