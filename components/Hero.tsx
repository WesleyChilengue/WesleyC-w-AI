import React from 'react';

const Hero: React.FC = () => {
    return (
        <header className="relative h-screen w-full flex items-center justify-center overflow-hidden bg-black pt-16">
            {/* Background Effects */}
            <div className="absolute top-0 left-0 w-full h-full pointer-events-none z-0">
                <div className="absolute -top-[10%] -left-[5%] w-[65%] h-[65%] bg-blue-500/5 rounded-full blur-[140px]"></div>
            </div>

            <div className="relative z-10 w-full max-w-4xl px-4 flex flex-col items-center">
                <div className="relative animate-fade-in">
                    <img 
                        src="https://i.pinimg.com/736x/bb/65/01/bb6501c0b2c6cdd51a166a88c290877f.jpg" 
                        alt="Hero Chilen" 
                        className="max-h-[60vh] md:max-h-[70vh] w-auto object-contain drop-shadow-[0_0_40px_rgba(255,255,255,0.1)]"
                    />
                </div>
                <div className="mt-8 text-center">
                    <h2 className="text-white text-xl md:text-3xl font-black tracking-[0.2em] mb-2 uppercase leading-tight">
                        Identidade do Céu
                    </h2>
                    <div className="h-[1px] w-12 bg-white/30 mx-auto mb-2"></div>
                    <h2 className="text-[#D4AF37] text-lg md:text-2xl font-bold tracking-[0.4em] uppercase italic">
                        Estilo Urbano
                    </h2>
                </div>
            </div>

            <div className="absolute bottom-0 left-0 right-0 h-48 bg-gradient-to-t from-white via-white/5 to-transparent z-20"></div>
        </header>
    );
};

export default Hero;