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
        Schema::create('expenses', function (Blueprint $table) {
            $table->id();
            $table->string('description')->comment('Expense description');
            $table->decimal('amount', 10, 2)->comment('Expense amount');
            $table->string('category')->comment('Expense category (salary, rent, utilities, etc.)');
            $table->date('expense_date')->comment('Date of the expense');
            $table->text('notes')->nullable()->comment('Additional notes');
            $table->string('receipt_path')->nullable()->comment('Path to receipt file');
            $table->timestamps();
            
            // Indexes for performance
            $table->index('category');
            $table->index('expense_date');
            $table->index(['category', 'expense_date']);
            $table->index(['expense_date', 'amount']);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('expenses');
    }
};