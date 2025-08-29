<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\Expense;
use App\Models\Product;
use App\Models\Sale;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;

class DashboardController extends Controller
{
    /**
     * Display the dashboard with financial summary.
     */
    public function index(Request $request)
    {
        // Show welcome page if not authenticated
        if (!auth()->check()) {
            return Inertia::render('welcome');
        }
        $period = $request->get('period', 'today');
        $dateRange = $this->getDateRange($period);

        // Sales summary
        $salesData = Sale::whereBetween('created_at', $dateRange)
            ->selectRaw('
                COUNT(*) as total_transactions,
                SUM(total_amount) as total_revenue,
                SUM(profit) as total_profit
            ')
            ->first();

        // Expenses summary
        $expensesData = Expense::whereBetween('expense_date', $dateRange)
            ->selectRaw('
                COUNT(*) as total_expenses,
                SUM(amount) as total_amount
            ')
            ->first();

        // Expenses by category
        $expensesByCategory = Expense::whereBetween('expense_date', $dateRange)
            ->selectRaw('category, SUM(amount) as total')
            ->groupBy('category')
            ->get()
            ->map(function ($item) {
                return [
                    'category' => $item->category,
                    'name' => Expense::CATEGORIES[$item->category] ?? $item->category,
                    'total' => (float) $item->getAttribute('total'),
                ];
            });

        // Low stock products
        $lowStockProducts = Product::where('stock', '<=', 5)
            ->where('stock', '>', 0)
            ->orderBy('stock')
            ->limit(10)
            ->get();

        // Top selling products
        $topProducts = DB::table('sale_items')
            ->join('products', 'sale_items.product_id', '=', 'products.id')
            ->join('sales', 'sale_items.sale_id', '=', 'sales.id')
            ->whereBetween('sales.created_at', $dateRange)
            ->selectRaw('
                products.name,
                SUM(sale_items.quantity) as total_sold,
                SUM(sale_items.total_price) as total_revenue
            ')
            ->groupBy('products.id', 'products.name')
            ->orderByDesc('total_sold')
            ->limit(5)
            ->get();

        // Recent activities
        $recentSales = Sale::with('saleItems.product')
            ->latest()
            ->limit(5)
            ->get();

        $recentExpenses = Expense::latest('expense_date')
            ->limit(5)
            ->get();

        // Financial summary
        $netIncome = ($salesData->total_revenue ?? 0) - ($expensesData->total_amount ?? 0);

        return Inertia::render('dashboard', [
            'period' => $period,
            'summary' => [
                'revenue' => $salesData->total_revenue ?? 0,
                'profit' => $salesData->total_profit ?? 0,
                'expenses' => $expensesData->total_amount ?? 0,
                'net_income' => $netIncome,
                'total_transactions' => $salesData->total_transactions ?? 0,
                'total_expense_records' => $expensesData->total_expenses ?? 0,
            ],
            'expenses_by_category' => $expensesByCategory,
            'low_stock_products' => $lowStockProducts,
            'top_products' => $topProducts,
            'recent_sales' => $recentSales,
            'recent_expenses' => $recentExpenses,
        ]);
    }



    /**
     * Get date range based on period.
     */
    protected function getDateRange(string $period): array
    {
        $now = Carbon::now();

        return match ($period) {
            'today' => [$now->startOfDay(), $now->endOfDay()],
            'week' => [$now->startOfWeek(), $now->endOfWeek()],
            'month' => [$now->startOfMonth(), $now->endOfMonth()],
            'year' => [$now->startOfYear(), $now->endOfYear()],
            default => [$now->startOfDay(), $now->endOfDay()],
        };
    }
}