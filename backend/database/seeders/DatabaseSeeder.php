<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        User::create([
            'email' => 'admin@email.com',
            'password' => bcrypt('password'),
            'isAdmin' => true,
        ]);
//        php artisan migrate --seed
//     php artisan db:seed
    }
}
