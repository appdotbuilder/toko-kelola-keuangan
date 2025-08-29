import React from 'react';
import { AppShell } from '@/components/app-shell';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Head, Link, router, usePage } from '@inertiajs/react';

interface DashboardData {
    period: string;
    summary: {
        revenue: number;
        profit: number;
        expenses: number;
        net_income: number;
        total_transactions: number;
        total_expense_records: number;
    };
    expenses_by_category: Array<{
        category: string;
        name: string;
        total: number;
    }>;
    low_stock_products: Array<{
        id: number;
        name: string;
        stock: number;
        selling_price: number;
    }>;
    top_products: Array<{
        name: string;
        total_sold: number;
        total_revenue: number;
    }>;
    recent_sales: Array<{
        id: number;
        sale_number: string;
        total_amount: number;
        created_at: string;
        sale_items_count?: number;
    }>;
    recent_expenses: Array<{
        id: number;
        description: string;
        amount: number;
        category: string;
        expense_date: string;
    }>;
    auth: {
        user: {
            id: number;
            name: string;
            email: string;
        } | null;
    };
    [key: string]: unknown;
}

export default function Dashboard() {
    const { 
        period, 
        summary, 
        expenses_by_category, 
        low_stock_products, 
        top_products, 
        recent_sales, 
        recent_expenses 
    } = usePage<DashboardData>().props;

    const formatCurrency = (amount: number) => {
        return new Intl.NumberFormat('id-ID', {
            style: 'currency',
            currency: 'IDR',
            minimumFractionDigits: 0,
            maximumFractionDigits: 0,
        }).format(amount);
    };

    const handlePeriodChange = (newPeriod: string) => {
        router.get(route('dashboard'), { period: newPeriod }, {
            preserveState: true,
            preserveScroll: true,
        });
    };

    return (
        <AppShell>
            <Head title="Dashboard Toko" />
            
            <div className="space-y-6">
                {/* Header */}
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                    <div>
                        <h1 className="text-2xl font-bold flex items-center gap-2">
                            <span>🏪</span>
                            Dashboard Toko
                        </h1>
                        <p className="text-gray-600 mt-1">
                            Ringkasan keuangan dan operasional toko Anda
                        </p>
                    </div>
                    
                    <div className="flex gap-2">
                        <Button
                            variant={period === 'today' ? 'default' : 'outline'}
                            size="sm"
                            onClick={() => handlePeriodChange('today')}
                        >
                            Hari Ini
                        </Button>
                        <Button
                            variant={period === 'week' ? 'default' : 'outline'}
                            size="sm"
                            onClick={() => handlePeriodChange('week')}
                        >
                            Minggu Ini
                        </Button>
                        <Button
                            variant={period === 'month' ? 'default' : 'outline'}
                            size="sm"
                            onClick={() => handlePeriodChange('month')}
                        >
                            Bulan Ini
                        </Button>
                        <Button
                            variant={period === 'year' ? 'default' : 'outline'}
                            size="sm"
                            onClick={() => handlePeriodChange('year')}
                        >
                            Tahun Ini
                        </Button>
                    </div>
                </div>

                {/* Summary Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                    <Card>
                        <CardHeader className="pb-2">
                            <CardTitle className="text-sm font-medium text-gray-600 flex items-center gap-2">
                                <span>💰</span>
                                Total Penjualan
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold text-green-600">
                                {formatCurrency(summary.revenue)}
                            </div>
                            <p className="text-xs text-gray-500 mt-1">
                                {summary.total_transactions} transaksi
                            </p>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader className="pb-2">
                            <CardTitle className="text-sm font-medium text-gray-600 flex items-center gap-2">
                                <span>📈</span>
                                Keuntungan
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold text-blue-600">
                                {formatCurrency(summary.profit)}
                            </div>
                            <p className="text-xs text-gray-500 mt-1">
                                dari penjualan
                            </p>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader className="pb-2">
                            <CardTitle className="text-sm font-medium text-gray-600 flex items-center gap-2">
                                <span>📝</span>
                                Total Pengeluaran
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold text-red-600">
                                {formatCurrency(summary.expenses)}
                            </div>
                            <p className="text-xs text-gray-500 mt-1">
                                {summary.total_expense_records} catatan
                            </p>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader className="pb-2">
                            <CardTitle className="text-sm font-medium text-gray-600 flex items-center gap-2">
                                <span>💵</span>
                                Pendapatan Bersih
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className={`text-2xl font-bold ${summary.net_income >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                                {formatCurrency(summary.net_income)}
                            </div>
                            <p className="text-xs text-gray-500 mt-1">
                                penjualan - pengeluaran
                            </p>
                        </CardContent>
                    </Card>
                </div>

                {/* Quick Actions */}
                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <span>⚡</span>
                            Aksi Cepat
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="flex flex-wrap gap-3">
                            <Link
                                href={route('sales.create')}
                                className="inline-flex items-center gap-2 bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 transition-colors"
                            >
                                <span>🛒</span>
                                Catat Penjualan
                            </Link>
                            <Link
                                href={route('products.create')}
                                className="inline-flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors"
                            >
                                <span>📦</span>
                                Tambah Produk
                            </Link>
                            <Link
                                href={route('expenses.create')}
                                className="inline-flex items-center gap-2 bg-orange-600 text-white px-4 py-2 rounded-md hover:bg-orange-700 transition-colors"
                            >
                                <span>💸</span>
                                Catat Pengeluaran
                            </Link>
                        </div>
                    </CardContent>
                </Card>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    {/* Expenses by Category */}
                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <span>📊</span>
                                Pengeluaran per Kategori
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            {expenses_by_category.length > 0 ? (
                                <div className="space-y-3">
                                    {expenses_by_category.map((expense, index) => (
                                        <div key={index} className="flex justify-between items-center">
                                            <span className="text-sm font-medium">{expense.name}</span>
                                            <span className="text-sm text-gray-600">
                                                {formatCurrency(expense.total)}
                                            </span>
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <p className="text-gray-500 text-sm">Belum ada pengeluaran pada periode ini</p>
                            )}
                        </CardContent>
                    </Card>

                    {/* Low Stock Alert */}
                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <span>⚠️</span>
                                Stok Menipis
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            {low_stock_products.length > 0 ? (
                                <div className="space-y-3">
                                    {low_stock_products.map((product) => (
                                        <div key={product.id} className="flex justify-between items-center">
                                            <div>
                                                <p className="text-sm font-medium">{product.name}</p>
                                                <p className="text-xs text-gray-500">
                                                    {formatCurrency(product.selling_price)}
                                                </p>
                                            </div>
                                            <span className="bg-red-100 text-red-800 text-xs px-2 py-1 rounded">
                                                {product.stock} tersisa
                                            </span>
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <p className="text-gray-500 text-sm">Semua produk memiliki stok yang cukup</p>
                            )}
                        </CardContent>
                    </Card>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    {/* Top Products */}
                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <span>🏆</span>
                                Produk Terlaris
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            {top_products.length > 0 ? (
                                <div className="space-y-3">
                                    {top_products.map((product, index) => (
                                        <div key={index} className="flex justify-between items-center">
                                            <div>
                                                <p className="text-sm font-medium">{product.name}</p>
                                                <p className="text-xs text-gray-500">
                                                    {product.total_sold} terjual
                                                </p>
                                            </div>
                                            <span className="text-sm text-gray-600">
                                                {formatCurrency(product.total_revenue)}
                                            </span>
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <p className="text-gray-500 text-sm">Belum ada penjualan pada periode ini</p>
                            )}
                        </CardContent>
                    </Card>

                    {/* Recent Activities */}
                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <span>🕒</span>
                                Aktivitas Terbaru
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-3">
                                {recent_sales.slice(0, 3).map((sale) => (
                                    <div key={`sale-${sale.id}`} className="flex justify-between items-center">
                                        <div>
                                            <p className="text-sm font-medium">Penjualan {sale.sale_number}</p>
                                            <p className="text-xs text-gray-500">
                                                {new Date(sale.created_at).toLocaleDateString('id-ID')}
                                            </p>
                                        </div>
                                        <span className="text-sm text-green-600">
                                            +{formatCurrency(sale.total_amount)}
                                        </span>
                                    </div>
                                ))}
                                {recent_expenses.slice(0, 2).map((expense) => (
                                    <div key={`expense-${expense.id}`} className="flex justify-between items-center">
                                        <div>
                                            <p className="text-sm font-medium">{expense.description}</p>
                                            <p className="text-xs text-gray-500">
                                                {new Date(expense.expense_date).toLocaleDateString('id-ID')}
                                            </p>
                                        </div>
                                        <span className="text-sm text-red-600">
                                            -{formatCurrency(expense.amount)}
                                        </span>
                                    </div>
                                ))}
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </AppShell>
    );
}