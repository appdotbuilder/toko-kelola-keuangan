<?php

namespace Database\Seeders;

use App\Models\Expense;
use App\Models\Product;
use App\Models\Sale;
use App\Models\SaleItem;
use App\Models\User;
use Carbon\Carbon;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // Create test user
        User::factory()->create([
            'name' => 'Pemilik Toko',
            'email' => 'owner@toko.com',
        ]);

        // Create products
        $products = Product::factory()->count(20)->create();

        // Create sales with items
        for ($i = 0; $i < 15; $i++) {
            $sale = Sale::factory()->create([
                'created_at' => Carbon::now()->subDays(random_int(0, 30)),
            ]);

            // Add 1-5 items per sale
            $itemCount = random_int(1, 5);
            $totalAmount = 0;
            $totalCost = 0;

            for ($j = 0; $j < $itemCount; $j++) {
                $product = $products->random();
                $quantity = random_int(1, 3);
                
                $itemTotal = (float) $product->selling_price * $quantity;
                $itemCost = (float) $product->purchase_price * $quantity;
                
                $totalAmount += $itemTotal;
                $totalCost += $itemCost;

                SaleItem::create([
                    'sale_id' => $sale->id,
                    'product_id' => $product->id,
                    'quantity' => $quantity,
                    'unit_price' => $product->selling_price,
                    'unit_cost' => $product->purchase_price,
                    'total_price' => $itemTotal,
                    'total_cost' => $itemCost,
                ]);

                // Reduce product stock
                $product->decrement('stock', $quantity);
            }

            // Update sale totals
            $sale->update([
                'total_amount' => $totalAmount,
                'total_cost' => $totalCost,
                'profit' => $totalAmount - $totalCost,
            ]);
        }

        // Create expenses
        Expense::factory()->count(30)->create();
    }
}
