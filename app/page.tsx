"use client"

import { useState } from "react"
import { Upload, Heart, MessageCircle, Smile, Zap } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { ChatUpload } from "@/components/chat-upload"
import { AnalysisResults } from "@/components/analysis-results"
import { analyzeChatData, type ChatAnalysis } from "@/lib/chat-analyzer"
import { ThemeToggle } from "@/components/theme-toggle"

export default function Home() {
  const [analysis, setAnalysis] = useState<ChatAnalysis | null>(null)
  const [isAnalyzing, setIsAnalyzing] = useState(false)

  const handleFileUpload = async (file: File) => {
    setIsAnalyzing(true)
    try {
      const text = await file.text()
      const analysisResult = analyzeChatData(text)
      setAnalysis(analysisResult)
    } catch (error) {
      console.error("Error analyzing chat:", error)
    } finally {
      setIsAnalyzing(false)
    }
  }

  const resetAnalysis = () => {
    setAnalysis(null)
  }

  if (analysis) {
    return <AnalysisResults analysis={analysis} onReset={resetAnalysis} />
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-100 via-purple-50 to-indigo-100 dark:from-gray-900 dark:via-purple-900/20 dark:to-indigo-900/20">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center mb-4">
            <Heart className="h-12 w-12 text-pink-500 mr-2" />
            <h1 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-pink-500 to-purple-600 bg-clip-text text-transparent">
              Love Score
            </h1>
          </div>
          <div className="flex justify-center mb-4">
            <ThemeToggle />
          </div>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Upload your WhatsApp chat and discover your relationship compatibility score! Analyze your conversations to
            see how much you and your partner connect.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-3 gap-6 mb-12">
          <Card className="border-0 shadow-lg bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm">
            <CardContent className="p-6 text-center">
              <MessageCircle className="h-12 w-12 text-blue-500 mx-auto mb-4" />
              <h3 className="text-lg font-semibold mb-2">Message Analysis</h3>
              <p className="text-gray-600 dark:text-gray-300">
                Analyze frequency, length, and patterns in your conversations
              </p>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-lg bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm">
            <CardContent className="p-6 text-center">
              <Smile className="h-12 w-12 text-yellow-500 mx-auto mb-4" />
              <h3 className="text-lg font-semibold mb-2">Emoji Insights</h3>
              <p className="text-gray-600 dark:text-gray-300">Track love emojis and emotional expressions</p>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-lg bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm">
            <CardContent className="p-6 text-center">
              <Zap className="h-12 w-12 text-green-500 mx-auto mb-4" />
              <h3 className="text-lg font-semibold mb-2">Instant Results</h3>
              <p className="text-gray-600 dark:text-gray-300">Get your Love Score and insights in seconds</p>
            </CardContent>
          </Card>
        </div>

        {/* Upload Section */}
        <div className="max-w-2xl mx-auto">
          <ChatUpload onFileUpload={handleFileUpload} isAnalyzing={isAnalyzing} />

          {/* Instructions */}
          <Card className="mt-8 border-0 shadow-lg bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm">
            <CardContent className="p-6">
              <h3 className="text-lg font-semibold mb-4 flex items-center">
                <Upload className="h-5 w-5 mr-2 text-purple-500" />
                How to export your WhatsApp chat:
              </h3>
              <ol className="list-decimal list-inside space-y-2 text-gray-600 dark:text-gray-300">
                <li>Open WhatsApp and go to the chat you want to analyze</li>
                <li>Tap the contact/group name at the top</li>
                <li>Scroll down and tap "Export Chat"</li>
                <li>Choose "Without Media" for faster processing</li>
                <li>Save the .txt file and upload it here</li>
              </ol>
              <div className="mt-4 p-4 bg-yellow-50 rounded-lg border border-yellow-200">
                <p className="text-sm text-yellow-800">
                  <strong>Privacy Note:</strong> Your chat data is processed locally in your browser and never sent to
                  any server. Your privacy is completely protected!
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
