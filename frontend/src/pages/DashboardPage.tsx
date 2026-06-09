import { useQuery } from '@tanstack/react-query'
import { getKPISummary } from '../services/api'
import KPICard from '../components/dashboard/KPICard'
import RevenueByCategory from '../components/charts/RevenueByCategory'
import RegionLateRate from '../components/charts/RegionLateRate'
import {
  ShoppingCart, DollarSign, TrendingUp, AlertTriangle, CheckCircle, Clock,
} from 'lucide-react'

export default function DashboardPage() {
  const { data, isLoading } = useQuery({
    queryKey: ['kpi-summary'],
    queryFn: getKPISummary,
  })

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-white">Supply Chain Overview</h2>
        <p className="text-gray-400 text-sm mt-1">DataCo Smart Supply Chain Dataset · 180k+ orders</p>
      </div>

      {/* KPI Row */}
      <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
        <KPICard
          title="Total Orders"
          value={isLoading ? '—' : (data?.total_orders ?? 0).toLocaleString()}
          icon={ShoppingCart}
          color="blue"
        />
        <KPICard
          title="Total Revenue"
          value={isLoading ? '—' : `$${((data?.total_revenue ?? 0) / 1_000_000).toFixed(1)}M`}
          icon={DollarSign}
          color="green"
        />
        <KPICard
          title="Avg Profit Margin"
          value={isLoading ? '—' : `${data?.avg_profit_margin ?? 0}%`}
          icon={TrendingUp}
          color="blue"
        />
        <KPICard
          title="Late Delivery Rate"
          value={isLoading ? '—' : `${data?.late_delivery_rate ?? 0}%`}
          subtitle="% of orders delayed"
          icon={AlertTriangle}
          color="red"
        />
        <KPICard
          title="On-Time Rate"
          value={isLoading ? '—' : `${data?.on_time_rate ?? 0}%`}
          icon={CheckCircle}
          color="green"
        />
        <KPICard
          title="Avg Days Late"
          value={isLoading ? '—' : `${data?.avg_days_late ?? 0}d`}
          subtitle="when delayed"
          icon={Clock}
          color="yellow"
        />
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <RevenueByCategory />
        <RegionLateRate />
      </div>
    </div>
  )
}
