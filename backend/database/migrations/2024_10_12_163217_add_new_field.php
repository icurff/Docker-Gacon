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
        Schema::table('books', function (Blueprint $table) {
            $table->integer('availability')->default(0); // Add new column to existing table
        });
        // Schema::table('users', function (Blueprint $table) {
        //     $table->dropColumn('firstName');
        //     $table->dropColumn('lastName');
        //     $table->dropColumn('phone');
        //     $table->dropColumn('province');
        //     $table->dropColumn('district');
        //     $table->dropColumn('ward');
        //     $table->dropColumn('address');
        // });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('books', function (Blueprint $table) {
            $table->dropColumn('availability'); // Drop the column when rolling back
        });
    }
};
