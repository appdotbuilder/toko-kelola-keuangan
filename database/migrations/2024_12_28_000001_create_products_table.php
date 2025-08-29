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
        Schema::create('products', function (Blueprint $table) {
            $table->id();
            $table->string('name')->comment('Product name');
            $table->text('description')->nullable()->comment('Product description');
            $table->decimal('purchase_price', 10, 2)->comment('Product purchase price');
            $table->decimal('selling_price', 10, 2)->comment('Product selling price');
            $table->integer('stock')->default(0)->comment('Current stock quantity');
            $table->string('sku')->unique()->nullable()->comment('Stock keeping unit');
            $table->string('category')->nullable()->comment('Product category');
            $table->timestamps();
            
            // Indexes for performance
            $table->index('name');
            $table->index('sku');
            $table->index('category');
            $table->index('stock');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('products');
    }
};