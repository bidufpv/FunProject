"use client"

import { useCallback, useState } from "react"
import { useDropzone } from "react-dropzone"
import { Upload, FileText, Heart, Loader2 } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

interface ChatUploadProps {
  onFileUpload: (file: File) => void
  isAnalyzing: boolean
}

export function ChatUpload({ onFileUpload, isAnalyzing }: ChatUploadProps) {
  const [dragActive, setDragActive] = useState(false)

  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      const file = acceptedFiles[0]
      if (file && file.type === "text/plain") {
        onFileUpload(file)
      }
    },
    [onFileUpload],
  )

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      "text/plain": [".txt"],
    },
    multiple: false,
    onDragEnter: () => setDragActive(true),
    onDragLeave: () => setDragActive(false),
  })

  if (isAnalyzing) {
    return (
      <Card className="border-2 border-dashed border-purple-300 bg-white/70 backdrop-blur-sm">
        <CardContent className="p-12 text-center">
          <div className="flex flex-col items-center space-y-4">
            <div className="relative">
              <Heart className="h-16 w-16 text-pink-500 animate-pulse" />
              <Loader2 className="h-8 w-8 text-purple-500 animate-spin absolute -top-2 -right-2" />
            </div>
            <h3 className="text-2xl font-semibold text-gray-800">Analyzing Your Love Story...</h3>
            <p className="text-gray-600">Calculating your compatibility score and generating insights</p>
            <div className="w-64 h-2 bg-gray-200 rounded-full overflow-hidden">
              <div className="h-full bg-gradient-to-r from-pink-500 to-purple-500 rounded-full animate-pulse"></div>
            </div>
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card
      className={`border-2 border-dashed transition-all duration-200 cursor-pointer ${
        isDragActive || dragActive
          ? "border-purple-400 bg-purple-50/70 scale-105"
          : "border-gray-300 bg-white/70 hover:border-purple-300 hover:bg-purple-50/50"
      } backdrop-blur-sm shadow-lg`}
    >
      <CardContent {...getRootProps()} className="p-12 text-center">
        <input {...getInputProps()} />
        <div className="flex flex-col items-center space-y-4">
          <div className="relative">
            <Upload className={`h-16 w-16 transition-colors ${isDragActive ? "text-purple-500" : "text-gray-400"}`} />
            <Heart className="h-6 w-6 text-pink-500 absolute -top-1 -right-1" />
          </div>

          <div>
            <h3 className="text-2xl font-semibold text-gray-800 mb-2">
              {isDragActive ? "Drop your chat file here!" : "Upload Your WhatsApp Chat"}
            </h3>
            <p className="text-gray-600 mb-4">
              Drag and drop your exported WhatsApp chat (.txt file) or click to browse
            </p>
          </div>

          <Button variant="outline" className="border-purple-300 text-purple-600 hover:bg-purple-50 bg-transparent">
            <FileText className="h-4 w-4 mr-2" />
            Choose File
          </Button>

          <p className="text-sm text-gray-500">Supported format: .txt files from WhatsApp export</p>
        </div>
      </CardContent>
    </Card>
  )
}
