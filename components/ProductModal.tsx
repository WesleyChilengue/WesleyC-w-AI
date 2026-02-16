import React, { useState, useEffect } from 'react';
import { X, Check } from 'lucide-react';
import { Product, CartItem, COLOR_MAP } from '../types';
import Button from './Button';

interface ProductModalProps {
    product: Product | null;
    onClose: () => void;
    onAddToCart: (item: CartItem) => void;
}

const ProductModal: React.FC<ProductModalProps> = ({ product, onClose, onAddToCart }) => {
    const [selectedSize, setSelectedSize] = useState<string>('');
    const [selectedColor, setSelectedColor] = useState<string>('');
    const [selectedType, setSelectedType] = useState<'Regular' | 'Oversize'>('Regular');
    
    // Reset state when product changes
    useEffect(() => {
        if (product) {
            setSelectedSize('');
            setSelectedColor('');
            setSelectedType('Regular');
        }
    }, [product]);

    if (!product) return null;

    const isOversize = selectedType === 'Oversize';
    const basePrice = isOversize ? (product.oversizePrice || product.price) : product.price;
    const discountPrice = isOversize ? product.oversizeDiscountPrice : product.discountPrice;
    const finalPrice = discountPrice || basePrice;

    // Determine displayed image based on color selection
    const displayImage = (selectedColor && product.colorImages?.[selectedColor]) 
        ? product.colorImages[selectedColor] 
        : product.imageUrl;

    const handleAddToCart = () => {
        if (!selectedSize || !selectedColor) {
            alert("Por favor selecione tamanho e cor.");
            return;
        }
        onAddToCart({
            ...product,
            selectedSize,
            selectedColor,
            selectedType,
            finalPrice,
            qty: 1
        });
        onClose();
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-md animate-fade-in">
            <div className="bg-white w-full max-w-4xl max-h-[95vh] overflow-y-auto rounded-3xl relative flex flex-col md:flex-row shadow-2xl custom-scrollbar">
                <button onClick={onClose} className="absolute top-6 right-6 z-10 p-2 bg-white/90 hover:bg-black hover:text-white rounded-full transition-colors shadow-sm">
                    <X className="w-5 h-5" />
                </button>

                <div className="w-full md:w-1/2 bg-gray-50 flex items-center justify-center p-6 min-h-[400px]">
                    <img src={displayImage} alt={product.name} className="w-full h-auto rounded-xl shadow-lg object-cover" />
                </div>

                <div className="w-full md:w-1/2 p-8 md:p-12 flex flex-col">
                    <div className="flex justify-between items-start">
                         <span className="text-[11px] font-black text-gray-400 uppercase tracking-widest">{product.category}</span>
                         {product.specialEditionLabel && (
                            <span className="bg-[#D4AF37] text-white text-[9px] font-black px-2 py-1 rounded uppercase tracking-widest">
                                {product.specialEditionLabel}
                            </span>
                         )}
                    </div>
                   
                    <h2 className="text-4xl font-black tracking-tighter mt-2 mb-2 uppercase leading-none">{product.name}</h2>
                    
                    <div className="flex items-center gap-3 mt-4">
                        {discountPrice && (
                             <p className="text-xl font-bold text-gray-300 line-through">
                                 {basePrice.toLocaleString('pt-MZ')} MT
                             </p>
                        )}
                        <p className="text-4xl font-black text-black">
                            {finalPrice.toLocaleString('pt-MZ')} MT
                        </p>
                    </div>

                    <div className="mt-6 border-t pt-6">
                        <h4 className="text-[10px] font-black mb-2 uppercase tracking-widest text-gray-400">SOBRE</h4>
                        <p className="text-sm text-gray-600 leading-relaxed">{product.description}</p>
                    </div>

                    {/* Type Selector */}
                    {product.oversizePrice && (
                        <div className="mt-8">
                            <h4 className="text-[10px] font-black mb-4 uppercase tracking-widest text-gray-400">CORTE</h4>
                            <div className="flex gap-2">
                                <button 
                                    onClick={() => setSelectedType('Regular')}
                                    className={`flex-1 py-3 text-[10px] font-black border-2 rounded-xl uppercase transition-colors ${selectedType === 'Regular' ? 'bg-black text-white border-black' : 'border-gray-100 hover:border-black'}`}
                                >Regular</button>
                                <button 
                                    onClick={() => setSelectedType('Oversize')}
                                    className={`flex-1 py-3 text-[10px] font-black border-2 rounded-xl uppercase transition-colors ${selectedType === 'Oversize' ? 'bg-black text-white border-black' : 'border-gray-100 hover:border-black'}`}
                                >Oversized</button>
                            </div>
                        </div>
                    )}

                    {/* Color Selector - Enhanced Visibility */}
                    <div className="mt-8">
                        <div className="flex justify-between items-end mb-4">
                            <h4 className="text-[10px] font-black uppercase tracking-widest text-gray-400">COR</h4>
                            {selectedColor && <span className="text-xs font-bold text-black animate-fade-in">{selectedColor}</span>}
                        </div>
                        <div className="flex flex-wrap gap-4">
                            {product.colors.map(color => {
                                const hex = COLOR_MAP[color] || '#e5e7eb'; // Default to gray if unknown
                                const isSelected = selectedColor === color;
                                const isWhite = hex.toLowerCase() === '#ffffff';
                                
                                return (
                                    <button
                                        key={color}
                                        onClick={() => setSelectedColor(color)}
                                        title={color}
                                        className={`w-12 h-12 rounded-full transition-all duration-300 focus:outline-none flex items-center justify-center relative
                                            ${isSelected 
                                                ? 'ring-2 ring-offset-2 ring-black scale-110 shadow-xl' 
                                                : 'ring-1 ring-gray-200 hover:scale-105 hover:shadow-md'
                                            }`}
                                        style={{ backgroundColor: hex }}
                                    >
                                        {/* Add a clearer inner border for white colors so they don't disappear */}
                                        {isWhite && <span className="absolute inset-0 rounded-full border border-gray-200 pointer-events-none"></span>}
                                        
                                        {/* Checkmark for better UX */}
                                        {isSelected && (
                                            <Check className={`w-5 h-5 ${isWhite || hex === '#F5F5DC' ? 'text-black' : 'text-white'}`} strokeWidth={3} />
                                        )}
                                    </button>
                                );
                            })}
                        </div>
                    </div>

                    {/* Size Selector */}
                    <div className="mt-8">
                        <h4 className="text-[10px] font-black mb-4 uppercase tracking-widest text-gray-400">TAMANHO</h4>
                        <div className="grid grid-cols-4 gap-2">
                            {product.sizes.map(size => (
                                <button
                                    key={size}
                                    onClick={() => setSelectedSize(size)}
                                    className={`py-3 text-[11px] font-black border-2 rounded-xl uppercase transition-colors 
                                        ${selectedSize === size ? 'bg-black text-white border-black shadow-md' : 'border-gray-100 hover:border-black'}`}
                                >
                                    {size}
                                </button>
                            ))}
                        </div>
                    </div>

                    <Button onClick={handleAddToCart} className="mt-8 text-[11px]" fullWidth>
                        Adicionar ao Carrinho
                    </Button>
                </div>
            </div>
        </div>
    );
};

export default ProductModal;