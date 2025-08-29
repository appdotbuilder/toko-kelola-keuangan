<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Sale>
 */
class SaleFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $totalCost = fake()->randomFloat(2, 10000, 100000);
        $profit = fake()->randomFloat(2, 5000, 50000);
        
        return [
            'sale_number' => 'SALE-' . fake()->date('Ymd') . '-' . fake()->unique()->numerify('####'),
            'total_amount' => $totalCost + $profit,
            'total_cost' => $totalCost,
            'profit' => $profit,
            'notes' => fake()->optional()->sentence(),
        ];
    }
}