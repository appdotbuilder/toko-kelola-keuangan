<?php

namespace App\Http\Requests;

use App\Models\Expense;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class UpdateExpenseRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'description' => 'required|string|max:255',
            'amount' => 'required|numeric|min:0',
            'category' => ['required', 'string', Rule::in(array_keys(Expense::CATEGORIES))],
            'expense_date' => 'required|date',
            'notes' => 'nullable|string',
        ];
    }

    /**
     * Get custom error messages for validator errors.
     *
     * @return array<string, string>
     */
    public function messages(): array
    {
        return [
            'description.required' => 'Deskripsi pengeluaran wajib diisi.',
            'amount.required' => 'Jumlah pengeluaran wajib diisi.',
            'amount.numeric' => 'Jumlah pengeluaran harus berupa angka.',
            'category.required' => 'Kategori wajib dipilih.',
            'category.in' => 'Kategori tidak valid.',
            'expense_date.required' => 'Tanggal pengeluaran wajib diisi.',
            'expense_date.date' => 'Format tanggal tidak valid.',
        ];
    }
}