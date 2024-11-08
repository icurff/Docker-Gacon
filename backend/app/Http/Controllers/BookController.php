<?php

namespace App\Http\Controllers;

use App\Models\Book;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;

class BookController extends Controller
{
    public function getAllBooks(Request $request): JsonResponse
    {
        $perPage = $request->input('per_page', 6);
        $query = Book::query()->orderBy('created_at', 'desc');
        // Filter by search query (title)
        if ($request->has('search') && !empty($request->search)) {
            $query->where('title', 'like', '%' . $request->search . '%');
        }
        // Filter by category
        if ($request->has('category') && $request->category !== 'All') {
            $query->where('category', $request->category);
        }
        // Filter by price range
        if ($request->has('priceRange') && $request->priceRange !== 'All') {
            $priceRange = explode('-', $request->priceRange);
            if (count($priceRange) === 2) {
                $query->whereBetween('price', [(int)$priceRange[0], (int)$priceRange[1]]);
            } else {
                $query->where('price', '>=', 1000000); // For priceRange of "1000000+"
            }
        }
        $books = $query->paginate($perPage);
        if ($books->isEmpty()) {
            return response()->json(['message' => 'No books found'], 404);
        }
        return response()->json([
            'data' => $books->items(),
            'current_page' => $books->currentPage(),
            'last_page' => $books->lastPage(),
            'per_page' => $books->perPage(),
            'total' => $books->total(),
        ]);
    }


    public function getBookData(Request $request, $id): JsonResponse
    {
        $book = Book::find($id);
        if (!$book) {
            return response()->json(['message' => 'Book not found'], 404);
        }
        return response()->json(['book' => $book]);
    }

    public function getLatestBooks(Request $request): JsonResponse
    {
        $limit = $request->input('limit', 6);
        $latestBooks = Book::orderBy('created_at', 'desc')
            ->take($limit)
            ->get();
        if ($latestBooks->isEmpty()) {
            return response()->json(['message' => 'No latest books found'], 404);
        }
        return response()->json($latestBooks);
    }

    public function getRelevantBook(Request $request, $id): JsonResponse
    {
        $referenceBook = Book::find($id);
        if (!$referenceBook) {
            return response()->json(['message' => 'Book not found'], 404);
        }
        $limit = $request->input('limit', 6);
        $relevantBooks = Book::where('category', $referenceBook->category)
            ->where('id', '<>', $id)
            ->take($limit)
            ->get();
        if ($relevantBooks->isEmpty()) {
            return response()->json(['message' => 'No relevant books found'], 404);
        }
        return response()->json($relevantBooks);
    }

    public function addBook(Request $request): JsonResponse
    {
        $validatedData = $request->validate([
            'title' => 'required|string',
            'price' => 'required|integer',
            'author' => 'required|string',
            'publisher' => 'required|string',
            'publicDate' => 'nullable|date',
            'pages' => 'required|integer',
            'language' => 'required|string',
            'category' => 'required|string',
            'description' => 'required|string',
            'thumbnail' => 'nullable|string',
            'availability' => 'required|integer|min:0',
        ]);

        $book = Book::create($validatedData);

        return response()->json(['message' => 'Book added successfully!', 'book' => $book], 201);
    }

    public function updateBook(Request $request, $id): JsonResponse
    {
        $book = Book::find($id);
        if (!$book) {
            return response()->json(['message' => 'Book not found'], 404);
        }
        $validatedData = $request->validate([
            'title' => 'sometimes|required|string',
            'price' => '|sometimes|required|integer',
            'author' => 'sometimes|required|string',
            'publisher' => 'sometimes|required|string',
            'publicDate' => 'nullable|date',
            'pages' => 'sometimes|required|integer',
            'language' => 'sometimes|required|string',
            'category' => 'sometimes|required|string',
            'description' => 'sometimes|required|string',
            'thumbnail' => 'sometimes|required|string',
            'availability' => 'sometimes|required|integer|min:0',
        ]);
        $book->update($validatedData);
        return response()->json(['message' => 'Book updated successfully!', 'book' => $book], 200);
    }

    public function deleteBook(Request $request, $id): JsonResponse
    {
        $book = Book::find($id);
        if (!$book) {
            return response()->json(['message' => 'Book not found'], 404);
        }
        $book->delete();
        return response()->json(['message' => 'Book deleted successfully!'], 200);
    }
}
