import React, { useState } from 'react';
import { Head, router, useForm } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Plus, Trash2, ShoppingCart, ArrowLeft } from 'lucide-react';
import InputError from '@/components/input-error';

interface Product {
    id: number;
    name: string;
    selling_price: number;
    stock: number;
}

interface CreateSaleProps {
    products: Product[];
    [key: string]: unknown;
}

interface FormSaleItem {
    product_id: string;
    quantity: string;
}

export default function CreateSale({ products }: CreateSaleProps) {
    const [saleItems, setSaleItems] = useState<FormSaleItem[]>([{ product_id: '', quantity: '1' }]);

    const { data, setData, post, processing, errors } = useForm({
        items: [] as Array<{ product_id: number; quantity: number }>,
        notes: '',
    });

    const addItem = () => {
        setSaleItems([...saleItems, { product_id: '', quantity: '1' }]);
    };

    const removeItem = (index: number) => {
        if (saleItems.length > 1) {
            const newItems = saleItems.filter((_, i) => i !== index);
            setSaleItems(newItems);
            updateFormItems(newItems);
        }
    };

    const updateSaleItem = (index: number, field: keyof FormSaleItem, value: string) => {
        const newItems = [...saleItems];
        newItems[index] = { ...newItems[index], [field]: value };
        setSaleItems(newItems);
        updateFormItems(newItems);
    };

    const updateFormItems = (items: FormSaleItem[]) => {
        const formItems = items
            .filter(item => item.product_id && item.quantity)
            .map(item => ({
                product_id: parseInt(item.product_id),
                quantity: parseInt(item.quantity) || 1
            }));
        setData('items', formItems);
    };

    const getProduct = (productId: string) => {
        return products.find(p => p.id.toString() === productId);
    };

    const calculateTotal = () => {
        return saleItems.reduce((total, item) => {
            if (!item.product_id || !item.quantity) return total;
            const product = getProduct(item.product_id);
            if (product) {
                return total + (product.selling_price * parseInt(item.quantity));
            }
            return total;
        }, 0);
    };

    const formatCurrency = (amount: number) => {
        return new Intl.NumberFormat('id-ID', {
            style: 'currency',
            currency: 'IDR',
            minimumFractionDigits: 0,
            maximumFractionDigits: 0,
        }).format(amount);
    };

    const submit = (e: React.FormEvent) => {
        e.preventDefault();
        updateFormItems(saleItems);
        post(route('sales.store'));
    };

    return (
        <AppLayout>
            <Head title="Catat Penjualan" />
            
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
                            <span>🛒</span>
                            Catat Penjualan Baru
                        </h1>
                        <p className="text-gray-600 mt-1">
                            Tambahkan produk yang terjual dan catat transaksi
                        </p>
                    </div>
                </div>

                <form onSubmit={submit} className="space-y-6">
                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <span>📝</span>
                                Detail Penjualan
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            {saleItems.map((item, index) => (
                                <div key={index} className="flex items-end gap-4 p-4 bg-gray-50 rounded-lg">
                                    <div className="flex-1">
                                        <Label>Produk</Label>
                                        <Select
                                            value={item.product_id}
                                            onValueChange={(value) => updateSaleItem(index, 'product_id', value)}
                                        >
                                            <SelectTrigger>
                                                <SelectValue placeholder="Pilih produk..." />
                                            </SelectTrigger>
                                            <SelectContent>
                                                {products.map((product) => (
                                                    <SelectItem key={product.id} value={product.id.toString()}>
                                                        {product.name} - {formatCurrency(product.selling_price)} (Stok: {product.stock})
                                                    </SelectItem>
                                                ))}
                                            </SelectContent>
                                        </Select>
                                    </div>

                                    <div className="w-24">
                                        <Label>Jumlah</Label>
                                        <Input
                                            type="number"
                                            min="1"
                                            max={getProduct(item.product_id)?.stock || 999}
                                            value={item.quantity}
                                            onChange={(e) => updateSaleItem(index, 'quantity', e.target.value)}
                                        />
                                    </div>

                                    <div className="w-32">
                                        <Label>Subtotal</Label>
                                        <div className="h-10 px-3 py-2 bg-gray-100 rounded-md flex items-center text-sm">
                                            {(() => {
                                                const product = getProduct(item.product_id);
                                                return product 
                                                    ? formatCurrency(product.selling_price * parseInt(item.quantity || '0'))
                                                    : formatCurrency(0);
                                            })()}
                                        </div>
                                    </div>

                                    <Button
                                        type="button"
                                        variant="outline"
                                        size="sm"
                                        onClick={() => removeItem(index)}
                                        disabled={saleItems.length === 1}
                                    >
                                        <Trash2 className="w-4 h-4" />
                                    </Button>
                                </div>
                            ))}

                            <Button
                                type="button"
                                variant="outline"
                                onClick={addItem}
                                className="w-full"
                            >
                                <Plus className="w-4 h-4 mr-2" />
                                Tambah Produk
                            </Button>

                            <InputError message={errors.items} />
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <span>💰</span>
                                Ringkasan & Catatan
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div>
                                <Label htmlFor="notes">Catatan (Opsional)</Label>
                                <Input
                                    id="notes"
                                    placeholder="Catatan tambahan untuk penjualan ini..."
                                    value={data.notes}
                                    onChange={(e) => setData('notes', e.target.value)}
                                />
                                <InputError message={errors.notes} />
                            </div>

                            <div className="flex justify-between items-center p-4 bg-green-50 rounded-lg border-2 border-green-200">
                                <span className="text-lg font-semibold text-green-800">
                                    Total Penjualan:
                                </span>
                                <span className="text-2xl font-bold text-green-600">
                                    {formatCurrency(calculateTotal())}
                                </span>
                            </div>
                        </CardContent>
                    </Card>

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
                            disabled={processing || calculateTotal() === 0}
                            className="flex-1"
                        >
                            <ShoppingCart className="w-4 h-4 mr-2" />
                            {processing ? 'Menyimpan...' : 'Simpan Penjualan'}
                        </Button>
                    </div>
                </form>
            </div>
        </AppLayout>
    );
}