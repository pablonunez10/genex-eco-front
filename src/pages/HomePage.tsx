import { products } from '@/data/products.data'
import { ProductCard } from '@/components/features'

export function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-blue-50 to-emerald-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold text-gray-900 mb-6">
            Bienvenido a GenEx Eco
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Descubre soluciones sostenibles para un futuro más verde. Únete a
            nuestra misión de crear un mundo ambientalmente consciente a través
            de tecnología innovadora y acción comunitaria.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-green-600 hover:bg-green-700 text-white font-semibold py-3 px-8 rounded-lg transition duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5">
              Comenzar
            </button>
            <button className="border-2 border-green-600 text-green-600 hover:bg-green-50 font-semibold py-3 px-8 rounded-lg transition duration-200">
              Saber más
            </button>
          </div>
        </div>

        {/* Features Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          <div className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300">
            <div className="text-5xl mb-4">🌱</div>
            <h3 className="text-xl font-semibold mb-3 text-gray-900">
              Sostenibilidad
            </h3>
            <p className="text-gray-600">
              Soluciones eco-amigables para desafíos cotidianos
            </p>
          </div>
          <div className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300">
            <div className="text-5xl mb-4">🚀</div>
            <h3 className="text-xl font-semibold mb-3 text-gray-900">
              Innovación
            </h3>
            <p className="text-gray-600">
              Tecnología de vanguardia para el impacto ambiental
            </p>
          </div>
          <div className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300">
            <div className="text-5xl mb-4">🤝</div>
            <h3 className="text-xl font-semibold mb-3 text-gray-900">
              Comunidad
            </h3>
            <p className="text-gray-600">
              Construyendo una red de defensores ambientales
            </p>
          </div>
        </div>

        {/* Products Section */}
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-2">
            Productos Destacados
          </h2>
          <p className="text-gray-600 mb-8">
            Explora nuestra selección de productos de alta calidad
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </div>
  )
}