import { LucideIcon } from 'lucide-react'
import { clsx } from 'clsx'

interface StatsCardProps {
  title: string
  value: string
  change: string
  positive: boolean
  icon: LucideIcon
  color: 'indigo' | 'green' | 'orange' | 'purple'
}

const colorMap = {
  indigo: 'bg-indigo-500/10 text-indigo-500 dark:bg-indigo-500/20',
  green: 'bg-green-500/10 text-green-500 dark:bg-green-500/20',
  orange: 'bg-orange-500/10 text-orange-500 dark:bg-orange-500/20',
  purple: 'bg-purple-500/10 text-purple-500 dark:bg-purple-500/20',
}

export default function StatsCard({ title, value, change, positive, icon: Icon, color }: StatsCardProps) {
  return (
    <div className="bg-white dark:bg-slate-800 border border-gray-200 dark:border-slate-700 rounded-xl p-6 flex items-center gap-4 hover:shadow-lg dark:hover:shadow-slate-900/50 transition-shadow">
      <div className={clsx('w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0', colorMap[color])}>
        <Icon className="w-6 h-6" />
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-sm text-gray-500 dark:text-slate-400 truncate">{title}</p>
        <p className="text-2xl font-bold text-gray-900 dark:text-white mt-0.5">{value}</p>
        <p className={clsx('text-xs mt-1', positive ? 'text-green-500' : 'text-red-500')}>
          {positive ? '↑' : '↓'} {change} <span className="text-gray-400 dark:text-slate-500">vs last month</span>
        </p>
      </div>
    </div>
  )
}
