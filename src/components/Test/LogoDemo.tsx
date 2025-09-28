import React from 'react';
import { Logo } from '../ui/Logo';
import { ResponsiveLogo } from '../ui/ResponsiveLogo';
import { LogoWithBadge } from '../ui/LogoWithBadge';

export const LogoDemo: React.FC = () => {
  return (
    <div className="p-8 bg-gray-50 min-h-screen">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl font-bold text-gray-800 mb-8 text-center">
          Demostración del Logo IGER
        </h1>
        
        {/* Sección de tamaños */}
        <section className="mb-12">
          <h2 className="text-2xl font-semibold text-gray-700 mb-6">
            Diferentes Tamaños
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-md text-center">
              <h3 className="text-lg font-medium mb-4">Pequeño</h3>
              <Logo size="sm" />
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-md text-center">
              <h3 className="text-lg font-medium mb-4">Mediano</h3>
              <Logo size="md" />
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-md text-center">
              <h3 className="text-lg font-medium mb-4">Grande</h3>
              <Logo size="lg" />
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-md text-center">
              <h3 className="text-lg font-medium mb-4">Extra Grande</h3>
              <Logo size="xl" />
            </div>
          </div>
        </section>

        {/* Sección responsiva */}
        <section className="mb-12">
          <h2 className="text-2xl font-semibold text-gray-700 mb-6">
            Logo Responsivo
          </h2>
          <div className="bg-white p-8 rounded-lg shadow-md">
            <div className="space-y-8">
              <div>
                <h3 className="text-lg font-medium mb-4">Con texto</h3>
                <ResponsiveLogo />
              </div>
              
              <div>
                <h3 className="text-lg font-medium mb-4">Solo icono</h3>
                <ResponsiveLogo showText={false} />
              </div>
            </div>
          </div>
        </section>

        {/* Sección de colores de fondo */}
        <section className="mb-12">
          <h2 className="text-2xl font-semibold text-gray-700 mb-6">
            Diferentes Fondos
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-gradient-to-br from-blue-500 to-purple-600 p-8 rounded-lg text-center">
              <Logo size="lg" className="justify-center" />
            </div>
            
            <div className="bg-gradient-to-br from-green-400 to-blue-500 p-8 rounded-lg text-center">
              <Logo size="lg" className="justify-center" />
            </div>
            
            <div className="bg-gradient-to-br from-yellow-400 to-red-500 p-8 rounded-lg text-center">
              <Logo size="lg" className="justify-center" />
            </div>
          </div>
        </section>

        {/* Sección de animaciones */}
        <section className="mb-12">
          <h2 className="text-2xl font-semibold text-gray-700 mb-6">
            Animaciones del Logo
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="bg-white p-6 rounded-lg shadow-md text-center">
              <h3 className="text-lg font-medium mb-4">Flotante</h3>
              <div className="logo-float">
                <Logo size="md" showText={false} />
              </div>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-md text-center">
              <h3 className="text-lg font-medium mb-4">Brillo</h3>
              <div className="logo-glow">
                <Logo size="md" showText={false} />
              </div>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-md text-center">
              <h3 className="text-lg font-medium mb-4">Escala</h3>
              <div className="logo-scale">
                <Logo size="md" showText={false} />
              </div>
            </div>
          </div>
        </section>

        {/* Sección de logos con badges */}
        <section className="mb-12">
          <h2 className="text-2xl font-semibold text-gray-700 mb-6">
            Logos con Badges
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-white p-6 rounded-lg shadow-md text-center">
              <h3 className="text-lg font-medium mb-4">Badge Azul</h3>
              <LogoWithBadge badgeColor="blue" badgeText="NUEVO" />
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-md text-center">
              <h3 className="text-lg font-medium mb-4">Badge Verde</h3>
              <LogoWithBadge badgeColor="green" badgeText="ACTIVO" />
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-md text-center">
              <h3 className="text-lg font-medium mb-4">Badge Púrpura</h3>
              <LogoWithBadge badgeColor="purple" badgeText="PREMIUM" />
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-md text-center">
              <h3 className="text-lg font-medium mb-4">Badge Amarillo</h3>
              <LogoWithBadge badgeColor="yellow" badgeText="HOT" />
            </div>
          </div>
        </section>

        {/* Sección de uso en diferentes contextos */}
        <section className="mb-12">
          <h2 className="text-2xl font-semibold text-gray-700 mb-6">
            Uso en Diferentes Contextos
          </h2>
          <div className="space-y-8">
            {/* Header simulado */}
            <div className="bg-gradient-to-r from-blue-500 to-blue-600 p-4 rounded-lg">
              <div className="flex items-center justify-between">
                <ResponsiveLogo />
                <button className="text-white px-4 py-2 bg-blue-400 rounded-lg hover:bg-blue-300 transition-colors">
                  Menú
                </button>
              </div>
            </div>
            
            {/* Card con logo */}
            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="flex items-center space-x-4 mb-4">
                <Logo size="sm" />
                <div>
                  <h3 className="text-xl font-semibold">Tarjeta de Ejemplo</h3>
                  <p className="text-gray-600">Con logo integrado</p>
                </div>
              </div>
              <p className="text-gray-700">
                Este es un ejemplo de cómo se vería el logo en una tarjeta de contenido.
              </p>
            </div>
            
            {/* Footer simulado */}
            <div className="bg-gray-800 p-6 rounded-lg">
              <div className="flex flex-col md:flex-row items-center justify-between">
                <ResponsiveLogo />
                <div className="text-gray-300 text-sm mt-4 md:mt-0">
                  © 2024 IGER Escuela Smart. Todos los derechos reservados.
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Información técnica */}
        <section className="mb-12">
          <h2 className="text-2xl font-semibold text-gray-700 mb-6">
            Información Técnica
          </h2>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 className="text-lg font-medium mb-3">Características</h3>
                <ul className="space-y-2 text-gray-600">
                  <li>• SVG escalable y nítido en cualquier tamaño</li>
                  <li>• Combinación creativa de Winnie the Pooh y Pingüino</li>
                  <li>• Colores corporativos azul y amarillo</li>
                  <li>• Animaciones suaves y atractivas</li>
                  <li>• Completamente responsivo</li>
                  <li>• Optimizado para web</li>
                </ul>
              </div>
              
              <div>
                <h3 className="text-lg font-medium mb-3">Tamaños Disponibles</h3>
                <ul className="space-y-2 text-gray-600">
                  <li>• <strong>sm:</strong> 32x32px (w-8 h-8)</li>
                  <li>• <strong>md:</strong> 48x48px (w-12 h-12)</li>
                  <li>• <strong>lg:</strong> 64x64px (w-16 h-16)</li>
                  <li>• <strong>xl:</strong> 96x96px (w-24 h-24)</li>
                  <li>• <strong>Responsive:</strong> Se adapta automáticamente</li>
                </ul>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};
