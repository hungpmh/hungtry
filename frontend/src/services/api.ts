import axios from 'axios'

const api = axios.create({
  baseURL: '/api/v1',
  headers: { 'Content-Type': 'application/json' },
})

export interface KPISummary {
  total_orders: number
  total_revenue: number
  avg_profit_margin: number
  late_delivery_rate: number
  on_time_rate: number
  avg_days_late: number
}

export interface CategoryRevenue {
  category: string
  revenue: number
  orders: number
  profit: number
}

export interface RegionMetrics {
  region: string
  orders: number
  revenue: number
  late_rate: number
}

export interface ForecastPoint {
  ds: string
  yhat: number
  yhat_lower: number
  yhat_upper: number
}

export interface ForecastResponse {
  historical: ForecastPoint[]
  forecast: ForecastPoint[]
  category: string
  mape: number
}

export interface Supplier {
  id: number
  name: string
  category: string
  market: string
  total_orders: number
  late_orders: number
  on_time_rate: number
  avg_lead_time: number
  total_revenue: number
  avg_profit_margin: number
  fill_rate: number
  performance_score: number
}

export interface Order {
  id: number
  order_id: number
  order_date: string
  order_status: string
  product_name: string
  category_name: string
  customer_segment: string
  market: string
  order_region: string
  shipping_mode: string
  days_for_shipping_real: number
  days_for_shipment_scheduled: number
  late_delivery_risk: boolean
  delivery_status: string
  quantity_ordered: number
  sales: number
  order_profit_per_order: number
  risk_score: number | null
}

export const getKPISummary = () =>
  api.get<KPISummary>('/kpis/summary').then(r => r.data)

export const getCategoryRevenue = () =>
  api.get<CategoryRevenue[]>('/kpis/categories').then(r => r.data)

export const getRegionMetrics = () =>
  api.get<RegionMetrics[]>('/kpis/regions').then(r => r.data)

export const getForecast = (category?: string, periods = 90) =>
  api.get<ForecastResponse>('/forecast/demand', {
    params: { category, periods },
  }).then(r => r.data)

export const getSuppliers = (market?: string) =>
  api.get<Supplier[]>('/suppliers/', { params: { market } }).then(r => r.data)

export const getOrders = (params: Record<string, unknown>) =>
  api.get<{ total: number; page: number; page_size: number; items: Order[] }>(
    '/orders/', { params }
  ).then(r => r.data)

export const predictRisk = (payload: Record<string, unknown>) =>
  api.post<{ risk_score: number; is_late: boolean; confidence: number }>(
    '/risk/predict', payload
  ).then(r => r.data)
