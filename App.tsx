import React, { useState, useEffect } from 'react';
import { Product, CartItem } from './types';
import { INITIAL_PRODUCTS } from './constants';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Manifesto from './components/Manifesto';
import ProductGrid from './components/ProductGrid';
import Footer from './components/Footer';
import ProductModal from './components/ProductModal';
import CartDrawer from './components/CartDrawer';
import AdminDrawer from './components/AdminDrawer';
import Chatbot from './components/Chatbot';
import { supabase } from './services/supabaseClient';

const App: React.FC = () => {
    // State
    const [products, setProducts] = useState<Product[]>([]); // Start empty, fetch from DB
    const [cart, setCart] = useState<CartItem[]>([]);
    const [isCartOpen, setIsCartOpen] = useState(false);
    const [isAdminOpen, setIsAdminOpen] = useState(false);
    const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
    const [loading, setLoading] = useState(true);

    // Fetch Products from Supabase
    const fetchProducts = async () => {
        try {
            setLoading(true);
            const { data, error } = await supabase
                .from('products')
                .select('*')
                .order('id', { ascending: false }); // Sort by newest

            if (error) {
                console.error('Error fetching products:', error);
                // Fallback to initial products if DB is empty or error (optional)
                if (products.length === 0) setProducts(INITIAL_PRODUCTS);
            } else if (data && data.length > 0) {
                setProducts(data as Product[]);
            } else {
                 // Initialize with local data if DB is empty for demo purposes
                 setProducts(INITIAL_PRODUCTS);
            }
        } catch (err) {
            console.error('Unexpected error:', err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchProducts();
        
        // Initialize Cart from LocalStorage
        const storedCart = localStorage.getItem('chilen_cart');
        if (storedCart) {
            try {
                setCart(JSON.parse(storedCart));
            } catch (e) {
                console.error("Cart error", e);
            }
        }
    }, []);

    // Persist Cart
    useEffect(() => {
        localStorage.setItem('chilen_cart', JSON.stringify(cart));
    }, [cart]);

    // Handlers
    const addToCart = (item: CartItem) => {
        setCart([...cart, item]);
        setIsCartOpen(true);
    };

    const removeFromCart = (index: number) => {
        const newCart = [...cart];
        newCart.splice(index, 1);
        setCart(newCart);
    };

    // Removed insecure window.prompt. Auth is handled inside AdminDrawer now.
    const handleAdminAccess = () => {
        setIsAdminOpen(true);
    };

    return (
        <div className="bg-white min-h-screen">
            <Navbar 
                cartCount={cart.length} 
                onOpenCart={() => setIsCartOpen(true)}
                onAdminClick={handleAdminAccess}
            />
            
            <Hero />
            <Manifesto />
            
            {loading ? (
                <div className="flex justify-center items-center h-40">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-black"></div>
                </div>
            ) : (
                <ProductGrid 
                    products={products} 
                    onProductClick={setSelectedProduct} 
                />
            )}
            
            <Footer />

            {/* Overlays */}
            <ProductModal 
                product={selectedProduct} 
                onClose={() => setSelectedProduct(null)} 
                onAddToCart={addToCart}
            />

            <CartDrawer 
                isOpen={isCartOpen} 
                onClose={() => setIsCartOpen(false)} 
                cart={cart}
                onRemove={removeFromCart}
            />

            <AdminDrawer 
                isOpen={isAdminOpen}
                onClose={() => setIsAdminOpen(false)}
                products={products}
                onRefresh={fetchProducts}
            />

            {/* AI Assistant */}
            <Chatbot products={products} />
        </div>
    );
};

export default App;