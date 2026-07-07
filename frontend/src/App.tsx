import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Layout from './components/layout/Layout'
import DashboardPage from './pages/DashboardPage'
import ForecastPage from './pages/ForecastPage'
import SuppliersPage from './pages/SuppliersPage'
import OrdersPage from './pages/OrdersPage'
import RiskPage from './pages/RiskPage'

export default function App() {
  return (
    <BrowserRouter basename={import.meta.env.BASE_URL}>
      <Routes>
        <Route element={<Layout />}>
          <Route index element={<DashboardPage />} />
          <Route path="forecast" element={<ForecastPage />} />
          <Route path="suppliers" element={<SuppliersPage />} />
          <Route path="orders" element={<OrdersPage />} />
          <Route path="risk" element={<RiskPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}
