import React from 'react';
import { Head, Link, router } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Plus, Eye, Trash2, Edit } from 'lucide-react';

interface Expense {
    id: number;
    description: string;
    amount: number;
    category: string;
    expense_date: string;
    notes?: string;
}

interface ExpensesIndexProps {
    expenses: {
        data: Expense[];
        links: unknown[];
        meta: unknown;
    };
    categories: { [key: string]: string };
    [key: string]: unknown;
}

export default function ExpensesIndex({ expenses, categories }: ExpensesIndexProps) {
    const formatCurrency = (amount: number) => {
        return new Intl.NumberFormat('id-ID', {
            style: 'currency',
            currency: 'IDR',
            minimumFractionDigits: 0,
            maximumFractionDigits: 0,
        }).format(amount);
    };

    const handleDelete = (expense: Expense) => {
        if (confirm(`Yakin ingin menghapus pengeluaran "${expense.description}"?`)) {
            router.delete(route('expenses.destroy', expense.id));
        }
    };

    const totalExpenses = expenses.data.reduce((total, expense) => total + expense.amount, 0);

    return (
        <AppLayout>
            <Head title="Daftar Pengeluaran" />
            
            <div className="space-y-6">
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-2xl font-bold flex items-center gap-2">
                            <span>💸</span>
                            Daftar Pengeluaran
                        </h1>
                        <p className="text-gray-600 mt-1">
                            Kelola semua pengeluaran operasional toko Anda
                        </p>
                    </div>
                    
                    <Link href={route('expenses.create')}>
                        <Button>
                            <Plus className="w-4 h-4 mr-2" />
                            Catat Pengeluaran
                        </Button>
                    </Link>
                </div>

                {expenses.data.length > 0 && (
                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <span>📊</span>
                                Ringkasan Pengeluaran
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="flex justify-between items-center p-4 bg-red-50 rounded-lg border-2 border-red-200">
                                <span className="text-lg font-semibold text-red-800">
                                    Total Pengeluaran ({expenses.data.length} item):
                                </span>
                                <span className="text-2xl font-bold text-red-600">
                                    {formatCurrency(totalExpenses)}
                                </span>
                            </div>
                        </CardContent>
                    </Card>
                )}

                <Card>
                    <CardHeader>
                        <CardTitle>Riwayat Pengeluaran</CardTitle>
                    </CardHeader>
                    <CardContent>
                        {expenses.data.length > 0 ? (
                            <div className="space-y-4">
                                {expenses.data.map((expense) => (
                                    <div key={expense.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                                        <div className="flex-1">
                                            <h3 className="font-semibold">{expense.description}</h3>
                                            <div className="flex items-center gap-4 text-sm text-gray-600 mt-1">
                                                <span>{categories[expense.category]}</span>
                                                <span>•</span>
                                                <span>{new Date(expense.expense_date).toLocaleDateString('id-ID')}</span>
                                            </div>
                                            {expense.notes && (
                                                <p className="text-sm text-gray-500 mt-1">{expense.notes}</p>
                                            )}
                                        </div>
                                        
                                        <div className="text-right">
                                            <div className="font-bold text-red-600">
                                                {formatCurrency(expense.amount)}
                                            </div>
                                        </div>
                                        
                                        <div className="flex gap-2 ml-4">
                                            <Link href={route('expenses.show', expense.id)}>
                                                <Button variant="outline" size="sm">
                                                    <Eye className="w-4 h-4" />
                                                </Button>
                                            </Link>
                                            <Link href={route('expenses.edit', expense.id)}>
                                                <Button variant="outline" size="sm">
                                                    <Edit className="w-4 h-4" />
                                                </Button>
                                            </Link>
                                            <Button
                                                variant="outline"
                                                size="sm"
                                                onClick={() => handleDelete(expense)}
                                            >
                                                <Trash2 className="w-4 h-4 text-red-500" />
                                            </Button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <div className="text-center py-8">
                                <div className="text-4xl mb-4">💸</div>
                                <h3 className="text-lg font-medium mb-2">Belum ada pengeluaran</h3>
                                <p className="text-gray-600 mb-4">
                                    Mulai catat pengeluaran operasional toko Anda
                                </p>
                                <Link href={route('expenses.create')}>
                                    <Button>
                                        <Plus className="w-4 h-4 mr-2" />
                                        Catat Pengeluaran Pertama
                                    </Button>
                                </Link>
                            </div>
                        )}
                    </CardContent>
                </Card>
            </div>
        </AppLayout>
    );
}