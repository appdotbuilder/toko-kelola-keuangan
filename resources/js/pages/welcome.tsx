import { type SharedData } from '@/types';
import { Head, Link, usePage } from '@inertiajs/react';

export default function Welcome() {
    const { auth } = usePage<SharedData>().props;

    return (
        <>
            <Head title="Sistem Manajemen Toko">
                <link rel="preconnect" href="https://fonts.bunny.net" />
                <link href="https://fonts.bunny.net/css?family=instrument-sans:400,500,600" rel="stylesheet" />
            </Head>
            <div className="flex min-h-screen flex-col items-center bg-gradient-to-br from-blue-50 to-indigo-100 p-6 text-gray-900 lg:justify-center lg:p-8 dark:from-gray-900 dark:to-gray-800 dark:text-white">
                <header className="mb-12 w-full max-w-6xl text-sm">
                    <nav className="flex items-center justify-end gap-4">
                        {auth.user ? (
                            <Link
                                href={route('dashboard')}
                                className="inline-flex items-center gap-2 rounded-lg bg-blue-600 px-6 py-3 text-white font-medium hover:bg-blue-700 transition-colors"
                            >
                                <span>🏪</span>
                                Buka Dashboard
                            </Link>
                        ) : (
                            <>
                                <Link
                                    href={route('login')}
                                    className="inline-block rounded-lg border border-gray-300 px-6 py-3 text-gray-700 hover:bg-gray-50 transition-colors dark:border-gray-600 dark:text-gray-300 dark:hover:bg-gray-700"
                                >
                                    Masuk
                                </Link>
                                <Link
                                    href={route('register')}
                                    className="inline-block rounded-lg bg-blue-600 px-6 py-3 text-white font-medium hover:bg-blue-700 transition-colors"
                                >
                                    Daftar
                                </Link>
                            </>
                        )}
                    </nav>
                </header>

                <div className="flex w-full items-center justify-center lg:grow">
                    <main className="w-full max-w-6xl">
                        {/* Hero Section */}
                        <div className="text-center mb-16">
                            <div className="mb-6">
                                <span className="text-6xl">🏪</span>
                            </div>
                            <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                                Sistem Manajemen Toko
                            </h1>
                            <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto dark:text-gray-300">
                                Kelola toko Anda dengan mudah - dari manajemen produk, pencatatan penjualan, hingga laporan keuangan lengkap
                            </p>
                            
                            {auth.user ? (
                                <Link
                                    href={route('dashboard')}
                                    className="inline-flex items-center gap-2 bg-blue-600 text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-blue-700 transition-all transform hover:scale-105"
                                >
                                    <span>📊</span>
                                    Mulai Kelola Toko
                                </Link>
                            ) : (
                                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                                    <Link
                                        href={route('register')}
                                        className="inline-flex items-center gap-2 bg-blue-600 text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-blue-700 transition-all transform hover:scale-105"
                                    >
                                        <span>🚀</span>
                                        Mulai Gratis
                                    </Link>
                                    <Link
                                        href={route('login')}
                                        className="inline-flex items-center gap-2 border-2 border-blue-600 text-blue-600 px-8 py-4 rounded-lg text-lg font-semibold hover:bg-blue-50 transition-colors dark:hover:bg-blue-900/20"
                                    >
                                        <span>🔑</span>
                                        Masuk ke Akun
                                    </Link>
                                </div>
                            )}
                        </div>

                        {/* Features Grid */}
                        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
                            <div className="bg-white rounded-xl p-6 shadow-lg dark:bg-gray-800">
                                <div className="text-3xl mb-3">📦</div>
                                <h3 className="text-lg font-semibold mb-2">Manajemen Produk</h3>
                                <p className="text-gray-600 text-sm dark:text-gray-400">
                                    Kelola inventaris, harga beli & jual, dan stok produk dengan mudah
                                </p>
                            </div>
                            
                            <div className="bg-white rounded-xl p-6 shadow-lg dark:bg-gray-800">
                                <div className="text-3xl mb-3">💰</div>
                                <h3 className="text-lg font-semibold mb-2">Pencatatan Penjualan</h3>
                                <p className="text-gray-600 text-sm dark:text-gray-400">
                                    Catat setiap transaksi penjualan dan hitung keuntungan otomatis
                                </p>
                            </div>
                            
                            <div className="bg-white rounded-xl p-6 shadow-lg dark:bg-gray-800">
                                <div className="text-3xl mb-3">📝</div>
                                <h3 className="text-lg font-semibold mb-2">Pencatatan Pengeluaran</h3>
                                <p className="text-gray-600 text-sm dark:text-gray-400">
                                    Catat semua pengeluaran operasional berdasarkan kategori
                                </p>
                            </div>
                            
                            <div className="bg-white rounded-xl p-6 shadow-lg dark:bg-gray-800">
                                <div className="text-3xl mb-3">📊</div>
                                <h3 className="text-lg font-semibold mb-2">Laporan Keuangan</h3>
                                <p className="text-gray-600 text-sm dark:text-gray-400">
                                    Lihat ringkasan pemasukan, pengeluaran, dan laporan laba/rugi
                                </p>
                            </div>
                        </div>

                        {/* Benefits Section */}
                        <div className="bg-white rounded-2xl p-8 shadow-xl dark:bg-gray-800 mb-16">
                            <h2 className="text-2xl font-bold text-center mb-8">Fitur Unggulan</h2>
                            <div className="grid md:grid-cols-2 gap-8">
                                <div>
                                    <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                                        <span>🎯</span>
                                        Dashboard Ringkasan
                                    </h3>
                                    <ul className="space-y-2 text-gray-600 dark:text-gray-400">
                                        <li>• Total penjualan dan keuntungan harian/mingguan/bulanan</li>
                                        <li>• Produk dengan stok menipis</li>
                                        <li>• Produk terlaris</li>
                                        <li>• Ringkasan pengeluaran per kategori</li>
                                    </ul>
                                </div>
                                <div>
                                    <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                                        <span>⚡</span>
                                        Mudah & Cepat
                                    </h3>
                                    <ul className="space-y-2 text-gray-600 dark:text-gray-400">
                                        <li>• Interface yang intuitif dan mudah digunakan</li>
                                        <li>• Kalkulasi otomatis keuntungan dan total</li>
                                        <li>• Update stok otomatis saat penjualan</li>
                                        <li>• Laporan periode fleksibel</li>
                                    </ul>
                                </div>
                            </div>
                        </div>

                        {/* CTA Section */}
                        <div className="text-center bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-8 text-white">
                            <h2 className="text-2xl font-bold mb-4">Siap Mengelola Toko Anda?</h2>
                            <p className="text-blue-100 mb-6">
                                Mulai kelola keuangan toko Anda dengan lebih terorganisir hari ini juga!
                            </p>
                            {auth.user ? (
                                <Link
                                    href={route('dashboard')}
                                    className="inline-flex items-center gap-2 bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
                                >
                                    <span>🏪</span>
                                    Ke Dashboard
                                </Link>
                            ) : (
                                <Link
                                    href={route('register')}
                                    className="inline-flex items-center gap-2 bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
                                >
                                    <span>✨</span>
                                    Daftar Sekarang
                                </Link>
                            )}
                        </div>
                    </main>
                </div>

                <footer className="mt-16 text-center text-gray-500 dark:text-gray-400">
                    <p>
                        Dibangun dengan ❤️ menggunakan{" "}
                        <a 
                            href="https://laravel.com" 
                            target="_blank" 
                            className="font-medium text-blue-600 hover:underline"
                        >
                            Laravel
                        </a>
                        {" & "}
                        <a 
                            href="https://react.dev" 
                            target="_blank" 
                            className="font-medium text-blue-600 hover:underline"
                        >
                            React
                        </a>
                    </p>
                </footer>
            </div>
        </>
    );
}