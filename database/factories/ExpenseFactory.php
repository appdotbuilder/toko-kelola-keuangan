<?php

namespace Database\Factories;

use App\Models\Expense;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Expense>
 */
class ExpenseFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $categories = array_keys(Expense::CATEGORIES);
        
        return [
            'description' => fake()->sentence(),
            'amount' => fake()->randomFloat(2, 50000, 1000000),
            'category' => fake()->randomElement($categories),
            'expense_date' => fake()->dateTimeBetween('-1 year', 'now'),
            'notes' => fake()->optional()->paragraph(),
        ];
    }

    /**
     * Indicate that the expense is for salary.
     */
    public function salary(): static
    {
        return $this->state(fn (array $attributes) => [
            'category' => 'salary',
            'description' => 'Gaji karyawan ' . fake()->monthName(),
            'amount' => fake()->randomFloat(2, 2000000, 5000000),
        ]);
    }

    /**
     * Indicate that the expense is for rent.
     */
    public function rent(): static
    {
        return $this->state(fn (array $attributes) => [
            'category' => 'rent',
            'description' => 'Sewa toko bulan ' . fake()->monthName(),
            'amount' => fake()->randomFloat(2, 1000000, 3000000),
        ]);
    }
}