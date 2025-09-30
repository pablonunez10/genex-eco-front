import { useSearch } from "@tanstack/react-router";
import { products } from "@/data/products.data";
import { ProductCard } from "@/components/features";

const CATEGORY_NAMES: Record<string, string> = {
  phones: "Teléfonos",
  security: "Seguridad",
  electronics: "Electrónica",
};

export function HomePage() {
  const searchParams = useSearch({ strict: false }) as { category?: string };
  const category = searchParams?.category;

  // Filtrar productos por categoría
  const filteredProducts = category
    ? products.filter((product) => product.category === category)
    : products;

  const categoryTitle = category
    ? CATEGORY_NAMES[category] || "Productos"
    : "Todos los Productos";

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
          {/* <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-green-600 hover:bg-green-700 text-white font-semibold py-3 px-8 rounded-lg transition duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5">
              Comenzar
            </button>
            <button className="border-2 border-green-600 text-green-600 hover:bg-green-50 font-semibold py-3 px-8 rounded-lg transition duration-200">
              Saber más
            </button>
          </div> */}
        </div>

        {/* Features Section */}

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
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16">
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
            {categoryTitle}
          </h2>
          <p className="text-gray-600 mb-8">
            {filteredProducts.length}{" "}
            {filteredProducts.length === 1
              ? "producto disponible"
              : "productos disponibles"}
          </p>
        </div>

        {filteredProducts.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <svg
              className="w-24 h-24 mx-auto text-gray-400 mb-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4"
              />
            </svg>
            <h3 className="text-2xl font-bold text-gray-900 mb-2">
              No hay productos en esta categoría
            </h3>
            <p className="text-gray-600 mb-8">
              Intenta explorar otras categorías
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
