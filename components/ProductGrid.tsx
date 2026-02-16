import React, { useState } from 'react';
import { Product } from '../types';
import { ShoppingBag } from 'lucide-react';

interface ProductGridProps {
    products: Product[];
    onProductClick: (product: Product) => void;
}

const ProductGrid: React.FC<ProductGridProps> = ({ products, onProductClick }) => {
    const [activeCategory, setActiveCategory] = useState('Todos');
    const categories = ['Todos', 'Camisetas', 'Camisolas', 'Acessórios'];

    const filteredProducts = activeCategory === 'Todos' 
        ? products 
        : products.filter(p => p.category === activeCategory);

    return (
        <main id="catalog" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 border-t border-gray-100 min-h-[50vh]">
            <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
                <div>
                    <h2 className="text-4xl font-black tracking-tighter mb-2 uppercase">Nossa Coleção</h2>
                    <p className="text-[10px] font-bold text-amber-600 uppercase tracking-widest mb-6">* Maputo Cidade e Província (Sob custo adicional)</p>
                    <div className="flex flex-wrap gap-2">
                        {categories.map(cat => (
                            <button 
                                key={cat}
                                onClick={() => setActiveCategory(cat)}
                                className={`px-6 py-2 rounded-full text-xs font-bold transition-all uppercase tracking-widest ${activeCategory === cat ? 'bg-black text-white shadow-lg' : 'bg-gray-100 text-gray-500 hover:bg-gray-200'}`}
                            >
                                {cat}
                            </button>
                        ))}
                    </div>
                </div>
                <div className="mt-4 md:mt-0 text-xs font-bold text-gray-400 uppercase tracking-widest">
                    <span>{filteredProducts.length} modelos</span>
                </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-16">
                {filteredProducts.length === 0 ? (
                    <div className="col-span-full flex flex-col items-center justify-center py-20 text-center space-y-4 opacity-50">
                        <ShoppingBag className="w-16 h-16 text-gray-300" />
                        <h3 className="text-xl font-black uppercase text-gray-400 tracking-widest">Categoria Vazia</h3>
                        <p className="text-sm text-gray-400 max-w-md">Novidades do Reino a caminho.</p>
                    </div>
                ) : (
                    filteredProducts.map(p => {
                        const hasPromo = p.discountPrice || p.oversizeDiscountPrice;
                        const displayPrice = p.discountPrice || p.price;

                        return (
                            <div key={p.id} onClick={() => onProductClick(p)} className="group cursor-pointer flex flex-col animate-fade-in">
                                <div className="aspect-[4/5] bg-gray-100 overflow-hidden relative mb-4 rounded-sm shadow-sm">
                                    <img src={p.imageUrl} alt={p.name} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                                    
                                    {/* Badges */}
                                    <div className="absolute top-4 left-4 flex flex-col gap-2">
                                        {hasPromo && (
                                            <span className="bg-red-600 text-white text-[8px] font-black px-3 py-1.5 rounded uppercase tracking-widest shadow-xl">PROMO</span>
                                        )}
                                        {p.specialEditionLabel && (
                                            <span className="bg-[#D4AF37] text-white text-[8px] font-black px-3 py-1.5 rounded uppercase tracking-widest shadow-xl border border-white/20">
                                                {p.specialEditionLabel}
                                            </span>
                                        )}
                                    </div>

                                    <div className="absolute bottom-4 left-4 opacity-0 group-hover:opacity-100 transition-all translate-y-2 group-hover:translate-y-0">
                                        <span className="bg-white text-black text-[10px] font-black px-4 py-2 rounded-full shadow-xl uppercase tracking-widest">Ver Detalhes</span>
                                    </div>
                                </div>
                                <div className="flex flex-col space-y-1">
                                    <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">{p.category}</p>
                                    <h3 className="text-base font-bold group-hover:underline">{p.name}</h3>
                                    <p className="text-black font-black text-sm">
                                        {displayPrice.toLocaleString('pt-MZ')} MT
                                        {p.oversizePrice && <span className="text-[10px] text-gray-400 font-bold ml-1">(Desde)</span>}
                                    </p>
                                </div>
                            </div>
                        );
                    })
                )}
            </div>
        </main>
    );
};

export default ProductGrid;