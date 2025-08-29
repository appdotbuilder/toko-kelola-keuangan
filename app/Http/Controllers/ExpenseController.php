<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Http\Requests\StoreExpenseRequest;
use App\Http\Requests\UpdateExpenseRequest;
use App\Models\Expense;
use Inertia\Inertia;

class ExpenseController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $expenses = Expense::latest('expense_date')
            ->paginate(10)
            ->withQueryString();

        return Inertia::render('expenses/index', [
            'expenses' => $expenses,
            'categories' => Expense::CATEGORIES,
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return Inertia::render('expenses/create', [
            'categories' => Expense::CATEGORIES,
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreExpenseRequest $request)
    {
        $expense = Expense::create($request->validated());

        return redirect()->route('expenses.show', $expense)
            ->with('success', 'Pengeluaran berhasil dicatat.');
    }

    /**
     * Display the specified resource.
     */
    public function show(Expense $expense)
    {
        return Inertia::render('expenses/show', [
            'expense' => $expense,
            'categories' => Expense::CATEGORIES,
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Expense $expense)
    {
        return Inertia::render('expenses/edit', [
            'expense' => $expense,
            'categories' => Expense::CATEGORIES,
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateExpenseRequest $request, Expense $expense)
    {
        $expense->update($request->validated());

        return redirect()->route('expenses.show', $expense)
            ->with('success', 'Pengeluaran berhasil diperbarui.');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Expense $expense)
    {
        $expense->delete();

        return redirect()->route('expenses.index')
            ->with('success', 'Pengeluaran berhasil dihapus.');
    }
}