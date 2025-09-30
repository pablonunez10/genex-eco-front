import { createRouter, createRoute, createRootRoute, Outlet, Link } from '@tanstack/react-router'
import { TanStackRouterDevtools } from '@tanstack/router-devtools'
import Home from './components/Home'
import Login from './components/Login'

const rootRoute = createRootRoute({
  component: () => (
    <>
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <span className="text-xl font-bold text-green-600">GenEx Eco</span>
            </div>
            <nav className="flex items-center space-x-8">
              <Link to="/" className="text-gray-700 hover:text-green-600 font-medium [&.active]:text-green-600">
                Home
              </Link>
              <Link to="/login" className="text-gray-700 hover:text-green-600 font-medium [&.active]:text-green-600">
                Login
              </Link>
            </nav>
          </div>
        </div>
      </div>
      <Outlet />
      <TanStackRouterDevtools />
    </>
  ),
})

const indexRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/',
  component: Home,
})

const loginRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/login',
  component: Login,
})

const routeTree = rootRoute.addChildren([indexRoute, loginRoute])

export const router = createRouter({ routeTree })

declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router
  }
}