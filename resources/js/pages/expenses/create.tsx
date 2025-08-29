import React from 'react';
import { Head, router, useForm } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { ArrowLeft, Receipt } from 'lucide-react';
import InputError from '@/components/input-error';

interface ExpenseCategory {
    [key: string]: string;
}

interface CreateExpenseProps {
    categories: ExpenseCategory;
    [key: string]: unknown;
}

export default function CreateExpense({ categories }: CreateExpenseProps) {
    const { data, setData, post, processing, errors } = useForm({
        description: '',
        amount: '',
        category: '',
        expense_date: new Date().toISOString().split('T')[0], // Today's date
        notes: '',
    });

    const submit = (e: React.FormEvent) => {
        e.preventDefault();
        post(route('expenses.store'));
    };

    const formatCurrency = (amount: string) => {
        const num = parseFloat(amount.replace(/[^\d]/g, ''));
        if (isNaN(num)) return '';
        
        return new Intl.NumberFormat('id-ID', {
            style: 'currency',
            currency: 'IDR',
            minimumFractionDigits: 0,
            maximumFractionDigits: 0,
        }).format(num);
    };

    const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value.replace(/[^\d]/g, '');
        setData('amount', value);
    };

    return (
        <AppLayout>
            <Head title="Catat Pengeluaran" />
            
            <div className="space-y-6">
                <div className="flex items-center gap-4">
                    <Button
                        variant="outline"
                        size="sm"
                        onClick={() => router.get(route('dashboard'))}
                    >
                        <ArrowLeft className="w-4 h-4 mr-2" />
                        Kembali
                    </Button>
                    <div>
                        <h1 className="text-2xl font-bold flex items-center gap-2">
                            <span>💸</span>
                            Catat Pengeluaran Baru
                        </h1>
                        <p className="text-gray-600 mt-1">
                            Catat pengeluaran operasional toko Anda
                        </p>
                    </div>
                </div>

                <form onSubmit={submit} className="space-y-6">
                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <span>📝</span>
                                Detail Pengeluaran
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <Label htmlFor="description">Deskripsi Pengeluaran*</Label>
                                    <Input
                                        id="description"
                                        placeholder="Contoh: Pembelian bahan baku"
                                        value={data.description}
                                        onChange={(e) => setData('description', e.target.value)}
                                    />
                                    <InputError message={errors.description} />
                                </div>

                                <div>
                                    <Label htmlFor="category">Kategori*</Label>
                                    <Select 
                                        value={data.category} 
                                        onValueChange={(value) => setData('category', value)}
                                    >
                                        <SelectTrigger>
                                            <SelectValue placeholder="Pilih kategori..." />
                                        </SelectTrigger>
                                        <SelectContent>
                                            {Object.entries(categories).map(([key, value]) => (
                                                <SelectItem key={key} value={key}>
                                                    {value}
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                    <InputError message={errors.category} />
                                </div>

                                <div>
                                    <Label htmlFor="amount">Jumlah (IDR)*</Label>
                                    <Input
                                        id="amount"
                                        type="text"
                                        placeholder="0"
                                        value={formatCurrency(data.amount)}
                                        onChange={handleAmountChange}
                                    />
                                    <InputError message={errors.amount} />
                                </div>

                                <div>
                                    <Label htmlFor="expense_date">Tanggal Pengeluaran*</Label>
                                    <Input
                                        id="expense_date"
                                        type="date"
                                        value={data.expense_date}
                                        onChange={(e) => setData('expense_date', e.target.value)}
                                    />
                                    <InputError message={errors.expense_date} />
                                </div>
                            </div>

                            <div>
                                <Label htmlFor="notes">Catatan Tambahan</Label>
                                <Input
                                    id="notes"
                                    placeholder="Catatan opsional..."
                                    value={data.notes}
                                    onChange={(e) => setData('notes', e.target.value)}
                                />
                                <InputError message={errors.notes} />
                            </div>
                        </CardContent>
                    </Card>

                    {data.amount && (
                        <Card>
                            <CardHeader>
                                <CardTitle className="flex items-center gap-2">
                                    <span>💰</span>
                                    Ringkasan
                                </CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="flex justify-between items-center p-4 bg-red-50 rounded-lg border-2 border-red-200">
                                    <div>
                                        <div className="text-sm text-red-600 mb-1">Total Pengeluaran:</div>
                                        <div className="text-lg font-medium text-red-800">
                                            {data.category && categories[data.category]} - {data.description}
                                        </div>
                                    </div>
                                    <div className="text-2xl font-bold text-red-600">
                                        {formatCurrency(data.amount)}
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    )}

                    <div className="flex gap-4">
                        <Button
                            type="button"
                            variant="outline"
                            onClick={() => router.get(route('dashboard'))}
                            disabled={processing}
                        >
                            Batal
                        </Button>
                        <Button
                            type="submit"
                            disabled={processing || !data.description || !data.amount || !data.category}
                            className="flex-1"
                        >
                            <Receipt className="w-4 h-4 mr-2" />
                            {processing ? 'Menyimpan...' : 'Simpan Pengeluaran'}
                        </Button>
                    </div>
                </form>
            </div>
        </AppLayout>
    );
}