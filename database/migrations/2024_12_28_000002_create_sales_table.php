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
        Schema::create('sales', function (Blueprint $table) {
            $table->id();
            $table->string('sale_number')->unique()->comment('Unique sale transaction number');
            $table->decimal('total_amount', 12, 2)->comment('Total sale amount');
            $table->decimal('total_cost', 12, 2)->comment('Total cost of goods sold');
            $table->decimal('profit', 12, 2)->comment('Calculated profit (total_amount - total_cost)');
            $table->text('notes')->nullable()->comment('Additional notes for the sale');
            $table->timestamps();
            
            // Indexes for performance
            $table->index('sale_number');
            $table->index('created_at');
            $table->index(['created_at', 'total_amount']);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('sales');
    }
};