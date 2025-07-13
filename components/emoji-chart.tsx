"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts"
import { Smile } from "lucide-react"

interface EmojiChartProps {
  data: Array<{ emoji: string; count: number }>
}

export function EmojiChart({ data }: EmojiChartProps) {
  // Take top 10 emojis
  const chartData = data.slice(0, 10)

  return (
    <Card className="border-0 shadow-lg bg-white/70 backdrop-blur-sm">
      <CardHeader>
        <CardTitle className="flex items-center">
          <Smile className="h-5 w-5 mr-2 text-yellow-500" />
          Top Emojis Used
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={chartData} layout="horizontal">
              <CartesianGrid strokeDasharray="3 3" stroke="#e0e7ff" />
              <XAxis type="number" stroke="#6b7280" fontSize={12} />
              <YAxis type="category" dataKey="emoji" stroke="#6b7280" fontSize={16} width={40} />
              <Tooltip
                contentStyle={{
                  backgroundColor: "rgba(255, 255, 255, 0.95)",
                  border: "none",
                  borderRadius: "8px",
                  boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
                }}
              />
              <Bar dataKey="count" fill="url(#emojiGradient)" radius={[0, 4, 4, 0]} />
              <defs>
                <linearGradient id="emojiGradient" x1="0" y1="0" x2="1" y2="0">
                  <stop offset="0%" stopColor="#fbbf24" />
                  <stop offset="100%" stopColor="#f59e0b" />
                </linearGradient>
              </defs>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  )
}
