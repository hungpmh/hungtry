import { useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import { getOrders, Order } from '../services/api'
import clsx from 'clsx'

export default function OrdersPage() {
  const [page, setPage] = useState(1)
  const [lateOnly, setLateOnly] = useState(false)

  const { data, isLoading } = useQuery({
    queryKey: ['orders', page, lateOnly],
    queryFn: () => getOrders({ page, page_size: 50, late_only: lateOnly }),
  })

  const totalPages = data ? Math.ceil(data.total / 50) : 1

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-white">Orders</h2>
        <p className="text-gray-400 text-sm mt-1">{data?.total.toLocaleString() ?? '—'} total orders</p>
      </div>

      <div className="flex items-center gap-4">
        <label className="flex items-center gap-2 text-sm text-gray-300 cursor-pointer">
          <input
            type="checkbox"
            checked={lateOnly}
            onChange={e => { setLateOnly(e.target.checked); setPage(1) }}
            className="rounded border-gray-600 bg-gray-800 text-blue-500"
          />
          Late deliveries only
        </label>
      </div>

      {isLoading ? (
        <div className="h-96 animate-pulse bg-gray-800 rounded-xl" />
      ) : (
        <div className="bg-gray-900 border border-gray-800 rounded-xl overflow-hidden">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-gray-800 text-left text-xs text-gray-400 uppercase tracking-wider">
                <th className="px-4 py-3">Order ID</th>
                <th className="px-4 py-3">Date</th>
                <th className="px-4 py-3">Category</th>
                <th className="px-4 py-3 hidden md:table-cell">Region</th>
                <th className="px-4 py-3 hidden lg:table-cell">Ship Mode</th>
                <th className="px-4 py-3">Sales</th>
                <th className="px-4 py-3">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-800">
              {data?.items.map((o: Order) => (
                <tr key={o.id} className="hover:bg-gray-800/50 transition-colors">
                  <td className="px-4 py-3 text-blue-400 font-mono text-xs">{o.order_id}</td>
                  <td className="px-4 py-3 text-gray-300 text-xs">{o.order_date}</td>
                  <td className="px-4 py-3 text-gray-200">{o.category_name}</td>
                  <td className="px-4 py-3 text-gray-400 hidden md:table-cell">{o.order_region}</td>
                  <td className="px-4 py-3 text-gray-400 hidden lg:table-cell">{o.shipping_mode}</td>
                  <td className="px-4 py-3 text-white">${o.sales.toFixed(0)}</td>
                  <td className="px-4 py-3">
                    <span className={clsx(
                      'px-2 py-0.5 rounded-full text-xs font-medium',
                      o.late_delivery_risk
                        ? 'bg-red-500/10 text-red-400'
                        : 'bg-green-500/10 text-green-400',
                    )}>
                      {o.late_delivery_risk ? 'Late Risk' : 'On Time'}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {/* Pagination */}
          <div className="flex items-center justify-between px-4 py-3 border-t border-gray-800">
            <span className="text-xs text-gray-500">Page {page} of {totalPages}</span>
            <div className="flex gap-2">
              <button onClick={() => setPage(p => Math.max(1, p - 1))} disabled={page === 1}
                className="px-3 py-1 text-xs bg-gray-800 rounded-lg disabled:opacity-40 hover:bg-gray-700">
                Prev
              </button>
              <button onClick={() => setPage(p => Math.min(totalPages, p + 1))}
                disabled={page === totalPages}
                className="px-3 py-1 text-xs bg-gray-800 rounded-lg disabled:opacity-40 hover:bg-gray-700">
                Next
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
