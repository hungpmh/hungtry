import {
  RadarChart, Radar, PolarGrid, PolarAngleAxis, PolarRadiusAxis,
  ResponsiveContainer, Tooltip,
} from 'recharts'
import { useQuery } from '@tanstack/react-query'
import { getRegionMetrics } from '../../services/api'

export default function RegionLateRate() {
  const { data, isLoading } = useQuery({
    queryKey: ['region-metrics'],
    queryFn: getRegionMetrics,
  })

  if (isLoading) return <div className="h-64 animate-pulse bg-gray-800 rounded-xl" />

  const chartData = data?.map(r => ({
    region: r.region.replace('Western Europe', 'W. Europe')
              .replace('Eastern Europe', 'E. Europe')
              .replace('South America', 'S. America')
              .replace('Southeast Asia', 'SE Asia'),
    late_rate: r.late_rate,
  }))

  return (
    <div className="bg-gray-900 border border-gray-800 rounded-xl p-5">
      <h3 className="text-sm font-semibold text-gray-300 mb-4">Late Delivery Rate by Region (%)</h3>
      <ResponsiveContainer width="100%" height={240}>
        <RadarChart data={chartData}>
          <PolarGrid stroke="#374151" />
          <PolarAngleAxis dataKey="region" tick={{ fill: '#9ca3af', fontSize: 10 }} />
          <PolarRadiusAxis tick={{ fill: '#6b7280', fontSize: 10 }} />
          <Radar dataKey="late_rate" stroke="#f43f5e" fill="#f43f5e" fillOpacity={0.2} />
          <Tooltip
            contentStyle={{ background: '#111827', border: '1px solid #374151', borderRadius: 8 }}
            formatter={(v: number) => [`${v}%`, 'Late Rate']}
          />
        </RadarChart>
      </ResponsiveContainer>
    </div>
  )
}
