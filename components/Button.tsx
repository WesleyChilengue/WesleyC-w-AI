import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: 'primary' | 'secondary' | 'outline' | 'danger';
    fullWidth?: boolean;
}

const Button: React.FC<ButtonProps> = ({ 
    children, 
    variant = 'primary', 
    fullWidth = false, 
    className = '', 
    ...props 
}) => {
    const baseStyles = "py-3 px-6 rounded-xl font-black text-[10px] uppercase tracking-widest transition-all duration-200 active:scale-95";
    
    const variants = {
        primary: "bg-black text-white hover:bg-gray-800 shadow-xl",
        secondary: "bg-[#D4AF37] text-white hover:bg-[#b5952f] shadow-lg",
        outline: "border-2 border-gray-200 text-black hover:border-black",
        danger: "bg-red-50 text-red-600 hover:bg-red-100"
    };

    return (
        <button 
            className={`${baseStyles} ${variants[variant]} ${fullWidth ? 'w-full' : ''} ${className}`}
            {...props}
        >
            {children}
        </button>
    );
};

export default Button;