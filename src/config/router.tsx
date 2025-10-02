import {
  createRouter,
  createRoute,
  createRootRoute,
  Outlet,
  useMatchRoute,
} from '@tanstack/react-router'
import { TanStackRouterDevtools } from '@tanstack/router-devtools'
import { Header } from '@/components/layout'
import { HomePage, LoginPage, ForgotPasswordPage, CreateAccountPage, ProductDetailPage, CheckoutPage } from '@/pages'

const rootRoute = createRootRoute({
  component: () => {
    const matchRoute = useMatchRoute()
    const isLoginPage = matchRoute({ to: '/login' })
    const isForgotPasswordPage = matchRoute({ to: '/forgot-password' })
    const isCreateAccountPage = matchRoute({ to: '/create-account' })

    return (
      <>
        {!isLoginPage && !isForgotPasswordPage && !isCreateAccountPage && <Header />}
        <Outlet />
        <TanStackRouterDevtools />
      </>
    )
  },
})

const indexRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/',
  component: HomePage,
})

const loginRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/login',
  component: LoginPage,
})

const forgotPasswordRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/forgot-password',
  component: ForgotPasswordPage,
})

const createAccountRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/create-account',
  component: CreateAccountPage,
})

const productDetailRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/product/$productId',
  component: ProductDetailPage,
})

const checkoutRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/checkout',
  component: CheckoutPage,
})

const routeTree = rootRoute.addChildren([
  indexRoute,
  loginRoute,
  forgotPasswordRoute,
  createAccountRoute,
  productDetailRoute,
  checkoutRoute,
])

export const router = createRouter({ routeTree })

declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router
  }
}