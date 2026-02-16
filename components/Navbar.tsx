import React from 'react';
import { ShoppingBag } from 'lucide-react';

interface NavbarProps {
    cartCount: number;
    onOpenCart: () => void;
    onAdminClick: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ cartCount, onOpenCart, onAdminClick }) => {
    return (
        <nav className="fixed top-0 left-0 right-0 z-40 bg-white/90 backdrop-blur-md border-b border-gray-100 h-16">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full flex justify-between items-center">
                <div className="flex-shrink-0 flex items-center">
                    <span 
                        onClick={onAdminClick} 
                        className="logo-chilen text-4xl text-black cursor-pointer select-none hover:opacity-70 transition-opacity"
                    >
                        Chilen
                    </span>
                </div>
                
                <div className="flex items-center space-x-4">
                    <button 
                        onClick={onOpenCart} 
                        className="p-2 hover:bg-gray-100 rounded-full transition-colors relative"
                    >
                        <ShoppingBag className="w-5 h-5 text-gray-900" />
                        {cartCount > 0 && (
                            <span className="absolute -top-1 -right-1 bg-black text-white text-[9px] font-black h-5 w-5 flex items-center justify-center rounded-full border-2 border-white animate-fade-in">
                                {cartCount}
                            </span>
                        )}
                    </button>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;