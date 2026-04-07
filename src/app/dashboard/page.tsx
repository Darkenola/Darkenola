'use client'

import {
  AreaChart, Area, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend
} from 'recharts'
import { Users, DollarSign, ShoppingCart, TrendingUp, Activity } from 'lucide-react'
import StatsCard from '@/components/StatsCard'

const revenueData = [
  { month: 'Jan', revenue: 32000, expenses: 18000 },
  { month: 'Feb', revenue: 38000, expenses: 21000 },
  { month: 'Mar', revenue: 35000, expenses: 19000 },
  { month: 'Apr', revenue: 47000, expenses: 24000 },
  { month: 'May', revenue: 52000, expenses: 27000 },
  { month: 'Jun', revenue: 61000, expenses: 29000 },
  { month: 'Jul', revenue: 58000, expenses: 31000 },
  { month: 'Aug', revenue: 67000, expenses: 33000 },
  { month: 'Sep', revenue: 72000, expenses: 35000 },
  { month: 'Oct', revenue: 78000, expenses: 38000 },
  { month: 'Nov', revenue: 85000, expenses: 40000 },
  { month: 'Dec', revenue: 91000, expenses: 43000 },
]

const ordersData = [
  { day: 'Mon', orders: 145 },
  { day: 'Tue', orders: 178 },
  { day: 'Wed', orders: 162 },
  { day: 'Thu', orders: 195 },
  { day: 'Fri', orders: 234 },
  { day: 'Sat', orders: 280 },
  { day: 'Sun', orders: 198 },
]

const recentActivity = [
  { id: 1, user: 'Alice Johnson', action: 'Placed a new order', time: '2 min ago', type: 'order' },
  { id: 2, user: 'Bob Smith', action: 'Updated profile', time: '5 min ago', type: 'user' },
  { id: 3, user: 'Carol White', action: 'Submitted support ticket', time: '12 min ago', type: 'support' },
  { id: 4, user: 'David Brown', action: 'Completed payment', time: '25 min ago', type: 'payment' },
  { id: 5, user: 'Eva Green', action: 'Registered new account', time: '1 hr ago', type: 'user' },
]

const typeColors: Record<string, string> = {
  order: 'bg-blue-500/10 text-blue-500',
  user: 'bg-green-500/10 text-green-500',
  support: 'bg-orange-500/10 text-orange-500',
  payment: 'bg-purple-500/10 text-purple-500',
}

export default function DashboardPage() {
  return (
    <div className="space-y-6">
      {/* Welcome */}
      <div>
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Welcome back, Admin! 👋</h2>
        <p className="text-gray-500 dark:text-slate-400 text-sm mt-1">Here&apos;s what&apos;s happening today.</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
        <StatsCard title="Total Users" value="24,521" change="12.5%" positive icon={Users} color="indigo" />
        <StatsCard title="Revenue" value="$91,240" change="8.2%" positive icon={DollarSign} color="green" />
        <StatsCard title="Orders" value="3,842" change="5.1%" positive icon={ShoppingCart} color="orange" />
        <StatsCard title="Growth" value="18.7%" change="3.4%" positive icon={TrendingUp} color="purple" />
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        {/* Area Chart */}
        <div className="xl:col-span-2 bg-white dark:bg-slate-800 border border-gray-200 dark:border-slate-700 rounded-xl p-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="font-semibold text-gray-900 dark:text-white">Revenue Overview</h3>
              <p className="text-xs text-gray-500 dark:text-slate-400 mt-0.5">Monthly revenue vs expenses</p>
            </div>
            <Activity className="w-5 h-5 text-indigo-500" />
          </div>
          <ResponsiveContainer width="100%" height={250}>
            <AreaChart data={revenueData}>
              <defs>
                <linearGradient id="revenueGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#6366f1" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="#6366f1" stopOpacity={0} />
                </linearGradient>
                <linearGradient id="expensesGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#a855f7" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="#a855f7" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#334155" opacity={0.3} />
              <XAxis dataKey="month" tick={{ fill: '#94a3b8', fontSize: 12 }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fill: '#94a3b8', fontSize: 12 }} axisLine={false} tickLine={false} tickFormatter={(v) => `$${(v/1000).toFixed(0)}k`} />
              <Tooltip
                contentStyle={{ background: '#1e293b', border: '1px solid #334155', borderRadius: '8px', color: '#f8fafc' }}
                formatter={(v) => [`$${(v as number).toLocaleString()}`, '']}
              />
              <Legend />
              <Area type="monotone" dataKey="revenue" stroke="#6366f1" fill="url(#revenueGrad)" strokeWidth={2} name="Revenue" />
              <Area type="monotone" dataKey="expenses" stroke="#a855f7" fill="url(#expensesGrad)" strokeWidth={2} name="Expenses" />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        {/* Bar Chart */}
        <div className="bg-white dark:bg-slate-800 border border-gray-200 dark:border-slate-700 rounded-xl p-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="font-semibold text-gray-900 dark:text-white">Weekly Orders</h3>
              <p className="text-xs text-gray-500 dark:text-slate-400 mt-0.5">Orders per day this week</p>
            </div>
            <ShoppingCart className="w-5 h-5 text-orange-500" />
          </div>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={ordersData} barSize={24}>
              <CartesianGrid strokeDasharray="3 3" stroke="#334155" opacity={0.3} />
              <XAxis dataKey="day" tick={{ fill: '#94a3b8', fontSize: 12 }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fill: '#94a3b8', fontSize: 12 }} axisLine={false} tickLine={false} />
              <Tooltip
                contentStyle={{ background: '#1e293b', border: '1px solid #334155', borderRadius: '8px', color: '#f8fafc' }}
              />
              <Bar dataKey="orders" fill="#f97316" radius={[4, 4, 0, 0]} name="Orders" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="bg-white dark:bg-slate-800 border border-gray-200 dark:border-slate-700 rounded-xl p-6">
        <h3 className="font-semibold text-gray-900 dark:text-white mb-4">Recent Activity</h3>
        <div className="space-y-3">
          {recentActivity.map((item) => (
            <div key={item.id} className="flex items-center gap-4 py-2">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0 ${typeColors[item.type]}`}>
                {item.user.charAt(0)}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-gray-900 dark:text-white">{item.user}</p>
                <p className="text-xs text-gray-500 dark:text-slate-400">{item.action}</p>
              </div>
              <span className="text-xs text-gray-400 dark:text-slate-500 flex-shrink-0">{item.time}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
