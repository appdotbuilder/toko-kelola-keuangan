import React from 'react';
import { Head, Link, router } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Plus, Eye, Trash2 } from 'lucide-react';

interface Sale {
    id: number;
    sale_number: string;
    total_amount: number;
    profit: number;
    created_at: string;
    sale_items_count: number;
}

interface SalesIndexProps {
    sales: {
        data: Sale[];
        links: unknown[];
        meta: unknown;
    };
    [key: string]: unknown;
}

export default function SalesIndex({ sales }: SalesIndexProps) {
    const formatCurrency = (amount: number) => {
        return new Intl.NumberFormat('id-ID', {
            style: 'currency',
            currency: 'IDR',
            minimumFractionDigits: 0,
            maximumFractionDigits: 0,
        }).format(amount);
    };

    const handleDelete = (sale: Sale) => {
        if (confirm(`Yakin ingin menghapus penjualan ${sale.sale_number}? Stok akan dikembalikan.`)) {
            router.delete(route('sales.destroy', sale.id));
        }
    };

    return (
        <AppLayout>
            <Head title="Daftar Penjualan" />
            
            <div className="space-y-6">
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-2xl font-bold flex items-center gap-2">
                            <span>🛒</span>
                            Daftar Penjualan
                        </h1>
                        <p className="text-gray-600 mt-1">
                            Kelola semua transaksi penjualan toko Anda
                        </p>
                    </div>
                    
                    <Link href={route('sales.create')}>
                        <Button>
                            <Plus className="w-4 h-4 mr-2" />
                            Catat Penjualan
                        </Button>
                    </Link>
                </div>

                <Card>
                    <CardHeader>
                        <CardTitle>Riwayat Penjualan</CardTitle>
                    </CardHeader>
                    <CardContent>
                        {sales.data.length > 0 ? (
                            <div className="space-y-4">
                                {sales.data.map((sale) => (
                                    <div key={sale.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                                        <div>
                                            <h3 className="font-semibold">{sale.sale_number}</h3>
                                            <p className="text-sm text-gray-600">
                                                {new Date(sale.created_at).toLocaleDateString('id-ID')} • 
                                                {sale.sale_items_count} item
                                            </p>
                                        </div>
                                        
                                        <div className="text-right">
                                            <div className="font-bold text-green-600">
                                                {formatCurrency(sale.total_amount)}
                                            </div>
                                            <div className="text-sm text-gray-600">
                                                Keuntungan: {formatCurrency(sale.profit)}
                                            </div>
                                        </div>
                                        
                                        <div className="flex gap-2">
                                            <Link href={route('sales.show', sale.id)}>
                                                <Button variant="outline" size="sm">
                                                    <Eye className="w-4 h-4" />
                                                </Button>
                                            </Link>
                                            <Button
                                                variant="outline"
                                                size="sm"
                                                onClick={() => handleDelete(sale)}
                                            >
                                                <Trash2 className="w-4 h-4 text-red-500" />
                                            </Button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <div className="text-center py-8">
                                <div className="text-4xl mb-4">🛒</div>
                                <h3 className="text-lg font-medium mb-2">Belum ada penjualan</h3>
                                <p className="text-gray-600 mb-4">
                                    Mulai catat penjualan pertama Anda
                                </p>
                                <Link href={route('sales.create')}>
                                    <Button>
                                        <Plus className="w-4 h-4 mr-2" />
                                        Catat Penjualan Pertama
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