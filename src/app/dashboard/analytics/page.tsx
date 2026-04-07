'use client'

import {
  AreaChart, Area, BarChart, Bar, LineChart, Line,
  PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip,
  ResponsiveContainer, Legend
} from 'recharts'
import { TrendingUp, Users, Globe, MousePointer } from 'lucide-react'

const trafficData = [
  { date: 'Jan', visits: 12400, pageviews: 34200, users: 8100 },
  { date: 'Feb', visits: 15800, pageviews: 42000, users: 10200 },
  { date: 'Mar', visits: 14200, pageviews: 38600, users: 9400 },
  { date: 'Apr', visits: 18900, pageviews: 51000, users: 12300 },
  { date: 'May', visits: 22100, pageviews: 59400, users: 14800 },
  { date: 'Jun', visits: 26500, pageviews: 71000, users: 17600 },
  { date: 'Jul', visits: 24800, pageviews: 65000, users: 16200 },
  { date: 'Aug', visits: 29400, pageviews: 78000, users: 19800 },
  { date: 'Sep', visits: 31200, pageviews: 83000, users: 21100 },
  { date: 'Oct', visits: 34800, pageviews: 92000, users: 23400 },
  { date: 'Nov', visits: 38100, pageviews: 102000, users: 25700 },
  { date: 'Dec', visits: 42600, pageviews: 113000, users: 28900 },
]

const sourcesData = [
  { name: 'Organic Search', value: 38, color: '#6366f1' },
  { name: 'Direct', value: 24, color: '#a855f7' },
  { name: 'Social Media', value: 18, color: '#06b6d4' },
  { name: 'Referral', value: 12, color: '#f97316' },
  { name: 'Email', value: 8, color: '#22c55e' },
]

const conversionData = [
  { channel: 'Email', rate: 4.2 },
  { channel: 'Organic', rate: 2.8 },
  { channel: 'Social', rate: 1.9 },
  { channel: 'Paid', rate: 3.5 },
  { channel: 'Direct', rate: 2.1 },
  { channel: 'Referral', rate: 3.8 },
]

const userGrowthData = [
  { month: 'Jan', new: 820, returning: 1200 },
  { month: 'Feb', new: 1050, returning: 1580 },
  { month: 'Mar', new: 940, returning: 1420 },
  { month: 'Apr', new: 1380, returning: 1890 },
  { month: 'May', new: 1620, returning: 2210 },
  { month: 'Jun', new: 1980, returning: 2650 },
  { month: 'Jul', new: 1840, returning: 2480 },
  { month: 'Aug', new: 2150, returning: 2940 },
  { month: 'Sep', new: 2380, returning: 3120 },
  { month: 'Oct', new: 2740, returning: 3480 },
  { month: 'Nov', new: 3010, returning: 3810 },
  { month: 'Dec', new: 3360, returning: 4260 },
]

const tooltipStyle = {
  contentStyle: { background: '#1e293b', border: '1px solid #334155', borderRadius: '8px', color: '#f8fafc' }
}

export default function AnalyticsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-bold text-gray-900 dark:text-white">Analytics</h2>
        <p className="text-sm text-gray-500 dark:text-slate-400">Track performance and user engagement</p>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-2 xl:grid-cols-4 gap-4">
        {[
          { label: 'Total Visits', value: '310,800', change: '+18.4%', icon: Globe, color: 'text-indigo-500' },
          { label: 'Unique Users', value: '206,500', change: '+22.1%', icon: Users, color: 'text-purple-500' },
          { label: 'Avg. Session', value: '4m 32s', change: '+6.3%', icon: TrendingUp, color: 'text-cyan-500' },
          { label: 'Bounce Rate', value: '38.2%', change: '-3.1%', icon: MousePointer, color: 'text-orange-500' },
        ].map(({ label, value, change, icon: Icon, color }) => (
          <div key={label} className="bg-white dark:bg-slate-800 border border-gray-200 dark:border-slate-700 rounded-xl p-4">
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs text-gray-500 dark:text-slate-400">{label}</span>
              <Icon className={`w-4 h-4 ${color}`} />
            </div>
            <p className="text-xl font-bold text-gray-900 dark:text-white">{value}</p>
            <p className="text-xs text-green-500 mt-1">{change} <span className="text-gray-400 dark:text-slate-500">this year</span></p>
          </div>
        ))}
      </div>

      {/* Traffic Area Chart */}
      <div className="bg-white dark:bg-slate-800 border border-gray-200 dark:border-slate-700 rounded-xl p-6">
        <h3 className="font-semibold text-gray-900 dark:text-white mb-1">Website Traffic</h3>
        <p className="text-xs text-gray-500 dark:text-slate-400 mb-6">Monthly visits, pageviews, and unique users</p>
        <ResponsiveContainer width="100%" height={280}>
          <AreaChart data={trafficData}>
            <defs>
              <linearGradient id="visitsGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#6366f1" stopOpacity={0.3} />
                <stop offset="95%" stopColor="#6366f1" stopOpacity={0} />
              </linearGradient>
              <linearGradient id="pageviewsGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#06b6d4" stopOpacity={0.3} />
                <stop offset="95%" stopColor="#06b6d4" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="#334155" opacity={0.3} />
            <XAxis dataKey="date" tick={{ fill: '#94a3b8', fontSize: 12 }} axisLine={false} tickLine={false} />
            <YAxis tick={{ fill: '#94a3b8', fontSize: 12 }} axisLine={false} tickLine={false} tickFormatter={(v) => `${(v / 1000).toFixed(0)}k`} />
            <Tooltip {...tooltipStyle} formatter={(v) => [(v as number).toLocaleString(), '']} />
            <Legend />
            <Area type="monotone" dataKey="visits" stroke="#6366f1" fill="url(#visitsGrad)" strokeWidth={2} name="Visits" />
            <Area type="monotone" dataKey="pageviews" stroke="#06b6d4" fill="url(#pageviewsGrad)" strokeWidth={2} name="Pageviews" />
          </AreaChart>
        </ResponsiveContainer>
      </div>

      {/* Pie + Bar */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
        {/* Pie Chart */}
        <div className="bg-white dark:bg-slate-800 border border-gray-200 dark:border-slate-700 rounded-xl p-6">
          <h3 className="font-semibold text-gray-900 dark:text-white mb-1">Traffic Sources</h3>
          <p className="text-xs text-gray-500 dark:text-slate-400 mb-4">Breakdown by acquisition channel</p>
          <div className="flex items-center gap-6">
            <ResponsiveContainer width="50%" height={200}>
              <PieChart>
                <Pie
                  data={sourcesData}
                  cx="50%"
                  cy="50%"
                  innerRadius={50}
                  outerRadius={80}
                  dataKey="value"
                  strokeWidth={0}
                >
                  {sourcesData.map((entry, index) => (
                    <Cell key={index} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip {...tooltipStyle} formatter={(v) => [`${v as number}%`, '']} />
              </PieChart>
            </ResponsiveContainer>
            <div className="flex-1 space-y-2">
              {sourcesData.map((item) => (
                <div key={item.name} className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-2.5 h-2.5 rounded-full" style={{ background: item.color }} />
                    <span className="text-xs text-gray-600 dark:text-slate-300">{item.name}</span>
                  </div>
                  <span className="text-xs font-semibold text-gray-900 dark:text-white">{item.value}%</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Conversion Bar Chart */}
        <div className="bg-white dark:bg-slate-800 border border-gray-200 dark:border-slate-700 rounded-xl p-6">
          <h3 className="font-semibold text-gray-900 dark:text-white mb-1">Conversion Rates</h3>
          <p className="text-xs text-gray-500 dark:text-slate-400 mb-6">By acquisition channel (%)</p>
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={conversionData} barSize={20}>
              <CartesianGrid strokeDasharray="3 3" stroke="#334155" opacity={0.3} />
              <XAxis dataKey="channel" tick={{ fill: '#94a3b8', fontSize: 11 }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fill: '#94a3b8', fontSize: 11 }} axisLine={false} tickLine={false} tickFormatter={(v) => `${v}%`} />
              <Tooltip {...tooltipStyle} formatter={(v) => [`${v as number}%`, 'Rate']} />
              <Bar dataKey="rate" fill="#a855f7" radius={[4, 4, 0, 0]} name="Conversion Rate" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* User Growth Line Chart */}
      <div className="bg-white dark:bg-slate-800 border border-gray-200 dark:border-slate-700 rounded-xl p-6">
        <h3 className="font-semibold text-gray-900 dark:text-white mb-1">User Growth</h3>
        <p className="text-xs text-gray-500 dark:text-slate-400 mb-6">New vs returning users per month</p>
        <ResponsiveContainer width="100%" height={250}>
          <LineChart data={userGrowthData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#334155" opacity={0.3} />
            <XAxis dataKey="month" tick={{ fill: '#94a3b8', fontSize: 12 }} axisLine={false} tickLine={false} />
            <YAxis tick={{ fill: '#94a3b8', fontSize: 12 }} axisLine={false} tickLine={false} tickFormatter={(v) => `${(v / 1000).toFixed(1)}k`} />
            <Tooltip {...tooltipStyle} formatter={(v) => [(v as number).toLocaleString(), '']} />
            <Legend />
            <Line type="monotone" dataKey="new" stroke="#22c55e" strokeWidth={2} dot={false} name="New Users" />
            <Line type="monotone" dataKey="returning" stroke="#f97316" strokeWidth={2} dot={false} name="Returning Users" />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  )
}
