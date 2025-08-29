<?php

use App\Http\Controllers\DashboardController;
use App\Http\Controllers\ExpenseController;
use App\Http\Controllers\ProductController;
use App\Http\Controllers\SaleController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/health-check', function () {
    return response()->json([
        'status' => 'ok',
        'timestamp' => now()->toISOString(),
    ]);
})->name('health-check');

// Main store management dashboard (accessible without auth for demo)
Route::get('/', [DashboardController::class, 'index'])->name('home');

// Welcome page for marketing
Route::get('/welcome', function () {
    return Inertia::render('welcome');
})->name('welcome');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('dashboard', [DashboardController::class, 'index'])->name('dashboard');
    
    // Products management
    Route::resource('products', ProductController::class);
    
    // Sales management
    Route::resource('sales', SaleController::class)->except(['edit', 'update']);
    
    // Expenses management
    Route::resource('expenses', ExpenseController::class);
});

require __DIR__.'/settings.php';
require __DIR__.'/auth.php';
