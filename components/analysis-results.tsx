"use client"

import { MessageCircle, Calendar, Smile, TrendingUp, Award, Share2 } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { MessagesChart } from "@/components/messages-chart"
import { EmojiChart } from "@/components/emoji-chart"
import type { ChatAnalysis } from "@/lib/chat-analyzer"

interface AnalysisResultsProps {
  analysis: ChatAnalysis
  onReset: () => void
}

export function AnalysisResults({ analysis, onReset }: AnalysisResultsProps) {
  const getLoveScoreColor = (score: number) => {
    if (score >= 80) return "from-pink-500 to-red-500"
    if (score >= 60) return "from-purple-500 to-pink-500"
    if (score >= 40) return "from-blue-500 to-purple-500"
    return "from-gray-500 to-blue-500"
  }

  const getLoveScoreLabel = (score: number) => {
    if (score >= 90) return "Soulmates! 💕"
    if (score >= 80) return "True Love! ❤️"
    if (score >= 70) return "Strong Connection! 💖"
    if (score >= 60) return "Good Chemistry! 💜"
    if (score >= 50) return "Growing Bond! 💙"
    return "Getting to Know Each Other! 💚"
  }

  const shareResults = () => {
    const text = `I just analyzed my WhatsApp chat and got a Love Score of ${analysis.loveScore}%! ${getLoveScoreLabel(analysis.loveScore)} Check out your own love story!`
    if (navigator.share) {
      navigator.share({
        title: "My WhatsApp Love Score",
        text: text,
        url: window.location.href,
      })
    } else {
      navigator.clipboard.writeText(text)
      alert("Results copied to clipboard!")
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-100 via-purple-50 to-indigo-100">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <Button variant="outline" onClick={onReset} className="mb-4 bg-transparent">
            ← Analyze Another Chat
          </Button>
          <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-2">Your Love Story Analysis</h1>
          <p className="text-gray-600">
            Based on {analysis.totalMessages.toLocaleString()} messages over {analysis.totalDays} days
          </p>
        </div>

        {/* Love Score Hero */}
        <Card className="mb-8 border-0 shadow-2xl bg-white/80 backdrop-blur-sm overflow-hidden">
          <CardContent className="p-8 text-center relative">
            <div className="absolute inset-0 bg-gradient-to-r from-pink-500/10 to-purple-500/10"></div>
            <div className="relative z-10">
              <div className="mb-6">
                <div
                  className={`inline-flex items-center justify-center w-32 h-32 rounded-full bg-gradient-to-r ${getLoveScoreColor(analysis.loveScore)} text-white text-4xl font-bold shadow-lg`}
                >
                  {analysis.loveScore}%
                </div>
              </div>
              <h2 className="text-3xl font-bold text-gray-800 mb-2">{getLoveScoreLabel(analysis.loveScore)}</h2>
              <p className="text-lg text-gray-600 mb-6">Your relationship compatibility score</p>
              <Button
                onClick={shareResults}
                className="bg-gradient-to-r from-pink-500 to-purple-500 hover:from-pink-600 hover:to-purple-600"
              >
                <Share2 className="h-4 w-4 mr-2" />
                Share Your Score
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Key Metrics */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card className="border-0 shadow-lg bg-white/70 backdrop-blur-sm">
            <CardContent className="p-6 text-center">
              <MessageCircle className="h-8 w-8 text-blue-500 mx-auto mb-3" />
              <div className="text-2xl font-bold text-gray-800">{analysis.totalMessages.toLocaleString()}</div>
              <div className="text-sm text-gray-600">Total Messages</div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-lg bg-white/70 backdrop-blur-sm">
            <CardContent className="p-6 text-center">
              <Calendar className="h-8 w-8 text-green-500 mx-auto mb-3" />
              <div className="text-2xl font-bold text-gray-800">{analysis.totalDays}</div>
              <div className="text-sm text-gray-600">Days Chatting</div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-lg bg-white/70 backdrop-blur-sm">
            <CardContent className="p-6 text-center">
              <Smile className="h-8 w-8 text-yellow-500 mx-auto mb-3" />
              <div className="text-2xl font-bold text-gray-800">{analysis.totalEmojis}</div>
              <div className="text-sm text-gray-600">Emojis Used</div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-lg bg-white/70 backdrop-blur-sm">
            <CardContent className="p-6 text-center">
              <TrendingUp className="h-8 w-8 text-purple-500 mx-auto mb-3" />
              <div className="text-2xl font-bold text-gray-800">{analysis.averageMessagesPerDay.toFixed(1)}</div>
              <div className="text-sm text-gray-600">Messages/Day</div>
            </CardContent>
          </Card>
        </div>

        {/* Charts */}
        <div className="grid lg:grid-cols-2 gap-8 mb-8">
          <MessagesChart data={analysis.dailyMessages} />
          <EmojiChart data={analysis.emojiStats} />
        </div>

        {/* Fun Insights */}
        <Card className="border-0 shadow-lg bg-white/70 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="flex items-center">
              <Award className="h-5 w-5 mr-2 text-yellow-500" />
              Fun Insights
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 bg-gradient-to-r from-pink-50 to-purple-50 rounded-lg">
                  <span className="font-medium">Most Active Day</span>
                  <Badge variant="secondary">{analysis.insights.mostActiveDay}</Badge>
                </div>
                <div className="flex items-center justify-between p-4 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg">
                  <span className="font-medium">Longest Message Streak</span>
                  <Badge variant="secondary">{analysis.insights.longestStreak} days</Badge>
                </div>
                <div className="flex items-center justify-between p-4 bg-gradient-to-r from-green-50 to-teal-50 rounded-lg">
                  <span className="font-medium">Average Message Length</span>
                  <Badge variant="secondary">{analysis.averageMessageLength} chars</Badge>
                </div>
              </div>
              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 bg-gradient-to-r from-yellow-50 to-orange-50 rounded-lg">
                  <span className="font-medium">Most Used Emoji</span>
                  <Badge variant="secondary">{analysis.insights.topEmoji}</Badge>
                </div>
                <div className="flex items-center justify-between p-4 bg-gradient-to-r from-purple-50 to-pink-50 rounded-lg">
                  <span className="font-medium">Love Emojis Used</span>
                  <Badge variant="secondary">{analysis.loveEmojis}</Badge>
                </div>
                <div className="flex items-center justify-between p-4 bg-gradient-to-r from-red-50 to-pink-50 rounded-lg">
                  <span className="font-medium">Chat Consistency</span>
                  <Badge variant="secondary">{analysis.insights.consistency}%</Badge>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
