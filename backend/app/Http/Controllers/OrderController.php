<?php

namespace App\Http\Controllers;

use App\Mail\OrderDetailsMail;
use App\Models\CartItem;
use App\Models\Order;
use App\Models\OrderItem;
use Exception;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Mail;

class OrderController extends Controller
{
    public function getAllOrders(Request $request): JsonResponse
    {
        $perPage = $request->input('per_page', 6);
        $query = Order::with(['orderItems.book'])
            ->orderBy('created_at', 'desc');

        // Filter by status
        if ($request->has('status') && !empty($request->status)) {
            $query->where('status', $request->status);
        }

        // Filter by total price range
        if ($request->has('priceRange') && $request->priceRange !== 'All') {
            $priceRange = explode('-', $request->priceRange);
            if (count($priceRange) === 2) {
                $query->whereBetween('total', [(int)$priceRange[0], (int)$priceRange[1]]);
            } else {
                $query->where('total', '>=', 1000000); // For priceRange of "1000000+"
            }
        }

        // Search by book title
        if ($request->has('search') && !empty($request->search)) {
            $query->whereHas('orderItems.book', function ($query) use ($request) {
                $query->where('title', 'like', '%' . $request->search . '%');
            });
        }

        $orders = $query->paginate($perPage);

        if ($orders->isEmpty()) {
            return response()->json(['message' => 'No orders found'], 404);
        }

        return response()->json([
            'data' => $orders->items(),
            'current_page' => $orders->currentPage(),
            'last_page' => $orders->lastPage(),
            'per_page' => $orders->perPage(),
            'total' => $orders->total(),
        ]);
    }


    public function updateOrderStatus(Request $request, $orderId): JsonResponse
    {
        $request->validate([
            'status' => 'required|string|max:50',
        ]);
        $order = Order::where('id', $orderId)
            ->first();
        if (!$order) {
            return response()->json(['message' => 'Order not found'], 404);
        }
        $order->status = $request->status;
        $order->save();
        return response()->json(['message' => 'Order updated successfully'], 200);
    }

    public function getMyOrders(Request $request): JsonResponse
    {
        $user = auth()->user();

        // Get the per_page parameter from the request, default to 6 if not provided
        $perPage = $request->input('per_page', 6);

        // Query to get the user's orders with pagination
        $orders = Order::where('userId', $user->id)
            ->with(['orderItems.book'])
            ->orderBy('created_at', 'desc')
            ->paginate($perPage); // Paginate the result

        // If no orders are found, return a 404 response
        if ($orders->isEmpty()) {
            return response()->json(['message' => 'No orders found'], 404);
        }

        // Return the paginated response with relevant pagination info
        return response()->json([
            'data' => $orders->items(),
            'current_page' => $orders->currentPage(),
            'last_page' => $orders->lastPage(),
            'per_page' => $orders->perPage(),
            'total' => $orders->total(),
        ], 200);
    }


    public function checkout(Request $request): JsonResponse
    {
        $user = auth()->user();

        $request->validate([
            'cartItemIds' => 'required|array',
            'cartItemIds.*' => 'exists:cart_items,id',
            'shipAddress' => 'required|string|max:255',
            'paymentMethod' => 'required|string|max:50'
        ]);

        $cartItems = CartItem::whereIn('cart_items.id', $request->cartItemIds)
            ->join('carts', 'cart_items.cartId', '=', 'carts.id')
            ->where('carts.userId', $user->id)
            ->with('book')
            ->select('cart_items.*')
            ->get();

        if ($cartItems->isEmpty()) {
            return response()->json(['message' => 'No selected items found in the cart'], 404);
        }
        DB::beginTransaction();
        try {
            $totalPrice = $cartItems->sum(function ($cartItem) {
                return $cartItem->quantity * $cartItem->book->price;
            });

            $order = Order::create([
                'userId' => $user->id,
                'shipAddress' => $request->shipAddress,
                'paymentMethod' => $request->paymentMethod,
                'total' => $totalPrice,
                'status' => 'Pending'
            ]);


            $orderItems = [];
            foreach ($cartItems as $cartItem) {
                $orderItem = OrderItem::create([
                    'orderId' => $order->id,
                    'bookId' => $cartItem->book->id,
                    'quantity' => $cartItem->quantity,
                    'price' => $cartItem->book->price
                ]);
                $orderItem->book = $cartItem->book; // Add book details to the order item
                $orderItems[] = $orderItem;
            }
            CartItem::whereIn('id', $request->cartItemIds)->delete();
            DB::commit();
            Mail::to($user->email)->send(new OrderDetailsMail($order, $orderItems));
            return response()->json(['message' => 'Checkout successful', 'order' => $order], 200);
        } catch (Exception $e) {
            DB::rollBack();
            return response()->json(['message' => 'Checkout failed', 'error' => $e->getMessage()], 500);
        }
    }


}
