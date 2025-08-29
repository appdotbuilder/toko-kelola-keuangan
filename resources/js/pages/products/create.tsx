import React from 'react';
import { Head, router, useForm } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { ArrowLeft, Package } from 'lucide-react';
import InputError from '@/components/input-error';



export default function CreateProduct() {
    const { data, setData, post, processing, errors } = useForm({
        name: '',
        purchase_price: '',
        selling_price: '',
        stock: '',
        description: '',
    });

    const submit = (e: React.FormEvent) => {
        e.preventDefault();
        post(route('products.store'));
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

    const handlePriceChange = (field: 'purchase_price' | 'selling_price', e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value.replace(/[^\d]/g, '');
        setData(field, value);
    };

    const calculateProfit = () => {
        const purchase = parseFloat(data.purchase_price) || 0;
        const selling = parseFloat(data.selling_price) || 0;
        return selling - purchase;
    };

    const calculateProfitMargin = () => {
        const purchase = parseFloat(data.purchase_price) || 0;
        const selling = parseFloat(data.selling_price) || 0;
        if (purchase === 0) return 0;
        return ((selling - purchase) / purchase) * 100;
    };

    return (
        <AppLayout>
            <Head title="Tambah Produk" />
            
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
                            <span>📦</span>
                            Tambah Produk Baru
                        </h1>
                        <p className="text-gray-600 mt-1">
                            Tambahkan produk baru ke inventory toko Anda
                        </p>
                    </div>
                </div>

                <form onSubmit={submit} className="space-y-6">
                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <span>📝</span>
                                Informasi Produk
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div>
                                <Label htmlFor="name">Nama Produk*</Label>
                                <Input
                                    id="name"
                                    placeholder="Contoh: Teh Botol Sosro"
                                    value={data.name}
                                    onChange={(e) => setData('name', e.target.value)}
                                />
                                <InputError message={errors.name} />
                            </div>

                            <div>
                                <Label htmlFor="description">Deskripsi Produk</Label>
                                <Input
                                    id="description"
                                    placeholder="Deskripsi produk (opsional)"
                                    value={data.description}
                                    onChange={(e) => setData('description', e.target.value)}
                                />
                                <InputError message={errors.description} />
                            </div>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <span>💰</span>
                                Harga & Stok
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                <div>
                                    <Label htmlFor="purchase_price">Harga Beli (IDR)*</Label>
                                    <Input
                                        id="purchase_price"
                                        type="text"
                                        placeholder="0"
                                        value={formatCurrency(data.purchase_price)}
                                        onChange={(e) => handlePriceChange('purchase_price', e)}
                                    />
                                    <InputError message={errors.purchase_price} />
                                </div>

                                <div>
                                    <Label htmlFor="selling_price">Harga Jual (IDR)*</Label>
                                    <Input
                                        id="selling_price"
                                        type="text"
                                        placeholder="0"
                                        value={formatCurrency(data.selling_price)}
                                        onChange={(e) => handlePriceChange('selling_price', e)}
                                    />
                                    <InputError message={errors.selling_price} />
                                </div>

                                <div>
                                    <Label htmlFor="stock">Stok Awal*</Label>
                                    <Input
                                        id="stock"
                                        type="number"
                                        min="0"
                                        placeholder="0"
                                        value={data.stock}
                                        onChange={(e) => setData('stock', e.target.value)}
                                    />
                                    <InputError message={errors.stock} />
                                </div>
                            </div>

                            {data.purchase_price && data.selling_price && (
                                <div className="mt-4 p-4 bg-blue-50 rounded-lg border border-blue-200">
                                    <h4 className="font-medium text-blue-900 mb-2">📊 Analisis Keuntungan</h4>
                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
                                        <div>
                                            <span className="text-blue-700">Keuntungan per unit:</span>
                                            <div className={`font-semibold ${calculateProfit() >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                                                {formatCurrency(calculateProfit().toString())}
                                            </div>
                                        </div>
                                        <div>
                                            <span className="text-blue-700">Margin keuntungan:</span>
                                            <div className={`font-semibold ${calculateProfitMargin() >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                                                {calculateProfitMargin().toFixed(1)}%
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )}
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
                            disabled={processing || !data.name || !data.purchase_price || !data.selling_price || !data.stock}
                            className="flex-1"
                        >
                            <Package className="w-4 h-4 mr-2" />
                            {processing ? 'Menyimpan...' : 'Simpan Produk'}
                        </Button>
                    </div>
                </form>
            </div>
        </AppLayout>
    );
}