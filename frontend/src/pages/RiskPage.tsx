import { useState } from 'react'
import { useMutation } from '@tanstack/react-query'
import { predictRisk } from '../services/api'
import clsx from 'clsx'
import { AlertTriangle, CheckCircle } from 'lucide-react'

const SHIPPING_MODES = ['Standard Class', 'Second Class', 'First Class', 'Same Day']
const REGIONS = ['Western Europe', 'Central America', 'Oceania', 'Eastern Asia',
  'South America', 'Southeast Asia', 'West Asia', 'Eastern Europe',
  'West of USA', 'East of USA', 'Central Africa', 'North Africa', 'Southern Africa']
const CATEGORIES = ['Fishing', 'Cleats', 'Camping & Hiking', 'Cardio Equipment',
  'Women\'s Apparel', 'Water Sports', 'Men\'s Footwear', 'Indoor/Outdoor Games']
const MARKETS = ['Pacific Asia', 'LATAM', 'Europe', 'Africa', 'USCA']

const defaultForm = {
  shipping_mode: 'Standard Class',
  days_for_shipment_scheduled: 4,
  order_region: 'Western Europe',
  category_name: 'Fishing',
  market: 'Europe',
  quantity_ordered: 3,
  sales: 250,
  discount_rate: 0.05,
}

export default function RiskPage() {
  const [form, setForm] = useState(defaultForm)

  const { mutate, data, isPending } = useMutation({
    mutationFn: predictRisk,
  })

  const update = (key: string, value: string | number) =>
    setForm(f => ({ ...f, [key]: value }))

  return (
    <div className="space-y-6 max-w-2xl">
      <div>
        <h2 className="text-2xl font-bold text-white">Delivery Risk Checker</h2>
        <p className="text-gray-400 text-sm mt-1">XGBoost classifier — trained on 180k DataCo orders</p>
      </div>

      <div className="bg-gray-900 border border-gray-800 rounded-xl p-6 space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <label className="space-y-1">
            <span className="text-xs text-gray-400">Shipping Mode</span>
            <select value={form.shipping_mode} onChange={e => update('shipping_mode', e.target.value)}
              className="w-full bg-gray-800 border border-gray-700 text-white rounded-lg px-3 py-2 text-sm">
              {SHIPPING_MODES.map(m => <option key={m}>{m}</option>)}
            </select>
          </label>
          <label className="space-y-1">
            <span className="text-xs text-gray-400">Scheduled Days</span>
            <input type="number" value={form.days_for_shipment_scheduled}
              onChange={e => update('days_for_shipment_scheduled', Number(e.target.value))}
              className="w-full bg-gray-800 border border-gray-700 text-white rounded-lg px-3 py-2 text-sm" />
          </label>
          <label className="space-y-1">
            <span className="text-xs text-gray-400">Region</span>
            <select value={form.order_region} onChange={e => update('order_region', e.target.value)}
              className="w-full bg-gray-800 border border-gray-700 text-white rounded-lg px-3 py-2 text-sm">
              {REGIONS.map(r => <option key={r}>{r}</option>)}
            </select>
          </label>
          <label className="space-y-1">
            <span className="text-xs text-gray-400">Category</span>
            <select value={form.category_name} onChange={e => update('category_name', e.target.value)}
              className="w-full bg-gray-800 border border-gray-700 text-white rounded-lg px-3 py-2 text-sm">
              {CATEGORIES.map(c => <option key={c}>{c}</option>)}
            </select>
          </label>
          <label className="space-y-1">
            <span className="text-xs text-gray-400">Market</span>
            <select value={form.market} onChange={e => update('market', e.target.value)}
              className="w-full bg-gray-800 border border-gray-700 text-white rounded-lg px-3 py-2 text-sm">
              {MARKETS.map(m => <option key={m}>{m}</option>)}
            </select>
          </label>
          <label className="space-y-1">
            <span className="text-xs text-gray-400">Quantity</span>
            <input type="number" value={form.quantity_ordered}
              onChange={e => update('quantity_ordered', Number(e.target.value))}
              className="w-full bg-gray-800 border border-gray-700 text-white rounded-lg px-3 py-2 text-sm" />
          </label>
          <label className="space-y-1">
            <span className="text-xs text-gray-400">Sales ($)</span>
            <input type="number" value={form.sales}
              onChange={e => update('sales', Number(e.target.value))}
              className="w-full bg-gray-800 border border-gray-700 text-white rounded-lg px-3 py-2 text-sm" />
          </label>
          <label className="space-y-1">
            <span className="text-xs text-gray-400">Discount Rate (0–1)</span>
            <input type="number" step="0.01" min="0" max="1" value={form.discount_rate}
              onChange={e => update('discount_rate', Number(e.target.value))}
              className="w-full bg-gray-800 border border-gray-700 text-white rounded-lg px-3 py-2 text-sm" />
          </label>
        </div>

        <button
          onClick={() => mutate(form)}
          disabled={isPending}
          className="w-full bg-blue-600 hover:bg-blue-500 disabled:opacity-50 text-white font-semibold py-2.5 rounded-lg transition-colors"
        >
          {isPending ? 'Predicting…' : 'Predict Delivery Risk'}
        </button>
      </div>

      {data && (
        <div className={clsx(
          'border rounded-xl p-6 flex items-center gap-5',
          data.is_late
            ? 'bg-red-500/10 border-red-500/30'
            : 'bg-green-500/10 border-green-500/30',
        )}>
          {data.is_late
            ? <AlertTriangle size={40} className="text-red-400 shrink-0" />
            : <CheckCircle size={40} className="text-green-400 shrink-0" />}
          <div>
            <p className={clsx('text-2xl font-bold', data.is_late ? 'text-red-400' : 'text-green-400')}>
              {data.is_late ? 'High Late Risk' : 'Low Risk — On Track'}
            </p>
            <p className="text-gray-400 text-sm mt-1">
              Risk score: <span className="text-white font-semibold">{(data.risk_score * 100).toFixed(1)}%</span>
              {' · '}Confidence: <span className="text-white font-semibold">{(data.confidence * 100).toFixed(1)}%</span>
            </p>
          </div>
        </div>
      )}
    </div>
  )
}
