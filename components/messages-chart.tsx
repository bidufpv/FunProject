"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts"
import { TrendingUp } from "lucide-react"

interface MessagesChartProps {
  data: Array<{ date: string; messages: number }>
}

export function MessagesChart({ data }: MessagesChartProps) {
  // Take last 30 days for better visualization
  const chartData = data.slice(-30).map((item) => ({
    ...item,
    date: new Date(item.date).toLocaleDateString("en-US", { month: "short", day: "numeric" }),
  }))

  return (
    <Card className="border-0 shadow-lg bg-white/70 backdrop-blur-sm">
      <CardHeader>
        <CardTitle className="flex items-center">
          <TrendingUp className="h-5 w-5 mr-2 text-blue-500" />
          Messages Over Time
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e0e7ff" />
              <XAxis dataKey="date" stroke="#6b7280" fontSize={12} />
              <YAxis stroke="#6b7280" fontSize={12} />
              <Tooltip
                contentStyle={{
                  backgroundColor: "rgba(255, 255, 255, 0.95)",
                  border: "none",
                  borderRadius: "8px",
                  boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
                }}
              />
              <Line
                type="monotone"
                dataKey="messages"
                stroke="url(#gradient)"
                strokeWidth={3}
                dot={{ fill: "#8b5cf6", strokeWidth: 2, r: 4 }}
                activeDot={{ r: 6, fill: "#8b5cf6" }}
              />
              <defs>
                <linearGradient id="gradient" x1="0" y1="0" x2="1" y2="0">
                  <stop offset="0%" stopColor="#8b5cf6" />
                  <stop offset="100%" stopColor="#ec4899" />
                </linearGradient>
              </defs>
            </LineChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  )
}
