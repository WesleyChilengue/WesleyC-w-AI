import React from 'react';
import { Hand } from 'lucide-react';

const Manifesto: React.FC = () => {
    return (
        <section className="bg-white py-24 px-4 overflow-hidden border-t border-gray-50">
            <div className="max-w-7xl mx-auto">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
                    <div className="relative lg:sticky lg:top-24">
                        <div className="absolute -top-10 -left-10 w-32 h-32 bg-amber-100 rounded-full blur-3xl opacity-50"></div>
                        <h2 className="text-5xl md:text-7xl font-black tracking-tighter leading-[0.9] uppercase mb-8">
                            Não é apenas <span className="text-amber-600 italic logo-chilen lowercase font-normal tracking-normal">roupa.</span><br/>
                            É uma <span className="text-black">Identidade.</span>
                        </h2>
                        <div className="h-1 w-24 bg-black mb-8"></div>
                        <p className="text-xl md:text-2xl font-medium text-gray-800 leading-relaxed italic pr-8">
                            "A Chilen nasce da fusão entre a pulsação urbana e a mensagem eterna do Reino."
                        </p>
                    </div>
                    
                    <div className="space-y-10">
                        <div className="space-y-4">
                            <h3 className="text-2xl font-black uppercase tracking-tight text-black">Fé não é tendência. É identidade.</h3>
                            <p className="text-base text-gray-600 leading-relaxed">
                                O streetwear sempre foi sobre atitude e a nossa vem do Reino. Cada peça carrega propósito, verdade e a mensagem que não muda com o tempo. <span class="font-bold text-black">Não vestimos só estilo, vestimos fé.</span>
                            </p>
                        </div>

                        <div className="bg-gray-50 p-8 rounded-2xl border-l-4 border-black shadow-sm">
                            <h4 class="text-lg font-black uppercase mb-3">Não é só roupa. É posicionamento.</h4>
                            <p class="text-gray-600 italic leading-relaxed">É viver o evangelho sem silenciar quem você é.</p>
                        </div>

                        <div className="space-y-4 pt-4">
                            {[
                                "Vista sua fé.",
                                "Ande com propósito.",
                                "Leve a Palavra para onde quer que fores."
                            ].map((text, i) => (
                                <div key={i} className="flex items-center space-x-4 group">
                                    <span className="flex-shrink-0 w-8 h-8 rounded-full bg-amber-50 flex items-center justify-center text-amber-600 text-sm">
                                        <Hand className="w-4 h-4" />
                                    </span>
                                    <span className="text-sm font-black uppercase tracking-[0.15em] text-black">{text}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Manifesto;