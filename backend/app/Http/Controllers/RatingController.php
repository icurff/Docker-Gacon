<?php

namespace App\Http\Controllers;

use App\Models\Book;
use App\Models\Rating;
use App\Models\Review;
use Illuminate\Http\Request;

class RatingController extends Controller
{
    public function getBookRating($bookId)
    {
        // Get all ratings for the book
        $ratings = Review::where('bookId', $bookId)->get();

        // Calculate the average rating for the book, default to 0 if there are no ratings
        $averageRating = $ratings->avg('rating') ?? 0;

        // Get total number of ratings for the book
        $totalRatings = $ratings->count();

        return response()->json([
            'average_rating' => round($averageRating, 1),
            'total_ratings' => $totalRatings,
        ]);
    }

}
