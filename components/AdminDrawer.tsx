import React, { useState, useEffect } from 'react';
import { X, Edit2, Trash2, Loader2, LogOut, Lock, Image as ImageIcon } from 'lucide-react';
import { Product } from '../types';
import { INITIAL_PRODUCTS } from '../constants';
import { supabase } from '../services/supabaseClient';
import Button from './Button';

interface AdminDrawerProps {
    isOpen: boolean;
    onClose: () => void;
    products: Product[];
    onRefresh: () => void;
}

const AdminDrawer: React.FC<AdminDrawerProps> = ({ isOpen, onClose, products, onRefresh }) => {
    // Auth State
    const [session, setSession] = useState<any>(null);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [authLoading, setAuthLoading] = useState(false);

    // CRUD State
    const [editingId, setEditingId] = useState<string | null>(null);
    const [formData, setFormData] = useState<Partial<Product>>({});
    const [isLoading, setIsLoading] = useState(false);

    // Check session on mount
    useEffect(() => {
        supabase.auth.getSession().then(({ data: { session } }) => {
            setSession(session);
        });

        const {
            data: { subscription },
        } = supabase.auth.onAuthStateChange((_event, session) => {
            setSession(session);
        });

        return () => subscription.unsubscribe();
    }, []);

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setAuthLoading(true);
        const { error } = await supabase.auth.signInWithPassword({
            email,
            password,
        });

        if (error) {
            alert('Erro de autenticação: ' + error.message);
        }
        setAuthLoading(false);
    };

    const handleLogout = async () => {
        await supabase.auth.signOut();
        onClose();
    };

    // --- CRUD Logic (Only accessible if logged in) ---

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleColorImageChange = (color: string, url: string) => {
        setFormData(prev => ({
            ...prev,
            colorImages: {
                ...prev.colorImages,
                [color]: url
            }
        }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!session) return;
        setIsLoading(true);

        const productData = {
            name: formData.name || 'Novo Artigo',
            description: formData.description || '',
            price: Number(formData.price) || 0,
            discountPrice: formData.discountPrice ? Number(formData.discountPrice) : null,
            oversizePrice: formData.oversizePrice ? Number(formData.oversizePrice) : null,
            oversizeDiscountPrice: formData.oversizeDiscountPrice ? Number(formData.oversizeDiscountPrice) : null,
            category: formData.category || 'Camisetas',
            imageUrl: formData.imageUrl || 'https://via.placeholder.com/400',
            colors: typeof formData.colors === 'string' ? (formData.colors as string).split(',').map(c => c.trim()) : (formData.colors || []),
            sizes: typeof formData.sizes === 'string' ? (formData.sizes as string).split(',').map(s => s.trim()) : (formData.sizes || []),
            specialEditionLabel: formData.specialEditionLabel || null,
            colorImages: formData.colorImages || null // Supabase will handle JSONB conversion
        };

        try {
            if (editingId) {
                const { error } = await supabase
                    .from('products')
                    .update(productData)
                    .eq('id', editingId);

                if (error) throw error;
            } else {
                const newId = `p-${Date.now()}`;
                const { error } = await supabase
                    .from('products')
                    .insert([{ ...productData, id: newId }]);

                if (error) throw error;
            }

            await onRefresh();
            resetForm();
        } catch (error: any) {
            console.error('Error saving product:', error);
            alert(`Erro ao salvar: ${error.message || 'Verifique suas permissões e se a coluna colorImages existe no DB.'}`);
        } finally {
            setIsLoading(false);
        }
    };

    const resetForm = () => {
        setEditingId(null);
        setFormData({});
    };

    const startEdit = (product: Product) => {
        setEditingId(product.id);
        setFormData({
            ...product,
            colors: product.colors.join(', ') as any,
            sizes: product.sizes.join(', ') as any,
            colorImages: product.colorImages || {}
        });
        document.getElementById('admin-form-top')?.scrollIntoView({ behavior: 'smooth' });
    };

    const deleteProduct = async (id: string) => {
        if (!session) return;
        if (confirm('Tem certeza? Isso apagará do banco de dados permanentemente.')) {
            setIsLoading(true);
            try {
                const { error } = await supabase.from('products').delete().eq('id', id);
                if (error) throw error;
                await onRefresh();
            } catch (error: any) {
                console.error("Delete error:", error);
                alert("Erro ao apagar: " + error.message);
            } finally {
                setIsLoading(false);
            }
        }
    };

    const resetInventory = async () => {
        if (!session) return;
        if (confirm('ATENÇÃO: Isso apagará TODOS os produtos do banco de dados. Continuar?')) {
            setIsLoading(true);
            try {
                const { error: deleteError } = await supabase.from('products').delete().neq('id', 'placeholder');
                const { error: insertError } = await supabase.from('products').insert(INITIAL_PRODUCTS);
                if (insertError) throw insertError;
                await onRefresh();
            } catch (error: any) {
                console.error("Reset error:", error);
                alert("Erro ao restaurar: " + error.message);
            } finally {
                setIsLoading(false);
            }
        }
    };

    // Helper to get current colors for the form
    const currentColors = Array.isArray(formData.colors)
        ? formData.colors
        : typeof (formData.colors as unknown) === 'string'
            ? (formData.colors as unknown as string).split(',').map(c => c.trim()).filter(c => c !== '')
            : [];
    // --- Render ---

    return (
        <>
            <div
                onClick={onClose}
                className={`fixed inset-0 z-50 bg-black/60 backdrop-blur-md transition-opacity duration-300 ${isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
            />
            <div className={`fixed inset-y-0 right-0 w-screen max-w-2xl bg-white shadow-2xl z-[60] flex flex-col transform transition-transform duration-300 ease-in-out ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}>

                {/* Header */}
                <div className="flex items-center justify-between p-6 border-b bg-gray-50">
                    <div>
                        <h2 className="text-xl font-black uppercase tracking-tighter">Painel Admin</h2>
                        <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">
                            {session ? 'Acesso Garantido' : 'Área Restrita'}
                        </p>
                    </div>
                    <div className="flex items-center gap-2">
                        {session && (
                            <button onClick={handleLogout} className="p-2 text-red-500 hover:bg-red-50 rounded-full transition-colors" title="Sair">
                                <LogOut className="w-5 h-5" />
                            </button>
                        )}
                        <button onClick={onClose} className="p-2 hover:bg-gray-200 rounded-full transition-colors">
                            <X className="w-5 h-5" />
                        </button>
                    </div>
                </div>

                <div className="flex-1 overflow-y-auto p-6 custom-scrollbar">

                    {!session ? (
                        // LOGIN FORM
                        <div className="flex flex-col items-center justify-center h-[60vh] space-y-6 animate-fade-in">
                            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">
                                <Lock className="w-8 h-8 text-gray-400" />
                            </div>
                            <h3 className="text-2xl font-black uppercase tracking-tight text-center">Login Administrativo</h3>
                            <form onSubmit={handleLogin} className="w-full max-w-sm space-y-4">
                                <div>
                                    <label className="text-[10px] font-black uppercase text-gray-400 ml-1">Email</label>
                                    <input
                                        type="email"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        className="w-full p-3 bg-gray-50 border border-gray-200 rounded-xl outline-none focus:border-black transition-colors"
                                        placeholder="admin@chilen.com"
                                        required
                                    />
                                </div>
                                <div>
                                    <label className="text-[10px] font-black uppercase text-gray-400 ml-1">Senha</label>
                                    <input
                                        type="password"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        className="w-full p-3 bg-gray-50 border border-gray-200 rounded-xl outline-none focus:border-black transition-colors"
                                        placeholder="••••••••"
                                        required
                                    />
                                </div>
                                <Button type="submit" fullWidth disabled={authLoading}>
                                    {authLoading ? <Loader2 className="w-4 h-4 animate-spin mx-auto" /> : 'Entrar no Sistema'}
                                </Button>
                            </form>
                            <p className="text-[10px] text-gray-400 text-center max-w-xs leading-relaxed">
                                Apenas pessoal autorizado. O seu IP está a ser registado por motivos de segurança.
                            </p>
                        </div>
                    ) : (
                        // ADMIN DASHBOARD
                        <div className="space-y-8 animate-fade-in">
                            <form id="admin-form-top" onSubmit={handleSubmit} className="bg-white p-6 rounded-2xl border-2 border-dashed border-gray-100 grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="md:col-span-2">
                                    <label className="text-[9px] font-black uppercase text-gray-400 ml-1">Nome do Artigo</label>
                                    <input name="name" value={formData.name || ''} onChange={handleChange} required className="w-full p-3 bg-gray-50 border border-gray-100 rounded-xl text-sm outline-none focus:border-black transition-colors" />
                                </div>

                                <div className="md:col-span-2">
                                    <label className="text-[9px] font-black uppercase text-gray-400 ml-1">Edição Especial (Rótulo)</label>
                                    <input
                                        name="specialEditionLabel"
                                        value={formData.specialEditionLabel || ''}
                                        onChange={handleChange}
                                        placeholder="Ex: Black Friday, Edição Limitada"
                                        className="w-full p-3 bg-amber-50 border border-amber-200 rounded-xl text-sm outline-none focus:border-amber-500 transition-colors"
                                    />
                                </div>

                                <div className="md:col-span-2">
                                    <label className="text-[9px] font-black uppercase text-gray-400 ml-1">Descrição</label>
                                    <textarea name="description" value={formData.description || ''} onChange={handleChange} className="w-full p-3 bg-gray-50 border border-gray-100 rounded-xl text-sm outline-none focus:border-black min-h-[80px]" />
                                </div>

                                <div className="bg-gray-50 p-4 rounded-xl border border-gray-100 space-y-3">
                                    <h4 className="text-[9px] font-black text-gray-400 uppercase tracking-widest">Preço Regular</h4>
                                    <input type="number" name="price" value={formData.price || ''} onChange={handleChange} placeholder="Preço (MT)" required className="w-full p-2 bg-white border border-gray-100 rounded-lg text-xs" />
                                    <input type="number" name="discountPrice" value={formData.discountPrice || ''} onChange={handleChange} placeholder="Promoção (MT)" className="w-full p-2 bg-white border border-gray-100 rounded-lg text-xs" />
                                </div>

                                <div className="bg-gray-50 p-4 rounded-xl border border-gray-100 space-y-3">
                                    <h4 className="text-[9px] font-black text-gray-400 uppercase tracking-widest">Preço Oversize</h4>
                                    <input type="number" name="oversizePrice" value={formData.oversizePrice || ''} onChange={handleChange} placeholder="Preço (MT)" className="w-full p-2 bg-white border border-gray-100 rounded-lg text-xs" />
                                    <input type="number" name="oversizeDiscountPrice" value={formData.oversizeDiscountPrice || ''} onChange={handleChange} placeholder="Promoção (MT)" className="w-full p-2 bg-white border border-gray-100 rounded-lg text-xs" />
                                </div>

                                <div className="md:col-span-2">
                                    <label className="text-[9px] font-black uppercase text-gray-400 ml-1">Imagem Principal URL</label>
                                    <input name="imageUrl" value={formData.imageUrl || ''} onChange={handleChange} className="w-full p-3 bg-gray-50 border border-gray-100 rounded-xl text-sm outline-none" />
                                </div>

                                <div className="md:col-span-2">
                                    <label className="text-[9px] font-black uppercase text-gray-400 ml-1">Categoria</label>
                                    <select name="category" value={formData.category || 'Camisetas'} onChange={handleChange} className="w-full p-3 bg-gray-50 border border-gray-100 rounded-xl text-sm outline-none">
                                        <option value="Camisetas">Camisetas</option>
                                        <option value="Camisolas">Camisolas</option>
                                        <option value="Acessórios">Acessórios</option>
                                    </select>
                                </div>

                                <div className="md:col-span-2">
                                    <label className="text-[9px] font-black uppercase text-gray-400 ml-1">Cores (Separe por vírgula)</label>
                                    <input name="colors" value={formData.colors as any || ''} onChange={handleChange} placeholder="Ex: Preto, Branco, Vermelho" className="w-full p-3 bg-gray-50 border border-gray-100 rounded-xl text-sm outline-none" />
                                </div>

                                {/* Dynamic Image Color Mapper */}
                                {currentColors.length > 0 && (
                                    <div className="md:col-span-2 bg-gray-50 p-4 rounded-xl border border-gray-100 space-y-3 animate-fade-in">
                                        <div className="flex items-center gap-2 mb-2">
                                            <ImageIcon className="w-4 h-4 text-gray-400" />
                                            <h4 className="text-[9px] font-black text-gray-400 uppercase tracking-widest">
                                                Imagens Específicas por Cor (Opcional)
                                            </h4>
                                        </div>
                                        <div className="grid grid-cols-1 gap-3">
                                            {currentColors.map((color: string) => (
                                                <div key={color} className="flex items-center gap-2">
                                                    <div className="w-20 flex-shrink-0 flex items-center justify-end">
                                                        <span className="text-[10px] font-bold uppercase truncate text-right pr-2 border-r border-gray-300" title={color}>
                                                            {color}
                                                        </span>
                                                    </div>
                                                    <input
                                                        type="text"
                                                        placeholder={`URL da imagem para ${color}`}
                                                        value={formData.colorImages?.[color] || ''}
                                                        onChange={(e) => handleColorImageChange(color, e.target.value)}
                                                        className="flex-1 p-2 bg-white border border-gray-100 rounded-lg text-xs outline-none focus:border-black transition-colors"
                                                    />
                                                    {formData.colorImages?.[color] && (
                                                        <img
                                                            src={formData.colorImages[color]}
                                                            alt={color}
                                                            className="w-8 h-8 object-cover rounded border border-gray-200"
                                                        />
                                                    )}
                                                </div>
                                            ))}
                                        </div>
                                        <p className="text-[9px] text-gray-400 italic">Deixe em branco para usar a imagem principal.</p>
                                    </div>
                                )}

                                <div className="md:col-span-2">
                                    <label className="text-[9px] font-black uppercase text-gray-400 ml-1">Tamanhos (Separe por vírgula)</label>
                                    <input name="sizes" value={formData.sizes as any || ''} onChange={handleChange} className="w-full p-3 bg-gray-50 border border-gray-100 rounded-xl text-sm outline-none" />
                                </div>

                                <div className="md:col-span-2 flex gap-2 pt-4">
                                    <Button type="submit" fullWidth disabled={isLoading}>
                                        {isLoading ? <Loader2 className="w-4 h-4 animate-spin mx-auto" /> : (editingId ? 'Atualizar (DB)' : 'Criar (DB)')}
                                    </Button>
                                    <Button type="button" variant="outline" onClick={resetForm} disabled={isLoading}>Limpar</Button>
                                </div>
                            </form>

                            <div className="space-y-4 pb-20">
                                <div className="flex justify-between items-center">
                                    <h3 className="text-[10px] font-black uppercase tracking-widest text-gray-400">Inventário Database</h3>
                                    {isLoading && <span className="text-xs text-amber-500 font-bold">Processando...</span>}
                                </div>

                                {products.map(p => (
                                    <div key={p.id} className="flex items-center justify-between p-4 bg-gray-50 border rounded-2xl group hover:border-black transition-colors">
                                        <div className="flex items-center space-x-4">
                                            <img src={p.imageUrl} alt={p.name} className="w-10 h-10 object-cover rounded shadow-sm" />
                                            <div>
                                                <div className="flex items-center gap-2">
                                                    <span className="text-xs font-black uppercase block">{p.name}</span>
                                                    {p.specialEditionLabel && <span className="text-[8px] bg-amber-200 text-amber-800 px-1 rounded font-bold">{p.specialEditionLabel}</span>}
                                                </div>
                                                <span className="text-[9px] font-bold text-gray-400 uppercase">{p.category} | {p.price} MT</span>
                                            </div>
                                        </div>
                                        <div className="flex space-x-2">
                                            <button onClick={() => startEdit(p)} className="p-2 text-black hover:bg-black hover:text-white rounded-lg transition-colors">
                                                <Edit2 className="w-4 h-4" />
                                            </button>
                                            <button onClick={() => deleteProduct(p.id)} className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors">
                                                <Trash2 className="w-4 h-4" />
                                            </button>
                                        </div>
                                    </div>
                                ))}
                                <Button variant="danger" fullWidth onClick={resetInventory} className="mt-8" disabled={isLoading}>
                                    {isLoading ? 'Aguarde...' : 'Reset Database (Restaurar Padrão)'}
                                </Button>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </>
    );
};

export default AdminDrawer;