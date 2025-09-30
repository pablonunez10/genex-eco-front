import type { Product } from '@/types'

export const products: Product[] = [
  // Teléfonos
  {
    id: '1',
    name: 'Samsung Galaxy S23',
    description:
      'Smartphone premium con pantalla AMOLED de 6.1 pulgadas, procesador Snapdragon 8 Gen 2, 8GB RAM, 256GB almacenamiento interno, cámara triple de 50MP + 12MP + 10MP, batería de 3900mAh con carga rápida. Sistema operativo Android 13.',
    price: 6200000,
    image: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=500&h=500&fit=crop',
    category: 'phones',
    stock: 23,
  },
  {
    id: '2',
    name: 'iPhone 14 Pro',
    description:
      'iPhone 14 Pro con Dynamic Island, pantalla Super Retina XDR de 6.1", chip A16 Bionic, cámara principal de 48MP, grabación de video 4K, 256GB almacenamiento. Incluye cargador rápido y cable USB-C.',
    price: 9500000,
    image: 'https://images.unsplash.com/photo-1678652197831-2d180705cd2c?w=500&h=500&fit=crop',
    category: 'phones',
    stock: 15,
  },
  {
    id: '3',
    name: 'Xiaomi Redmi Note 12',
    description:
      'Smartphone con pantalla AMOLED de 6.67", procesador Snapdragon 685, 6GB RAM, 128GB almacenamiento, cámara principal de 50MP, batería de 5000mAh con carga rápida de 33W. Excelente relación calidad-precio.',
    price: 2800000,
    image: 'https://images.unsplash.com/photo-1598327105666-5b89351aff97?w=500&h=500&fit=crop',
    category: 'phones',
    stock: 30,
  },

  // Seguridad
  {
    id: '4',
    name: 'Kit de Cámaras de Seguridad 4K',
    description:
      'Sistema completo de vigilancia con 4 cámaras 4K, visión nocturna hasta 30m, detección de movimiento, grabación en la nube, acceso remoto vía app móvil, DVR de 1TB incluido. Resistente al agua IP67.',
    price: 4500000,
    image: 'https://images.unsplash.com/photo-1557324232-b8917d3c3dcb?w=500&h=500&fit=crop',
    category: 'security',
    stock: 12,
  },
  {
    id: '5',
    name: 'Cerradura Inteligente Biométrica',
    description:
      'Cerradura digital con huella dactilar, código PIN, tarjeta RFID y llave mecánica de respaldo. Batería de larga duración, alarma anti-manipulación, app móvil para gestión remota. Fácil instalación.',
    price: 1800000,
    image: 'https://images.unsplash.com/photo-1558002038-1055907df827?w=500&h=500&fit=crop',
    category: 'security',
    stock: 20,
  },
  {
    id: '6',
    name: 'Alarma para Casa WiFi',
    description:
      'Sistema de alarma inteligente con sensores de puertas/ventanas, detector de movimiento PIR, sirena de 110dB, notificaciones push instantáneas, compatible con Alexa y Google Home. Kit completo.',
    price: 2200000,
    image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=500&h=500&fit=crop',
    category: 'security',
    stock: 18,
  },

  // Electrónica
  {
    id: '7',
    name: 'Notebook HP Pavilion 15',
    description:
      'Laptop de alto rendimiento con procesador Intel Core i7 de 11va generación, 16GB RAM DDR4, SSD 512GB NVMe, pantalla Full HD de 15.6 pulgadas, tarjeta gráfica NVIDIA GeForce MX450. Ideal para trabajo, estudio y entretenimiento.',
    price: 8500000,
    image: 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=500&h=500&fit=crop',
    category: 'electronics',
    stock: 15,
  },
  {
    id: '8',
    name: 'Tablet Samsung Galaxy Tab S8',
    description:
      'Tablet premium con pantalla LCD de 11", procesador Snapdragon 8 Gen 1, 8GB RAM, 128GB almacenamiento, S Pen incluido, cámaras duales, batería de 8000mAh. Perfecta para productividad y entretenimiento.',
    price: 5200000,
    image: 'https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=500&h=500&fit=crop',
    category: 'electronics',
    stock: 10,
  },
  {
    id: '9',
    name: 'Auriculares Sony WH-1000XM5',
    description:
      'Auriculares inalámbricos premium con cancelación de ruido líder en la industria, audio de alta resolución, 30 horas de batería, carga rápida, multipunto Bluetooth, controles táctiles. Comodidad excepcional.',
    price: 3200000,
    image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500&h=500&fit=crop',
    category: 'electronics',
    stock: 25,
  },
]