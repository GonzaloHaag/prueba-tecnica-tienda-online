import { TrendingDown, TrendingUp } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card"

interface MetricCardProps {
    title: string
    value: string | number
    icon: React.ReactNode
    trend?: {
      value: number
      isPositive: boolean
    }
    className?: string
  }
  
export const MetricCard = ({ title, value, icon, trend, className = "" }: MetricCardProps) => {
    return (
      <Card className={`${className}`}>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium text-muted-foreground">{title}</CardTitle>
          {icon}
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{value || 0}</div>
          {trend && (
            <div className="flex items-center space-x-1 text-xs text-muted-foreground mt-1">
              {trend.isPositive ? (
                <TrendingUp className="h-3 w-3 text-green-500" />
              ) : (
                <TrendingDown className="h-3 w-3 text-red-500" />
              )}
              <span className={trend.isPositive ? "text-green-500" : "text-red-500"}>
                {trend.isPositive ? "+" : ""}
                {trend.value}%
              </span>
              <span>vs mes anterior</span>
            </div>
          )}
        </CardContent>
      </Card>
    )
  }