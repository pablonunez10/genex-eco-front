# 📁 Estructura del Proyecto GenEx Eco

## 🏗️ Arquitectura

Este proyecto sigue una arquitectura limpia y modular, organizando el código por funcionalidad y responsabilidad.

```
src/
├── types/              # 📝 Definiciones de tipos TypeScript
│   ├── product.types.ts
│   └── index.ts
│
├── data/               # 💾 Datos mock y constantes
│   └── products.data.ts
│
├── contexts/           # 🔄 Context API de React
│   └── CartContext.tsx
│
├── utils/              # 🛠️ Funciones utilitarias
│   ├── formatters.ts   # Formateo de precios y números
│   ├── financing.ts    # Cálculos de financiamiento
│   └── index.ts
│
├── hooks/              # 🪝 Custom React Hooks
│   └── (vacío por ahora)
│
├── components/         # 🧩 Componentes de UI
│   ├── features/       # Componentes de características específicas
│   │   ├── ProductCard.tsx
│   │   ├── CartSheet.tsx
│   │   ├── FinancingCalculator.tsx
│   │   └── index.ts
│   │
│   ├── layout/         # Componentes de layout
│   │   ├── Header.tsx
│   │   └── index.ts
│   │
│   └── ui/             # Componentes UI reutilizables
│       └── (vacío por ahora)
│
├── pages/              # 📄 Páginas de la aplicación
│   ├── HomePage.tsx
│   ├── LoginPage.tsx
│   └── index.ts
│
├── config/             # ⚙️ Configuración
│   └── router.tsx      # Configuración de rutas
│
├── main.tsx            # 🚀 Punto de entrada
└── index.css           # 🎨 Estilos globales
```

## 📋 Descripción de Carpetas

### `/types`
Contiene todas las definiciones de tipos e interfaces de TypeScript. Mantiene la consistencia de tipos en toda la aplicación.

**Archivos:**
- `product.types.ts`: Tipos relacionados con productos, carrito y financiamiento
- `index.ts`: Barrel export para fácil importación

### `/data`
Almacena datos mock, constantes y configuraciones estáticas.

**Archivos:**
- `products.data.ts`: Lista de productos de ejemplo

### `/contexts`
Implementaciones de Context API para manejo de estado global.

**Archivos:**
- `CartContext.tsx`: Gestión del carrito de compras

### `/utils`
Funciones utilitarias puras y helpers reutilizables.

**Archivos:**
- `formatters.ts`: Funciones de formateo (precios, números)
- `financing.ts`: Lógica de cálculo de financiamiento
- `index.ts`: Barrel export

### `/components`
Componentes de React organizados por responsabilidad:

#### `/components/features`
Componentes específicos de funcionalidades del negocio.
- `ProductCard.tsx`: Tarjeta de producto con "agregar al carrito"
- `CartSheet.tsx`: Panel lateral del carrito de compras
- `FinancingCalculator.tsx`: Calculadora de cuotas

#### `/components/layout`
Componentes de estructura y navegación.
- `Header.tsx`: Barra de navegación con carrito

#### `/components/ui`
Componentes UI genéricos y reutilizables (buttons, inputs, etc.)

### `/pages`
Componentes de página que representan rutas completas.

**Archivos:**
- `HomePage.tsx`: Página principal con productos
- `LoginPage.tsx`: Página de inicio de sesión

### `/config`
Archivos de configuración de la aplicación.

**Archivos:**
- `router.tsx`: Configuración de TanStack Router

## 🎯 Convenciones de Código

### Imports
Usa el alias `@/` para importar desde `src/`:

```typescript
import { Product } from '@/types'
import { formatPrice } from '@/utils'
import { ProductCard } from '@/components/features'
```

### Nombres de Archivos
- Componentes: `PascalCase.tsx` (ej: `ProductCard.tsx`)
- Utilidades: `camelCase.ts` (ej: `formatters.ts`)
- Tipos: `camelCase.types.ts` (ej: `product.types.ts`)
- Datos: `camelCase.data.ts` (ej: `products.data.ts`)

### Exports
Cada carpeta tiene un `index.ts` para barrel exports:

```typescript
// components/features/index.ts
export { ProductCard } from './ProductCard'
export { CartSheet } from './CartSheet'
```

## 🚀 Comandos

```bash
# Desarrollo
npm run dev

# Build para producción
npm run build

# Preview de producción
npm run preview
```

## 🔧 Configuración

### Path Aliases
Configurado en `tsconfig.app.json` y `vite.config.ts`:
- `@/*` apunta a `./src/*`

### Tailwind CSS
Configurado en `tailwind.config.js` con el plugin oficial de Vite.

## 📦 Tecnologías

- **React 18** - UI Library
- **TypeScript** - Type Safety
- **TanStack Router** - Routing
- **Tailwind CSS** - Styling
- **Vite** - Build Tool

## 🎨 Patrones de Diseño

### Separación de Responsabilidades
Cada carpeta tiene una responsabilidad clara y única.

### Composición sobre Herencia
Los componentes se componen de otros componentes más pequeños.

### Single Source of Truth
Los tipos y datos viven en ubicaciones centralizadas.

### DRY (Don't Repeat Yourself)
Las utilidades comunes se extraen a `/utils`.

## 📝 Notas

- El carrito de compras usa Context API para estado global
- Las rutas están tipadas con TanStack Router
- Todos los precios se formatean en Guaraníes (PYG)
- El proyecto usa ESLint y TypeScript strict mode