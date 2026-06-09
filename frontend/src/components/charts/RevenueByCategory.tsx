import {
  BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell,
} from 'recharts'
import { useQuery } from '@tanstack/react-query'
import { getCategoryRevenue } from '../../services/api'

const COLORS = ['#3b82f6', '#6366f1', '#8b5cf6', '#a855f7', '#ec4899',
                '#f43f5e', '#f97316', '#eab308', '#22c55e', '#14b8a6']

export default function RevenueByCategory() {
  const { data, isLoading } = useQuery({
    queryKey: ['category-revenue'],
    queryFn: getCategoryRevenue,
  })

  if (isLoading) return <div className="h-64 animate-pulse bg-gray-800 rounded-xl" />

  return (
    <div className="bg-gray-900 border border-gray-800 rounded-xl p-5">
      <h3 className="text-sm font-semibold text-gray-300 mb-4">Revenue by Category</h3>
      <ResponsiveContainer width="100%" height={240}>
        <BarChart data={data} layout="vertical" margin={{ left: 20, right: 20 }}>
          <XAxis type="number" tick={{ fill: '#9ca3af', fontSize: 11 }}
            tickFormatter={v => `$${(v / 1000).toFixed(0)}k`} />
          <YAxis type="category" dataKey="category" tick={{ fill: '#9ca3af', fontSize: 11 }}
            width={120} />
          <Tooltip
            contentStyle={{ background: '#111827', border: '1px solid #374151', borderRadius: 8 }}
            formatter={(v: number) => [`$${v.toLocaleString()}`, 'Revenue']}
          />
          <Bar dataKey="revenue" radius={[0, 4, 4, 0]}>
            {data?.map((_, i) => <Cell key={i} fill={COLORS[i % COLORS.length]} />)}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  )
}
