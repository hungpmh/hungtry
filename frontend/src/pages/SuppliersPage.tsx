import { useQuery } from '@tanstack/react-query'
import { getSuppliers, Supplier } from '../services/api'
import clsx from 'clsx'

function ScoreBadge({ score }: { score: number }) {
  const color = score >= 75 ? 'text-green-400 bg-green-500/10'
    : score >= 50 ? 'text-yellow-400 bg-yellow-500/10'
    : 'text-red-400 bg-red-500/10'
  return (
    <span className={clsx('px-2 py-0.5 rounded-full text-xs font-semibold', color)}>
      {score.toFixed(1)}
    </span>
  )
}

function Bar({ value, max = 100, color }: { value: number; max?: number; color: string }) {
  return (
    <div className="flex items-center gap-2">
      <div className="flex-1 bg-gray-800 rounded-full h-1.5">
        <div className={clsx('h-1.5 rounded-full', color)}
          style={{ width: `${Math.min((value / max) * 100, 100)}%` }} />
      </div>
      <span className="text-xs text-gray-400 w-10 text-right">{(value * 100).toFixed(0)}%</span>
    </div>
  )
}

export default function SuppliersPage() {
  const { data, isLoading } = useQuery({
    queryKey: ['suppliers'],
    queryFn: () => getSuppliers(),
  })

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-white">Supplier Scorecard</h2>
        <p className="text-gray-400 text-sm mt-1">Ranked by composite performance score (on-time × fill rate × profit margin)</p>
      </div>

      {isLoading ? (
        <div className="h-96 animate-pulse bg-gray-800 rounded-xl" />
      ) : (
        <div className="bg-gray-900 border border-gray-800 rounded-xl overflow-hidden">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-gray-800 text-left text-xs text-gray-400 uppercase tracking-wider">
                <th className="px-4 py-3">Supplier</th>
                <th className="px-4 py-3">Market</th>
                <th className="px-4 py-3">Orders</th>
                <th className="px-4 py-3 hidden md:table-cell">On-Time Rate</th>
                <th className="px-4 py-3 hidden lg:table-cell">Fill Rate</th>
                <th className="px-4 py-3 hidden lg:table-cell">Avg Lead Time</th>
                <th className="px-4 py-3">Score</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-800">
              {data?.map((s: Supplier) => (
                <tr key={s.id} className="hover:bg-gray-800/50 transition-colors">
                  <td className="px-4 py-3">
                    <div className="font-medium text-white">{s.name}</div>
                    <div className="text-xs text-gray-500">{s.category}</div>
                  </td>
                  <td className="px-4 py-3 text-gray-300">{s.market}</td>
                  <td className="px-4 py-3 text-gray-300">{s.total_orders.toLocaleString()}</td>
                  <td className="px-4 py-3 hidden md:table-cell w-36">
                    <Bar value={s.on_time_rate} color="bg-blue-500" />
                  </td>
                  <td className="px-4 py-3 hidden lg:table-cell w-36">
                    <Bar value={s.fill_rate} color="bg-purple-500" />
                  </td>
                  <td className="px-4 py-3 hidden lg:table-cell text-gray-300">
                    {s.avg_lead_time.toFixed(1)}d
                  </td>
                  <td className="px-4 py-3">
                    <ScoreBadge score={s.performance_score} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  )
}
