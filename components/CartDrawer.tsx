import React from 'react';
import { X, Trash2 } from 'lucide-react';
import { CartItem } from '../types';
import { STORE_INFO } from '../constants';
import Button from './Button';

interface CartDrawerProps {
    isOpen: boolean;
    onClose: () => void;
    cart: CartItem[];
    onRemove: (index: number) => void;
}

const CartDrawer: React.FC<CartDrawerProps> = ({ isOpen, onClose, cart, onRemove }) => {
    const total = cart.reduce((acc, item) => acc + item.finalPrice, 0);

    const handleCheckout = () => {
        let msg = `Olá Chilen! Gostaria de encomendar:\n\n`;
        cart.forEach((i, idx) => {
            msg += `${idx + 1}. *${i.name}* (${i.selectedType})\n - ${i.selectedColor} | ${i.selectedSize}\n - Preço: ${i.finalPrice.toLocaleString('pt-MZ')} MT\n\n`;
        });
        msg += `*Total: ${total.toLocaleString('pt-MZ')} MT*`;
        window.open(`https://wa.me/${STORE_INFO.whatsappNumber}?text=${encodeURIComponent(msg)}`, '_blank');
    };

    return (
        <>
            <div 
                onClick={onClose} 
                className={`fixed inset-0 z-40 bg-black/40 backdrop-blur-sm transition-opacity duration-300 ${isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
            />
            <div className={`fixed inset-y-0 right-0 w-screen max-w-md bg-white shadow-2xl z-50 flex flex-col transform transition-transform duration-300 ease-in-out ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}>
                <div className="flex items-center justify-between p-6 border-b">
                    <h2 className="text-xl font-black uppercase tracking-tighter">Meu Carrinho</h2>
                    <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-full transition-colors">
                        <X className="w-5 h-5" />
                    </button>
                </div>
                
                <div className="flex-1 overflow-y-auto p-6 space-y-6 custom-scrollbar">
                    {cart.length === 0 ? (
                        <div className="flex flex-col items-center justify-center h-full text-gray-400">
                            <p className="text-xs font-black uppercase tracking-widest">Carrinho Vazio</p>
                        </div>
                    ) : (
                        cart.map((item, idx) => (
                            <div key={idx} className="flex space-x-4 border-b pb-4 animate-fade-in">
                                <img src={item.imageUrl} alt={item.name} className="w-16 h-20 object-cover rounded shadow-sm" />
                                <div className="flex-1">
                                    <div className="flex justify-between items-start">
                                        <h4 className="text-xs font-black uppercase tracking-tight">{item.name}</h4>
                                        <button onClick={() => onRemove(idx)} className="text-gray-300 hover:text-red-500 transition-colors">
                                            <Trash2 className="w-3 h-3" />
                                        </button>
                                    </div>
                                    <p className="text-[8px] text-gray-400 font-bold uppercase mt-1">
                                        {item.selectedType} | {item.selectedColor} | {item.selectedSize}
                                    </p>
                                    <p className="text-xs font-black mt-2">{item.finalPrice.toLocaleString('pt-MZ')} MT</p>
                                </div>
                            </div>
                        ))
                    )}
                </div>

                {cart.length > 0 && (
                    <div className="p-6 border-t bg-gray-50/50">
                        <div className="flex justify-between items-center mb-6">
                            <span className="text-sm font-bold text-gray-400 uppercase tracking-widest">Subtotal</span>
                            <span className="text-2xl font-black">{total.toLocaleString('pt-MZ')} MT</span>
                        </div>
                        <Button 
                            onClick={handleCheckout} 
                            fullWidth
                            variant="primary"
                            className="bg-[#25D366] hover:bg-[#20b85a]"
                        >
                            Encomendar via WhatsApp
                        </Button>
                    </div>
                )}
            </div>
        </>
    );
};

export default CartDrawer;