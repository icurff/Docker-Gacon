<?php

namespace App\Http\Controllers;

use App\Models\Book;
use App\Models\Review;
use Illuminate\Http\Request;

class ReviewController extends Controller
{
    public function getBookReviews($bookId)
    {
        $reviews = Review::where('bookId', $bookId)
            ->with('user')
            ->orderBy('created_at', 'desc')
            ->get();

        $formattedReviews = $reviews->map(function ($review) {
            return [
                'userEmail' => $review->user ? $review->user->email : 'User not found',
                'userAvatar' => $review->user->avatar ?? 'https://cdn.pixabay.com/photo/2016/08/08/09/17/avatar-1577909_1280.png',
                'content' => $review->content,
                'rating' => $review->rating,
                'created_at' => $review->created_at->toDateTimeString(),
            ];
        });

        return response()->json(['reviews' => $formattedReviews]);
    }


    public function submitReview(Request $request, $bookId)
    {
        $validated = $request->validate([
            'content' => 'required|string|max:500',
            'rating' => 'required|integer|min:1|max:5'
        ]);

        if (!Book::find($bookId)) {
            return response()->json(['error' => 'Book not found'], 404);
        }

        Review::create([
            'userId' => auth()->id(),
            'bookId' => $bookId,
            'content' => $validated['content'],
            'rating' => $validated['rating']
        ]);

        return response()->json(['message' => 'Review submitted successfully']);
    }

}
