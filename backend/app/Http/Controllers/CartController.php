<?php

namespace App\Http\Controllers;

use App\Models\Book;
use App\Models\Cart;
use App\Models\CartItem;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;

class CartController extends Controller
{
    public function getCartItems(Request $request): JsonResponse
    {
        $user = auth()->user();
        $cart = Cart::where('userId', $user->id)
            ->with('cartItems.book')
            ->first();
        if (!$cart) {
            return response()->json(['message' => 'Cart not found'], 404);
        }
        $totalPrice = $cart->cartItems->sum(function ($cartItem) {
            return $cartItem->quantity * $cartItem->book->price;
        });
        $response = [
            'cartItems' => $cart->cartItems,
            'total' => $totalPrice
        ];
        return response()->json($response);
    }

    public function addToCart(Request $request): JsonResponse
    {
        $request->validate([
            'bookId' => 'required|exists:books,id',
            'quantity' => 'required|integer|min:1'
        ]);
        $user = auth()->user();
        $book = Book::find($request->bookId);
        if (!$book) {
            return response()->json(['message' => 'Book not found'], 404);
        }

        $cart = Cart::firstOrCreate(['userId' => $user->id]);
        $cartItem = CartItem::where('cartId', $cart->id)
            ->where('bookId', $book->id)
            ->first();
        if ($cartItem) {
            $cartItem->quantity += $request->quantity;
            $cartItem->save();
        } else {
            CartItem::create([
                'cartId' => $cart->id,
                'bookId' => $book->id,
                'quantity' => $request->quantity
            ]);
        }
        $cart->total += $book->price * $request->quantity;
        $cart->save();

        return response()->json(['message' => 'Item added to cart'], 200);
    }

    public function clearCart(Request $request): JsonResponse
    {
        $user = auth()->user();
        $cart = Cart::where('userId', $user->id)->first();
        if (!$cart) {
            return response()->json(['message' => 'Cart not found'], 404);
        }
        $cart->delete();
        return response()->json(['message' => 'Cart cleared successfully']);
    }

    // Update the quantity of an item in the cart
    public function updateCartItem(Request $request, $itemId): JsonResponse
    {
        $request->validate([
            'quantity' => 'required|integer|min:1'
        ]);

        $user = auth()->user();
        $cart = Cart::where('userId', $user->id)->first();
        if (!$cart) {
            return response()->json(['message' => 'Cart not found'], 404);
        }
        $cartItem = CartItem::where('id', $itemId)
            ->where('cartId', $cart->id)
            ->with('book')
            ->first();
        if (!$cartItem) {
            return response()->json(['message' => 'Item not found in cart'], 404);
        }
        $cart->total -= $cartItem->quantity * $cartItem->book->price;  // make sure if there are no changes in price
        $cart->total += $request->quantity * $cartItem->book->price;
        $cart->save();

        $cartItem->quantity = $request->quantity;
        $cartItem->save();


        return response()->json(['message' => 'Cart updated successfully'], 200);
    }


    public function removeFromCart(Request $request, $itemId): JsonResponse
    {
        $user = auth()->user();
        $cart = Cart::where('userId', $user->id)->first();
        if (!$cart) {
            return response()->json(['message' => 'Cart not found'], 404);
        }
        $cartItem = CartItem::where('id', $itemId)
            ->where('cartId', $cart->id)
            ->with('book')
            ->first();
        if (!$cartItem) {
            return response()->json(['message' => 'Item not found in cart'], 404);
        }
        $cart->total -= $cartItem->quantity * $cartItem->book->price;
        $cartItem->delete();
        $cart->save();

        return response()->json(['message' => 'Item removed from cart'], 200);
    }
}
