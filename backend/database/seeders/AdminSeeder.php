<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Admin;

class AdminSeeder extends Seeder
{
    public function run(): void
    {
        Admin::updateOrCreate(
            ['email' => 'admin@sousscars.com'],
            [
                'name' => 'SOUSS CARS Admin',
                'password' => 'Admin@123456',
            ]
        );
    }
}