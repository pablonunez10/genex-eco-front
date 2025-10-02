import { HashRouter, Routes, Route, Navigate, useLocation } from 'react-router-dom'
import { Header } from '@/components/layout'
import { ProtectedRoute } from '@/components/auth/ProtectedRoute'
import { HomePage, LoginPage, ForgotPasswordPage, CreateAccountPage, ProductDetailPage, CheckoutPage } from '@/pages'

function Layout() {
  const location = useLocation()
  const authPages = ['/login', '/forgot-password', '/create-account']
  const showHeader = !authPages.includes(location.pathname)

  return (
    <>
      {showHeader && <Header />}
      <Routes>
        <Route path="/" element={
          <ProtectedRoute>
            <HomePage />
          </ProtectedRoute>
        } />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/forgot-password" element={<ForgotPasswordPage />} />
        <Route path="/create-account" element={<CreateAccountPage />} />
        <Route path="/product/:productId" element={
          <ProtectedRoute>
            <ProductDetailPage />
          </ProtectedRoute>
        } />
        <Route path="/checkout" element={
          <ProtectedRoute>
            <CheckoutPage />
          </ProtectedRoute>
        } />
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    </>
  )
}

export function Router() {
  return (
    <HashRouter>
      <Layout />
    </HashRouter>
  )
}
