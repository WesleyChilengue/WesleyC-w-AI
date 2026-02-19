import React from 'react';
import { Instagram, Facebook, Phone, Truck } from 'lucide-react';
import { STORE_INFO } from '../constants';

const Footer: React.FC = () => {
    const num = STORE_INFO.whatsappNumber;
    const fmt = `+${num.slice(0, 3)} ${num.slice(3, 6)} ${num.slice(6, 9)} ${num.slice(9)}`;

    return (
        <footer className="bg-black text-white py-20 px-4">
            <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-12">
                <div className="md:col-span-2">
                    <span className="logo-chilen text-6xl text-white mb-6 block">Chilen</span>
                    <p className="text-gray-400 max-w-md mb-8">Vestindo a fé em Moçambique. Qualidade premium para quem carrega o nome de Jesus com orgulho.</p>
                    <div className="flex flex-col gap-4">
                        <a href="https://instagram.com/Chilen.mz" target="_blank" rel="noreferrer" className="hover:text-[#E4405F] transition-colors flex items-center space-x-2 group">
                            <Instagram className="w-6 h-6 group-hover:scale-110 transition-transform" />
                            <span className="text-[10px] font-black uppercase tracking-widest">@Chilen.mz</span>
                        </a>
                        <a
                            href="https://facebook.com/@chilenStore"
                            target="_blank"
                            rel="noreferrer"
                            className="hover:text-[#1877F2] transition-colors flex items-center gap-2"
                        >
                            <Facebook className="w-6 h-6 group-hover:scale-110 transition-transform" />
                            <span className="text-[10px] font-black uppercase tracking-widest">@chilen Store
                            </span>
                        </a>
                    </div>
                </div>
                <div>
                    <h4 className="font-black mb-6 text-[10px] uppercase tracking-widest text-gray-400">Entrega</h4>
                    <ul className="space-y-4 text-gray-400 text-sm">
                        <li className="flex items-start space-x-2">
                            <Truck className="w-4 h-4 mt-1 text-[#D4AF37]" />
                            <span className="font-bold text-xs uppercase tracking-tight">Maputo Cidade e Província.</span>
                        </li>
                    </ul>
                </div>
                <div>
                    <h4 className="font-black mb-6 text-[10px] uppercase tracking-widest text-gray-400">WhatsApp</h4>
                    <a href={`https://wa.me/${STORE_INFO.whatsappNumber}`} target="_blank" rel="noreferrer" className="hover:text-[#25D366] transition-colors flex items-center space-x-2 group">
                        <Phone className="w-5 h-5 group-hover:scale-110 transition-transform" />
                        <span className="font-black text-sm">{fmt}</span>
                    </a>
                </div>
            </div>
            <div className="max-w-7xl mx-auto mt-20 pt-8 border-t border-gray-800 text-gray-500 text-[9px] text-center md:text-left uppercase tracking-widest font-black">
                <p>&copy; {new Date().getFullYear()} Chilen - Manifeste o Reino. Todos os direitos reservados.</p>
            </div>
        </footer>
    );
};

export default Footer;