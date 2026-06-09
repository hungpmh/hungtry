import { useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import { getForecast } from '../services/api'
import {
  AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer,
  ReferenceLine, CartesianGrid,
} from 'recharts'

const CATEGORIES = [
  'Fishing', 'Cleats', 'Camping & Hiking', 'Cardio Equipment',
  'Women\'s Apparel', 'Water Sports', 'Men\'s Footwear',
  'Indoor/Outdoor Games', 'Lacrosse', 'Tennis & Racquet',
]

export default function ForecastPage() {
  const [category, setCategory] = useState(CATEGORIES[0])
  const [periods, setPeriods] = useState(90)

  const { data, isLoading } = useQuery({
    queryKey: ['forecast', category, periods],
    queryFn: () => getForecast(category, periods),
  })

  const chartData = [
    ...(data?.historical.slice(-180) ?? []).map(p => ({
      date: p.ds, actual: p.yhat, lower: null, upper: null, type: 'hist',
    })),
    ...(data?.forecast ?? []).map(p => ({
      date: p.ds, forecast: p.yhat, lower: p.yhat_lower, upper: p.yhat_upper, type: 'future',
    })),
  ]

  const splitDate = data?.historical[data.historical.length - 1]?.ds

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-white">Demand Forecast</h2>
        <p className="text-gray-400 text-sm mt-1">
          Prophet time-series model · MAPE: {data ? `${(data.mape * 100).toFixed(1)}%` : '—'}
        </p>
      </div>

      <div className="flex gap-4">
        <select
          value={category}
          onChange={e => setCategory(e.target.value)}
          className="bg-gray-800 border border-gray-700 text-white rounded-lg px-3 py-2 text-sm"
        >
          {CATEGORIES.map(c => <option key={c}>{c}</option>)}
        </select>
        <select
          value={periods}
          onChange={e => setPeriods(Number(e.target.value))}
          className="bg-gray-800 border border-gray-700 text-white rounded-lg px-3 py-2 text-sm"
        >
          <option value={30}>30 days</option>
          <option value={90}>90 days</option>
          <option value={180}>180 days</option>
        </select>
      </div>

      <div className="bg-gray-900 border border-gray-800 rounded-xl p-5">
        {isLoading ? (
          <div className="h-80 animate-pulse bg-gray-800 rounded-lg" />
        ) : (
          <ResponsiveContainer width="100%" height={320}>
            <AreaChart data={chartData} margin={{ right: 20 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#1f2937" />
              <XAxis dataKey="date" tick={{ fill: '#9ca3af', fontSize: 11 }}
                tickFormatter={d => d.slice(0, 7)} interval={30} />
              <YAxis tick={{ fill: '#9ca3af', fontSize: 11 }}
                tickFormatter={v => `$${(v / 1000).toFixed(0)}k`} />
              <Tooltip
                contentStyle={{ background: '#111827', border: '1px solid #374151', borderRadius: 8 }}
                formatter={(v: number) => [`$${v?.toLocaleString()}`, '']}
              />
              {splitDate && (
                <ReferenceLine x={splitDate} stroke="#6b7280" strokeDasharray="4 4"
                  label={{ value: 'Forecast start', fill: '#9ca3af', fontSize: 11 }} />
              )}
              <Area type="monotone" dataKey="actual" stroke="#3b82f6" fill="#3b82f6"
                fillOpacity={0.15} strokeWidth={2} dot={false} name="Historical" />
              <Area type="monotone" dataKey="forecast" stroke="#22c55e" fill="#22c55e"
                fillOpacity={0.15} strokeWidth={2} dot={false} name="Forecast" />
              <Area type="monotone" dataKey="upper" stroke="transparent" fill="#22c55e"
                fillOpacity={0.05} dot={false} name="Upper bound" />
              <Area type="monotone" dataKey="lower" stroke="transparent" fill="#111827"
                fillOpacity={1} dot={false} name="Lower bound" />
            </AreaChart>
          </ResponsiveContainer>
        )}
      </div>
    </div>
  )
}
