<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Http\Requests\StoreSaleRequest;
use App\Models\Product;
use App\Models\Sale;
use App\Models\SaleItem;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;

class SaleController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $sales = Sale::with('saleItems.product')
            ->latest()
            ->paginate(10)
            ->withQueryString();

        return Inertia::render('sales/index', [
            'sales' => $sales,
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        $products = Product::where('stock', '>', 0)
            ->orderBy('name')
            ->get();

        return Inertia::render('sales/create', [
            'products' => $products,
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreSaleRequest $request)
    {
        return DB::transaction(function () use ($request) {
            $totalAmount = 0;
            $totalCost = 0;
            $saleItems = [];

            // Validate stock and calculate totals
            foreach ($request->items as $item) {
                $product = Product::findOrFail($item['product_id']);
                
                if ($product->stock < $item['quantity']) {
                    return back()->withErrors([
                        'items' => "Stok {$product->name} tidak mencukupi. Stok tersedia: {$product->stock}"
                    ]);
                }

                $itemTotal = $product->selling_price * $item['quantity'];
                $itemCost = $product->purchase_price * $item['quantity'];
                
                $totalAmount += $itemTotal;
                $totalCost += $itemCost;

                $saleItems[] = [
                    'product_id' => $product->id,
                    'quantity' => $item['quantity'],
                    'unit_price' => $product->selling_price,
                    'unit_cost' => $product->purchase_price,
                    'total_price' => $itemTotal,
                    'total_cost' => $itemCost,
                ];
            }

            // Create sale
            $sale = Sale::create([
                'total_amount' => $totalAmount,
                'total_cost' => $totalCost,
                'profit' => $totalAmount - $totalCost,
                'notes' => $request->notes,
            ]);

            // Create sale items and update stock
            foreach ($saleItems as $saleItem) {
                $saleItem['sale_id'] = $sale->id;
                SaleItem::create($saleItem);

                // Update product stock
                Product::where('id', $saleItem['product_id'])
                    ->decrement('stock', $saleItem['quantity']);
            }

            return redirect()->route('sales.show', $sale)
                ->with('success', 'Penjualan berhasil dicatat.');
        });
    }

    /**
     * Display the specified resource.
     */
    public function show(Sale $sale)
    {
        $sale->load('saleItems.product');

        return Inertia::render('sales/show', [
            'sale' => $sale,
        ]);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Sale $sale)
    {
        return DB::transaction(function () use ($sale) {
            // Restore stock
            foreach ($sale->saleItems as $saleItem) {
                Product::where('id', $saleItem->product_id)
                    ->increment('stock', $saleItem->quantity);
            }

            $sale->delete();

            return redirect()->route('sales.index')
                ->with('success', 'Penjualan berhasil dibatalkan dan stok dikembalikan.');
        });
    }
}