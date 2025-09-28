# Logo IGER - Winnie the Pooh + Pingüino

## Descripción

El logo de IGER combina de manera creativa a Winnie the Pooh y un pingüino, creando una identidad visual única y memorable para la Escuela Smart. El diseño es completamente responsivo y optimizado para web.

## Características

- **SVG Escalable**: Vectorial, nítido en cualquier tamaño
- **Responsivo**: Se adapta automáticamente a diferentes pantallas
- **Animaciones**: Efectos suaves y atractivos
- **Colores Corporativos**: Azul (#1e40af) y amarillo (#fbbf24)
- **Accesible**: Cumple con estándares de accesibilidad web

## Componentes Disponibles

### Logo
Componente básico con diferentes tamaños predefinidos.

```tsx
import { Logo } from './components/ui/Logo';

// Diferentes tamaños
<Logo size="sm" />   // 32x32px
<Logo size="md" />   // 48x48px (default)
<Logo size="lg" />   // 64x64px
<Logo size="xl" />   // 96x96px

// Con o sin texto
<Logo showText={true} />   // Con texto (default)
<Logo showText={false} />  // Solo icono
```

### ResponsiveLogo
Componente optimizado para diferentes dispositivos.

```tsx
import { ResponsiveLogo } from './components/ui/ResponsiveLogo';

// Se adapta automáticamente al tamaño de pantalla
<ResponsiveLogo />
<ResponsiveLogo showText={false} />
```

## Propiedades

### Logo Props
- `size?: 'sm' | 'md' | 'lg' | 'xl'` - Tamaño del logo
- `className?: string` - Clases CSS adicionales
- `showText?: boolean` - Mostrar/ocultar texto (default: true)

### ResponsiveLogo Props
- `className?: string` - Clases CSS adicionales
- `showText?: boolean` - Mostrar/ocultar texto (default: true)

## Animaciones Disponibles

### Clases CSS
- `.logo-float` - Animación flotante suave
- `.logo-glow` - Efecto de brillo pulsante
- `.logo-bounce` - Animación de rebote
- `.logo-rotate` - Rotación continua
- `.logo-scale` - Escalado pulsante
- `.logo-hover` - Efecto hover con rebote
- `.logo-hover-glow` - Efecto hover con brillo

### Uso de Animaciones
```tsx
<div className="logo-float">
  <Logo size="md" showText={false} />
</div>

<div className="logo-glow logo-hover">
  <ResponsiveLogo />
</div>
```

## Tamaños Responsivos

| Pantalla | Tamaño del Icono | Tamaño del Texto |
|----------|------------------|------------------|
| Móvil    | 32x32px         | text-lg          |
| Tablet   | 40x40px         | text-xl          |
| Desktop  | 48x48px         | text-2xl         |
| Large    | 64x64px         | text-3xl         |

## Colores

### Paleta Principal
- **Azul Principal**: #1e40af (blue-600)
- **Azul Secundario**: #3b82f6 (blue-500)
- **Amarillo Principal**: #fbbf24 (yellow-400)
- **Amarillo Secundario**: #f59e0b (yellow-500)

### Colores del Logo
- **Winnie the Pooh**: #fbbf24 (amarillo)
- **Pingüino**: #1f2937 (gris oscuro)
- **Pico**: #f59e0b (amarillo)
- **Panza**: #ffffff (blanco)
- **Fondo**: Gradiente amarillo a naranja

## Uso en Diferentes Contextos

### Header/Navegación
```tsx
<div className="flex items-center space-x-3">
  <ResponsiveLogo />
  <nav>...</nav>
</div>
```

### Cards/Tarjetas
```tsx
<div className="flex items-center space-x-4">
  <Logo size="sm" />
  <div>
    <h3>Título</h3>
    <p>Descripción</p>
  </div>
</div>
```

### Footer
```tsx
<div className="flex flex-col md:flex-row items-center justify-between">
  <ResponsiveLogo />
  <p>© 2024 IGER Escuela Smart</p>
</div>
```

## Optimizaciones

### Rendimiento
- SVG optimizado para carga rápida
- Animaciones con `transform` y `opacity` para mejor rendimiento
- Lazy loading de animaciones complejas

### Accesibilidad
- Alt text descriptivo
- Contraste adecuado
- Animaciones respetan preferencias de movimiento reducido

### SEO
- Estructura semántica
- Meta tags apropiados
- Schema markup compatible

## Personalización

### Modificar Colores
```css
/* En tu archivo CSS */
.logo-custom {
  --logo-primary: #your-color;
  --logo-secondary: #your-color;
}
```

### Animaciones Personalizadas
```css
@keyframes customAnimation {
  0% { transform: scale(1); }
  50% { transform: scale(1.1); }
  100% { transform: scale(1); }
}

.logo-custom-animation {
  animation: customAnimation 2s ease-in-out infinite;
}
```

## Demostración

Para ver todas las variantes y animaciones del logo, accede a la sección "Demo Logo" en el panel de administrador.

## Mantenimiento

### Actualizaciones
- El logo se actualiza automáticamente en todos los componentes
- Las animaciones se pueden modificar en `src/styles/animations.css`
- Los colores se pueden ajustar en los componentes

### Compatibilidad
- Compatible con React 18+
- Funciona con Tailwind CSS
- Soporte para navegadores modernos (ES6+)

## Licencia

Este logo es propiedad de IGER Escuela Smart y está protegido por derechos de autor.
