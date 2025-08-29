import React from 'react';
import AppLayout from '@/layouts/app-layout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Head, Link, router, usePage } from '@inertiajs/react';
import { Plus, Eye, Edit, Trash2 } from 'lucide-react';

interface Product {
    id: number;
    name: string;
    description?: string;
    purchase_price: number;
    selling_price: number;
    stock: number;
    sku?: string;
    category?: string;
    profit_margin?: number;
}

interface ProductsData {
    products: {
        data: Product[];
        links: Record<string, unknown>[];
        meta: Record<string, unknown>;
    };
    auth: {
        user: {
            id: number;
            name: string;
            email: string;
        } | null;
    };
    [key: string]: unknown;
}

export default function ProductsIndex() {
    const { products } = usePage<ProductsData>().props;

    const formatCurrency = (amount: number) => {
        return new Intl.NumberFormat('id-ID', {
            style: 'currency',
            currency: 'IDR',
            minimumFractionDigits: 0,
            maximumFractionDigits: 0,
        }).format(amount);
    };

    const handleDelete = (product: Product) => {
        if (confirm(`Yakin ingin menghapus produk "${product.name}"?`)) {
            router.delete(route('products.destroy', product.id));
        }
    };

    return (
        <AppLayout>
            <Head title="Kelola Produk" />
            
            <div className="space-y-6">
                {/* Header */}
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                    <div>
                        <h1 className="text-2xl font-bold flex items-center gap-2">
                            <span>📦</span>
                            Kelola Produk
                        </h1>
                        <p className="text-gray-600 mt-1">
                            Manajemen inventaris dan harga produk
                        </p>
                    </div>
                    
                    <Link href={route('products.create')}>
                        <Button>
                            <Plus className="w-4 h-4 mr-2" />
                            Tambah Produk
                        </Button>
                    </Link>
                </div>

                {/* Products Grid */}
                {products.data.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {products.data.map((product) => (
                            <Card key={product.id} className="hover:shadow-lg transition-shadow">
                                <CardHeader className="pb-3">
                                    <CardTitle className="text-lg flex justify-between items-start">
                                        <span>{product.name}</span>
                                        <span className={`text-xs px-2 py-1 rounded ${
                                            product.stock > 10 
                                                ? 'bg-green-100 text-green-800' 
                                                : product.stock > 0 
                                                ? 'bg-yellow-100 text-yellow-800' 
                                                : 'bg-red-100 text-red-800'
                                        }`}>
                                            {product.stock} stok
                                        </span>
                                    </CardTitle>
                                    {product.category && (
                                        <p className="text-sm text-gray-500">{product.category}</p>
                                    )}
                                </CardHeader>
                                <CardContent className="space-y-3">
                                    <div className="grid grid-cols-2 gap-3 text-sm">
                                        <div>
                                            <p className="text-gray-500">Harga Beli</p>
                                            <p className="font-medium">{formatCurrency(product.purchase_price)}</p>
                                        </div>
                                        <div>
                                            <p className="text-gray-500">Harga Jual</p>
                                            <p className="font-medium text-green-600">{formatCurrency(product.selling_price)}</p>
                                        </div>
                                    </div>

                                    {product.sku && (
                                        <p className="text-xs text-gray-400">SKU: {product.sku}</p>
                                    )}

                                    <div className="flex gap-2 pt-2">
                                        <Link href={route('products.show', product.id)}>
                                            <Button variant="outline" size="sm">
                                                <Eye className="w-4 h-4" />
                                            </Button>
                                        </Link>
                                        <Link href={route('products.edit', product.id)}>
                                            <Button variant="outline" size="sm">
                                                <Edit className="w-4 h-4" />
                                            </Button>
                                        </Link>
                                        <Button
                                            variant="outline"
                                            size="sm"
                                            onClick={() => handleDelete(product)}
                                        >
                                            <Trash2 className="w-4 h-4 text-red-500" />
                                        </Button>
                                    </div>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                ) : (
                    <Card className="text-center py-12">
                        <CardContent>
                            <div className="text-4xl mb-4">📦</div>
                            <h3 className="text-lg font-semibold mb-2">Belum Ada Produk</h3>
                            <p className="text-gray-600 mb-4">
                                Mulai dengan menambahkan produk pertama Anda
                            </p>
                            <Link href={route('products.create')}>
                                <Button>
                                    <Plus className="w-4 h-4 mr-2" />
                                    Tambah Produk Pertama
                                </Button>
                            </Link>
                        </CardContent>
                    </Card>
                )}
            </div>
        </AppLayout>
    );
}