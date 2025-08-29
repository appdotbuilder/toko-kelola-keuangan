<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('sale_items', function (Blueprint $table) {
            $table->id();
            $table->foreignId('sale_id')->constrained()->onDelete('cascade');
            $table->foreignId('product_id')->constrained()->onDelete('restrict');
            $table->integer('quantity')->comment('Quantity sold');
            $table->decimal('unit_price', 10, 2)->comment('Unit price at time of sale');
            $table->decimal('unit_cost', 10, 2)->comment('Unit cost at time of sale');
            $table->decimal('total_price', 10, 2)->comment('Total price for this item (quantity * unit_price)');
            $table->decimal('total_cost', 10, 2)->comment('Total cost for this item (quantity * unit_cost)');
            $table->timestamps();
            
            // Indexes for performance
            $table->index(['sale_id', 'product_id']);
            $table->index('product_id');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('sale_items');
    }
};