<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

/**
 * App\Models\Expense
 *
 * @property int $id
 * @property string $description
 * @property string $amount
 * @property string $category
 * @property \Illuminate\Support\Carbon $expense_date
 * @property string|null $notes
 * @property string|null $receipt_path
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * 
 * @method static \Illuminate\Database\Eloquent\Builder|Expense newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|Expense newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|Expense query()
 * @method static \Illuminate\Database\Eloquent\Builder|Expense whereAmount($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Expense whereCategory($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Expense whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Expense whereDescription($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Expense whereExpenseDate($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Expense whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Expense whereNotes($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Expense whereReceiptPath($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Expense whereUpdatedAt($value)
 * @method static \Database\Factories\ExpenseFactory factory($count = null, $state = [])
 * 
 * @mixin \Eloquent
 */
class Expense extends Model
{
    use HasFactory;

    /**
     * The attributes that are mass assignable.
     *
     * @var list<string>
     */
    protected $fillable = [
        'description',
        'amount',
        'category',
        'expense_date',
        'notes',
        'receipt_path',
    ];

    /**
     * The attributes that should be cast.
     *
     * @var array<string, string>
     */
    protected $casts = [
        'amount' => 'decimal:2',
        'expense_date' => 'date',
    ];

    /**
     * Common expense categories.
     *
     * @var array<string>
     */
    public const CATEGORIES = [
        'salary' => 'Gaji',
        'rent' => 'Sewa',
        'utilities' => 'Listrik & Air',
        'supplies' => 'Perlengkapan',
        'inventory' => 'Pembelian Barang',
        'marketing' => 'Pemasaran',
        'maintenance' => 'Pemeliharaan',
        'other' => 'Lainnya',
    ];
}