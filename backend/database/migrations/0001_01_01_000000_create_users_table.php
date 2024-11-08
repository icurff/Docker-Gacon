<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;


return new class extends Migration {
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('users', function (Blueprint $table) {
            $table->id();  // Auto-incrementing BIGINT primary key
            $table->string('email')->unique();
            $table->text('password');
            $table->boolean('isAdmin')->default(false);
            $table->timestamps();  // Adds 'created_at' and 'updated_at' columns
        });


        Schema::create('books', function (Blueprint $table) {
            $table->id();  // Auto-incrementing BIGINT primary key
            $table->string('title');
            $table->integer('price');
            $table->string('author');
            $table->string('publisher');
            $table->integer('pages');
            $table->string('language');
            $table->string('category');
            $table->text('description');
            $table->mediumText('thumbnail')->nullable();
            $table->timestamps();
        });
        Schema::create('carts', function (Blueprint $table) {
            $table->id();
            $table->foreignId('userId')->constrained('users')->onDelete('cascade');
            $table->integer('total')->default(0);
        });
        Schema::create('cart_items', function (Blueprint $table) {
            $table->id();
            $table->foreignId('cartId')->constrained('carts')->onDelete('cascade');
            $table->foreignId('bookId')->constrained('books')->onDelete('cascade');
            $table->integer('quantity');

        });

        Schema::create('orders', function (Blueprint $table) {
            $table->id();  // Auto-incrementing BIGINT primary key
            $table->foreignId('userId')->constrained('users')->onDelete('cascade');
            $table->text('shipAddress');
            $table->string('paymentMethod');
            $table->integer('total')->default(0);
            $table->string('status')->default('Pending');
            $table->timestamps(); // Adds 'created_at' and 'updated_at' columns
        });

        Schema::create('order_items', function (Blueprint $table) {
            $table->id();  // Auto-incrementing BIGINT primary key
            $table->foreignId('orderId')->constrained('orders')->onDelete('cascade');
            $table->foreignId('bookId')->constrained('books');
            $table->integer('quantity')->default(1);
            $table->integer('price');
        });

        Schema::create('sessions', function (Blueprint $table) {
            $table->string('id')->primary();
            $table->foreignId('user_id')->constrained('users')->nullable()->index();
            $table->string('ip_address', 45)->nullable();
            $table->text('user_agent')->nullable();
            $table->longText('payload');
            $table->integer('last_activity')->index();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('users');
        Schema::dropIfExists('carts');
        Schema::dropIfExists('cart_items');
        Schema::dropIfExists('books');
        Schema::dropIfExists('orders');
        Schema::dropIfExists('order_items');
        Schema::dropIfExists('sessions');
    }
};
