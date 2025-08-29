<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Product>
 */
class ProductFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $purchasePrice = fake()->randomFloat(2, 5000, 50000);
        $markup = fake()->randomFloat(2, 0.2, 0.8); // 20-80% markup
        
        return [
            'name' => fake()->words(2, true),
            'description' => fake()->paragraph(),
            'purchase_price' => $purchasePrice,
            'selling_price' => $purchasePrice * (1 + $markup),
            'stock' => fake()->numberBetween(0, 100),
            'sku' => fake()->unique()->bothify('SKU-####-???'),
            'category' => fake()->randomElement(['Electronics', 'Clothing', 'Food', 'Books', 'Home', 'Sports']),
        ];
    }

    /**
     * Indicate that the product is out of stock.
     */
    public function outOfStock(): static
    {
        return $this->state(fn (array $attributes) => [
            'stock' => 0,
        ]);
    }

    /**
     * Indicate that the product is low stock.
     */
    public function lowStock(): static
    {
        return $this->state(fn (array $attributes) => [
            'stock' => fake()->numberBetween(1, 5),
        ]);
    }
}