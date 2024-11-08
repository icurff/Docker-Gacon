<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\BookController;
use App\Http\Controllers\OrderController;
use App\Http\Controllers\PasswordResetController;
use App\Http\Controllers\VnpPaymentController;
use Illuminate\Support\Facades\Route;
use App\Http\Middleware\IsAdminMiddleware;
use App\Http\Controllers\CartController;
use App\Http\Controllers\AddressController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\RatingController;
use App\Http\Controllers\ReviewController;
use App\Http\Controllers\DashboardController;
use App\Http\Controllers\PayosPaymentController;

Route::get('/user', [AuthController::class, 'getUserData']);
Route::post('/register', [AuthController::class, 'register']);
Route::post('/login', [AuthController::class, 'login']);

Route::post('/forgot-password', [PasswordResetController::class, 'createPasswordResetToken']);
Route::put('/reset-password', [PasswordResetController::class, 'resetPassword']);

//Book API
Route::get('/books/latest', [BookController::class, 'getLatestBooks']);
Route::get('/books', [BookController::class, 'getAllBooks']);
Route::get('/books/{id}', [BookController::class, 'getBookData']);
Route::get('/books/{id}/relevant', [BookController::class, 'getRelevantBook']);
// Rating Related API
Route::get('/books/{bookId}/rating', [RatingController::class, 'getBookRating']);
// Review Related API
Route::get('/books/{bookId}/reviews', [ReviewController::class, 'getBookReviews']);

Route::middleware(['auth:api'])->group(function () {
    // Address API
    Route::get('/addresses', [AddressController::class, 'getAllAddresses']);
    Route::delete('/addresses/{addressId}', [AddressController::class, 'deleteAddress']);
    Route::post('/addresses', [AddressController::class, 'addAddress']);
    //Cart API
    Route::get('/carts', [CartController::class, 'getCartItems']);
    Route::post('/carts', [CartController::class, 'addToCart']);
    Route::delete('/carts', [CartController::class, 'clearCart']);
    Route::put('/carts/{itemId}', [CartController::class, 'updateCartItem']);
    Route::delete('/carts/{itemId}', [CartController::class, 'removeFromCart']);
    //Order API
    Route::get('/orders', [OrderController::class, 'getMyOrders']);
    Route::post('/orders/checkout', [OrderController::class, 'checkout']);
    Route::post('/orders/vnp_payment', [VnpPaymentController::class, 'createPaymentLinkVnp']);
    Route::post('/orders/payos_payment', [PayosPaymentController::class, 'createPaymentLinkPayos']);
    Route::put('/orders/{orderId}', [OrderController::class, 'updateOrderStatus']);
    //User API
    Route::post('/user/updatepassword', [UserController::class, 'updatePassword']);
    Route::post('/user/updateprofile', [UserController::class, 'updateProfile']);
    //Review related API
    Route::post('/books/{bookId}/reviews', [ReviewController::class, 'submitReview']);
});

Route::middleware(['auth:api', IsAdminMiddleware::class])->group(function () {
    //Book API
    Route::post('/admin/books', [BookController::class, 'addBook']);
    Route::put('/admin/books/{id}', [BookController::class, 'updateBook']);
    Route::delete('/admin/books/{id}', [BookController::class, 'deleteBook']);

    // Order API
    Route::get('/admin/orders/', [OrderController::class, 'getAllOrders']);
    Route::put('/admin/orders/{orderId}', [OrderController::class, 'updateOrderStatus']);
    // Admin
    Route::get('/admin/dashboard', [DashboardController::class, 'getDashboardMetrics']);
    Route::get('/admin/dashboard/chart', [DashboardController::class, 'getChartMetrics']);
    Route::get('/admin/users/', [UserController::class, 'getAllUsers']);
    Route::put('/admin/users/{userId}', [UserController::class, 'updateUser']);


});
