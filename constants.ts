import { Product, StoreInfo } from './types';

export const STORE_INFO: StoreInfo = { 
    whatsappNumber: '258872201674' 
};

export const INITIAL_PRODUCTS: Product[] = [
    { 
        id: 'j-king', 
        name: 'Jesus is King', 
        price: 1500, 
        oversizePrice: 1800, 
        category: 'Camisetas', 
        description: 'Design premium que proclama a soberania urbana. Estampa de alta densidade.', 
        imageUrl: 'https://i.pinimg.com/736x/6e/fe/0a/6efe0a86f88eba01c11da6d3b0821de7.jpg', 
        sizes: ['S', 'M', 'L', 'XL'], 
        colors: ['Preto', 'Branco'],
        specialEditionLabel: 'Mais Vendido'
    },
    { 
        id: 'p-413', 
        name: 'Philippians 4:13', 
        price: 3500, 
        category: 'Camisolas', 
        description: 'Tudo posso naquele que me fortalece. Moletom pesado 350g.', 
        imageUrl: 'https://i.pinimg.com/736x/09/a2/55/09a255a574ac7ff391c043c3e2a34452.jpg', 
        sizes: ['M', 'L', 'XL'], 
        colors: ['Preto', 'Azul Marinho'] 
    },
    { 
        id: 'goat', 
        name: 'GOAT', 
        price: 1200, 
        oversizePrice: 1500, 
        category: 'Camisetas', 
        description: 'Greatest Of All Time - O Rei dos Reis. Corte moderno.', 
        imageUrl: 'https://i.pinimg.com/736x/73/79/34/737934a7a7de7434704de76a7a498987.jpg', 
        sizes: ['S', 'M', 'L'], 
        colors: ['Branco', 'Preto'] 
    },
    { 
        id: 'h-spirit', 
        name: 'Holy Spirit MZ', 
        price: 1500, 
        category: 'Camisolas', 
        description: 'Moletom moderno com estampa de alta durabilidade.', 
        imageUrl: 'https://i.pinimg.com/736x/e1/86/5e/e1865e1425163d32c98271e693a450cb.jpg', 
        sizes: ['M', 'L', 'XL'], 
        colors: ['Preto', 'Cinzento Mescla'],
        specialEditionLabel: 'Edição Limitada'
    }
];