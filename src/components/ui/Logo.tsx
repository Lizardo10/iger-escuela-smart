import React from 'react';

interface LogoProps {
  size?: 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
  showText?: boolean;
}

export const Logo: React.FC<LogoProps> = ({ 
  size = 'md', 
  className = '', 
  showText = true 
}) => {
  const getSizeClasses = () => {
    switch (size) {
      case 'sm':
        return 'w-8 h-8';
      case 'md':
        return 'w-12 h-12';
      case 'lg':
        return 'w-16 h-16';
      case 'xl':
        return 'w-24 h-24';
      default:
        return 'w-12 h-12';
    }
  };

  const getTextSize = () => {
    switch (size) {
      case 'sm':
        return 'text-lg';
      case 'md':
        return 'text-2xl';
      case 'lg':
        return 'text-3xl';
      case 'xl':
        return 'text-4xl';
      default:
        return 'text-2xl';
    }
  };

  return (
    <div className={`flex items-center space-x-3 ${className}`}>
      {/* Logo SVG - Winnie the Pooh + Pingüino */}
      <div className={`${getSizeClasses()} flex-shrink-0`}>
        <svg
          viewBox="0 0 100 100"
          className="w-full h-full"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Fondo circular */}
          <circle
            cx="50"
            cy="50"
            r="48"
            fill="url(#gradient)"
            stroke="#1e40af"
            strokeWidth="2"
          />
          
          {/* Gradiente de fondo */}
          <defs>
            <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#fbbf24" />
              <stop offset="50%" stopColor="#f59e0b" />
              <stop offset="100%" stopColor="#d97706" />
            </linearGradient>
          </defs>
          
          {/* Cuerpo de Winnie the Pooh (parte superior) */}
          <ellipse
            cx="50"
            cy="35"
            rx="18"
            ry="22"
            fill="#fbbf24"
            stroke="#d97706"
            strokeWidth="1.5"
          />
          
          {/* Cabeza de Winnie the Pooh */}
          <circle
            cx="50"
            cy="25"
            r="12"
            fill="#fbbf24"
            stroke="#d97706"
            strokeWidth="1.5"
          />
          
          {/* Orejas de Winnie the Pooh */}
          <circle
            cx="42"
            cy="18"
            r="4"
            fill="#fbbf24"
            stroke="#d97706"
            strokeWidth="1"
          />
          <circle
            cx="58"
            cy="18"
            r="4"
            fill="#fbbf24"
            stroke="#d97706"
            strokeWidth="1"
          />
          
          {/* Ojos de Winnie the Pooh */}
          <circle cx="46" cy="22" r="2" fill="#1f2937" />
          <circle cx="54" cy="22" r="2" fill="#1f2937" />
          
          {/* Nariz de Winnie the Pooh */}
          <ellipse cx="50" cy="26" rx="1.5" ry="1" fill="#1f2937" />
          
          {/* Boca de Winnie the Pooh */}
          <path
            d="M 46 28 Q 50 31 54 28"
            stroke="#1f2937"
            strokeWidth="1.5"
            fill="none"
            strokeLinecap="round"
          />
          
          {/* Cuerpo del pingüino (parte inferior) */}
          <ellipse
            cx="50"
            cy="65"
            rx="16"
            ry="20"
            fill="#1f2937"
            stroke="#111827"
            strokeWidth="1.5"
          />
          
          {/* Cabeza del pingüino */}
          <circle
            cx="50"
            cy="55"
            r="10"
            fill="#1f2937"
            stroke="#111827"
            strokeWidth="1.5"
          />
          
          {/* Pico del pingüino */}
          <path
            d="M 50 50 L 48 48 L 52 48 Z"
            fill="#f59e0b"
            stroke="#d97706"
            strokeWidth="0.5"
          />
          
          {/* Ojos del pingüino */}
          <circle cx="46" cy="52" r="1.5" fill="#ffffff" />
          <circle cx="54" cy="52" r="1.5" fill="#ffffff" />
          <circle cx="46" cy="52" r="0.8" fill="#1f2937" />
          <circle cx="54" cy="52" r="0.8" fill="#1f2937" />
          
          {/* Panza blanca del pingüino */}
          <ellipse
            cx="50"
            cy="65"
            rx="8"
            ry="12"
            fill="#ffffff"
            stroke="#e5e7eb"
            strokeWidth="1"
          />
          
          {/* Alas del pingüino */}
          <ellipse
            cx="35"
            cy="65"
            rx="6"
            ry="12"
            fill="#374151"
            stroke="#1f2937"
            strokeWidth="1"
          />
          <ellipse
            cx="65"
            cy="65"
            rx="6"
            ry="12"
            fill="#374151"
            stroke="#1f2937"
            strokeWidth="1"
          />
          
          {/* Patas del pingüino */}
          <ellipse
            cx="45"
            cy="82"
            rx="3"
            ry="4"
            fill="#f59e0b"
            stroke="#d97706"
            strokeWidth="1"
          />
          <ellipse
            cx="55"
            cy="82"
            rx="3"
            ry="4"
            fill="#f59e0b"
            stroke="#d97706"
            strokeWidth="1"
          />
          
          {/* Detalles decorativos */}
          <circle cx="30" cy="30" r="1" fill="#fbbf24" opacity="0.6" />
          <circle cx="70" cy="35" r="1" fill="#fbbf24" opacity="0.6" />
          <circle cx="25" cy="60" r="1" fill="#ffffff" opacity="0.4" />
          <circle cx="75" cy="65" r="1" fill="#ffffff" opacity="0.4" />
        </svg>
      </div>
      
      {/* Texto del logo */}
      {showText && (
        <div className="flex flex-col">
          <h1 className={`${getTextSize()} font-bold text-blue-600 animate-float`}>
            IGER
          </h1>
          <p className="text-blue-500 text-xs sm:text-sm font-medium">
            Escuela Smart
          </p>
        </div>
      )}
    </div>
  );
};
