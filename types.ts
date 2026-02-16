export interface Product {
    id: string;
    name: string;
    description: string;
    price: number;
    discountPrice?: number | null;
    oversizePrice?: number | null;
    oversizeDiscountPrice?: number | null;
    category: string;
    imageUrl: string;
    colors: string[];
    sizes: string[];
    colorImages?: Record<string, string>;
    specialEditionLabel?: string; // New field for special editions
}

export interface CartItem extends Product {
    selectedSize: string;
    selectedColor: string;
    selectedType: 'Regular' | 'Oversize';
    finalPrice: number;
    qty: number;
}

export interface StoreInfo {
    whatsappNumber: string;
}

export const COLOR_MAP: Record<string, string> = {
    'Preto': '#000000',
    'Branco': '#ffffff',
    'Cinzento': '#888888',
    'Azul Marinho': '#000080',
    'Cinzento Mescla': '#b5b5b5',
    'Azul': '#0000FF',
    'Vermelho': '#DC2626',
    'Verde': '#16A34A',
    'Dourado': '#D4AF37',
    'Bege': '#F5F5DC',
    'Roxo': '#9333EA',
    'Rosa': '#EC4899',
    'Amarelo': '#FACC15',
    'Laranja': '#F97316',
    'Castanho': '#78350F',
    'Creme': '#FFFDD0',
    'Vinho': '#800000'
};