import type { Product } from '@/types'

export const products: Product[] = [
  {
    id: '1',
    name: 'Notebook HP Pavilion 15',
    description:
      'Laptop de alto rendimiento con procesador Intel Core i7 de 11va generación, 16GB RAM DDR4, SSD 512GB NVMe, pantalla Full HD de 15.6 pulgadas, tarjeta gráfica NVIDIA GeForce MX450. Ideal para trabajo, estudio y entretenimiento.',
    price: 8500000,
    image: 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=500&h=500&fit=crop',
    category: 'Electrónica',
    stock: 15,
  },
  {
    id: '2',
    name: 'Samsung Galaxy S23',
    description:
      'Smartphone premium con pantalla AMOLED de 6.1 pulgadas, procesador Snapdragon 8 Gen 2, 8GB RAM, 256GB almacenamiento interno, cámara triple de 50MP + 12MP + 10MP, batería de 3900mAh con carga rápida. Sistema operativo Android 13.',
    price: 6200000,
    image: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=500&h=500&fit=crop',
    category: 'Celulares',
    stock: 23,
  },
]