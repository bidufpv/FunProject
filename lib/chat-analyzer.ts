//Interface for analyzing WhatsApp chat data
// This module provides functions to parse WhatsApp chat data and analyze it for insights.
// It calculates various metrics such as love score, message frequency, emoji usage, and more.
export interface ChatAnalysis {
  loveScore: number // A score representing the "love" in the chat, based on various metrics
  totalMessages: number // Total number of messages in the chat
  totalDays: number // Total number of days the chat spans
  averageMessagesPerDay: number // Average number of messages sent per day
  averageMessageLength: number // Average length of messages in characters
  totalEmojis: number // Total number of emojis used in the chat
  loveEmojis: number // Total number of love-related emojis used in the chat
  dailyMessages: Array<{ date: string; messages: number }> // Daily message counts, with date and number of messages
  emojiStats: Array<{ emoji: string; count: number }> // Statistics of emojis used, with emoji and its count
  
  // Insights derived from the chat data
  insights: {
    mostActiveDay: string // The most active day in the chat, formatted as a string
    longestStreak: number // The longest streak of consecutive days with messages
    topEmoji: string // The most frequently used emoji in the chat
    consistency: number // Consistency score based on the number of days messages were sent
  }
}
 
// Interface representing each parsed message
interface ParsedMessage {
  timestamp: Date // Date and time of the message
  sender: string // Who sent the message
  content: string // The actual message content
}

// Function to analyze WhatsApp chat data
// Takes a string containing the chat text and returns a ChatAnalysis object with various metrics and insights
export function analyzeChatData(chatText: string): ChatAnalysis {
  // Parse the raw WhatsApp chat text into structured message objects
  const messages = parseWhatsAppChat(chatText)

  // Validate that we have messages to analyze
  if (messages.length === 0) {
    throw new Error("No valid messages found in the chat file")
  }

  // === BASIC METRICS CALCULATION ===
  
  // Count total messages in the chat
  const totalMessages = messages.length
  
  // Extract unique dates to determine how many days the chat spans
  // Convert each timestamp to a date string (removes time component)
  const dates = messages.map((m) => m.timestamp.toDateString())
  // Use Set to get unique dates, then convert back to array
  const uniqueDates = [...new Set(dates)]
  const totalDays = uniqueDates.length
  
  // Calculate average messages per day across the entire chat duration
  const averageMessagesPerDay = totalMessages / totalDays

  // === MESSAGE LENGTH ANALYSIS ===
  
  // Calculate the average length of messages in characters
  const messageLengths = messages.map((m) => m.content.length)
  // Sum all lengths and divide by count, then round to nearest integer
  const averageMessageLength = Math.round(messageLengths.reduce((a, b) => a + b, 0) / messageLengths.length)

  // === EMOJI ANALYSIS ===
  
  // Comprehensive emoji regex covering multiple Unicode ranges:
  // - \u{1F600}-\u{1F64F}: Emoticons (😀-🙏)
  // - \u{1F300}-\u{1F5FF}: Miscellaneous symbols (🌀-🗿)
  // - \u{1F680}-\u{1F6FF}: Transport and map symbols (🚀-🛿)
  // - \u{1F1E0}-\u{1F1FF}: Regional indicator symbols (flags)
  // - \u{2600}-\u{26FF}: Miscellaneous symbols (☀-⛿)
  // - \u{2700}-\u{27BF}: Dingbats (✀-➿)
  const emojiRegex =
    /[\u{1F600}-\u{1F64F}]|[\u{1F300}-\u{1F5FF}]|[\u{1F680}-\u{1F6FF}]|[\u{1F1E0}-\u{1F1FF}]|[\u{2600}-\u{26FF}]|[\u{2700}-\u{27BF}]/gu
  
  // Extract all emojis from all messages and flatten into a single array
  const allEmojis = messages.flatMap((m) => m.content.match(emojiRegex) || [])
  const totalEmojis = allEmojis.length

  // === LOVE EMOJI ANALYSIS ===
  
  // Regex to match common love-related emojis including:
  // - Heart emojis in various colors (❤️, 💕, 💖, etc.)
  // - Love-themed faces (😍, 🥰, 😘)
  // - Kiss emoji (💋)
  // - Couple emojis (👨‍❤️‍👨, 👩‍❤️‍👩, etc.)
  const loveEmojiRegex = /❤️|💕|💖|💗|💘|💙|💚|💛|💜|🧡|🖤|🤍|🤎|💝|💟|😍|🥰|😘|💋|👨‍❤️‍👨|👩‍❤️‍👩|👨‍❤️‍👩|💑|💏/g
  
  // Count total love emojis across all messages
  const loveEmojis = messages.flatMap((m) => m.content.match(loveEmojiRegex) || []).length

  // === DAILY MESSAGE DISTRIBUTION ===
  
  // Create a map to count messages per day
  const dailyMessageCounts = new Map<string, number>()
  messages.forEach((message) => {
    // Convert timestamp to ISO date string (YYYY-MM-DD format)
    const dateStr = message.timestamp.toISOString().split("T")[0]
    // Increment count for this date (initialize to 0 if first message on this date)
    dailyMessageCounts.set(dateStr, (dailyMessageCounts.get(dateStr) || 0) + 1)
  })

  // Convert map to array and sort chronologically
  const dailyMessages = Array.from(dailyMessageCounts.entries())
    .map(([date, messages]) => ({ date, messages }))
    .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())

  // === EMOJI STATISTICS ===
  
  // Create a map to count frequency of each emoji
  const emojiCounts = new Map<string, number>()
  allEmojis.forEach((emoji) => {
    // Increment count for this emoji (initialize to 0 if first occurrence)
    emojiCounts.set(emoji, (emojiCounts.get(emoji) || 0) + 1)
  })

  // Convert to array and sort by frequency (most used first)
  const emojiStats = Array.from(emojiCounts.entries())
    .map(([emoji, count]) => ({ emoji, count }))
    .sort((a, b) => b.count - a.count)

  // === INSIGHTS CALCULATION ===
  
  // Find the day with the highest message count
  const mostActiveDay = dailyMessages.reduce((max, day) => (day.messages > max.messages ? day : max), dailyMessages[0])

  // Calculate the longest streak of consecutive days with messages
  const longestStreak = calculateLongestStreak(uniqueDates)
  
  // Get the most frequently used emoji (fallback to 😊 if no emojis found)
  const topEmoji = emojiStats[0]?.emoji || "😊"
  
  // Calculate consistency as percentage of days with messages out of total chat duration
  // This shows how regularly the chat was used throughout its lifespan
  const consistency = Math.round(
    (totalDays / getDaysBetween(messages[0].timestamp, messages[messages.length - 1].timestamp)) * 100,
  )

  // === LOVE SCORE CALCULATION ===
  
  // Calculate the overall love score based on various metrics
  const loveScore = calculateLoveScore({
    totalMessages,
    totalDays,
    averageMessagesPerDay,
    loveEmojis,
    totalEmojis,
    averageMessageLength,
    consistency,
  })

  // Return the complete analysis object
  return {
    loveScore,
    totalMessages,
    totalDays,
    averageMessagesPerDay,
    averageMessageLength,
    totalEmojis,
    loveEmojis,
    dailyMessages,
    emojiStats,
    insights: {
      // Format the most active day as a readable string
      mostActiveDay: new Date(mostActiveDay.date).toLocaleDateString("en-US", {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
      }),
      longestStreak,
      topEmoji,
      consistency,
    },
  }
}

/**
 * Parses WhatsApp chat export text into structured message objects
 * Handles multiple WhatsApp export formats and date/time patterns
 * @param chatText Raw WhatsApp chat export text
 * @returns Array of parsed messages sorted by timestamp
 */
function parseWhatsAppChat(chatText: string): ParsedMessage[] {
  // Split the chat text into individual lines
  const lines = chatText.split("\n")
  const messages: ParsedMessage[] = []

  // Different regex patterns to handle various WhatsApp export formats:
  // Pattern 1: [MM/DD/YYYY, HH:MM:SS AM/PM] Sender: Message
  // Pattern 2: MM/DD/YYYY, HH:MM:SS AM/PM - Sender: Message
  // Pattern 3: MM/DD/YYYY, HH:MM AM/PM - Sender: Message (without seconds)
  const patterns = [
    /^\[(\d{1,2}\/\d{1,2}\/\d{2,4}),?\s+(\d{1,2}:\d{2}:\d{2})\s*(?:AM|PM)?\]\s*([^:]+):\s*(.*)$/i,
    /^(\d{1,2}\/\d{1,2}\/\d{2,4}),?\s+(\d{1,2}:\d{2}:\d{2})\s*(?:AM|PM)?\s*-\s*([^:]+):\s*(.*)$/i,
    /^(\d{1,2}\/\d{1,2}\/\d{2,4}),?\s+(\d{1,2}:\d{2})\s*(?:AM|PM)?\s*-\s*([^:]+):\s*(.*)$/i,
  ]

  // Process each line of the chat
  for (const line of lines) {
    // Skip empty lines
    if (line.trim() === "") continue

    // Try each pattern until one matches
    for (const pattern of patterns) {
      const match = line.match(pattern)
      if (match) {
        try {
          // Extract matched groups: date, time, sender, content
          const [, dateStr, timeStr, sender, content] = match
          
          // Parse the date and time string into a Date object
          const timestamp = parseDateTime(dateStr, timeStr)

          // Only add message if timestamp is valid and content is not empty
          if (timestamp && content.trim()) {
            messages.push({
              timestamp,
              sender: sender.trim(),
              content: content.trim(),
            })
          }
          break // Exit pattern loop once a match is found
        } catch (error) {
          // Skip invalid lines and continue processing
          continue
        }
      }
    }
  }

  // Sort messages chronologically by timestamp
  return messages.sort((a, b) => a.timestamp.getTime() - b.timestamp.getTime())
}

/**
 * Parses date and time strings into a Date object
 * Handles both MM/DD/YYYY and DD/MM/YYYY formats
 * Also handles 12-hour and 24-hour time formats
 * @param dateStr Date string in MM/DD/YYYY or DD/MM/YYYY format
 * @param timeStr Time string in HH:MM:SS or HH:MM format (with optional AM/PM)
 * @returns Date object or null if parsing fails
 */
function parseDateTime(dateStr: string, timeStr: string): Date | null {
  try {
    // === DATE PARSING ===
    
    // Split date string by '/' to get individual components
    const dateParts = dateStr.split("/")
    let day: number, month: number, year: number

    if (dateParts.length === 3) {
      // Determine date format by checking if first part is > 12
      // If first part > 12, it must be day (DD/MM/YYYY format)
      // Otherwise, assume MM/DD/YYYY format
      if (Number.parseInt(dateParts[0]) > 12) {
        // DD/MM/YYYY format
        day = Number.parseInt(dateParts[0])
        month = Number.parseInt(dateParts[1]) - 1 // JavaScript months are 0-indexed
      } else {
        // MM/DD/YYYY format
        month = Number.parseInt(dateParts[0]) - 1 // JavaScript months are 0-indexed
        day = Number.parseInt(dateParts[1])
      }
      
      // Handle 2-digit years by assuming they're in 2000s
      year = Number.parseInt(dateParts[2])
      if (year < 100) year += 2000
    } else {
      // Invalid date format
      return null
    }

    // === TIME PARSING ===
    
    // Split time string by ':' to get hours, minutes, seconds
    const timeParts = timeStr.split(":")
    let hours = Number.parseInt(timeParts[0])
    const minutes = Number.parseInt(timeParts[1])
    // Seconds are optional in some formats
    const seconds = timeParts[2] ? Number.parseInt(timeParts[2]) : 0

    // Handle 12-hour format (AM/PM)
    if (timeStr.toLowerCase().includes("pm") && hours !== 12) {
      // PM: add 12 to hours (except for 12 PM which stays 12)
      hours += 12
    } else if (timeStr.toLowerCase().includes("am") && hours === 12) {
      // 12 AM becomes 0 (midnight)
      hours = 0
    }

    // Create and return the Date object
    return new Date(year, month, day, hours, minutes, seconds)
  } catch (error) {
    // Return null if any parsing step fails
    return null
  }
}

/**
 * Calculates the longest streak of consecutive days with messages
 * @param dates Array of date strings
 * @returns Number representing the longest consecutive day streak
 */
function calculateLongestStreak(dates: string[]): number {
  // Handle empty array
  if (dates.length === 0) return 0

  // Sort dates chronologically
  const sortedDates = dates.sort()
  let longestStreak = 1 // At least 1 day if we have any dates
  let currentStreak = 1

  // Compare each date with the previous one
  for (let i = 1; i < sortedDates.length; i++) {
    const prevDate = new Date(sortedDates[i - 1])
    const currentDate = new Date(sortedDates[i])
    
    // Calculate difference in days between consecutive dates
    const dayDiff = (currentDate.getTime() - prevDate.getTime()) / (1000 * 60 * 60 * 24)

    if (dayDiff === 1) {
      // Consecutive day found - increment current streak
      currentStreak++
      // Update longest streak if current streak is longer
      longestStreak = Math.max(longestStreak, currentStreak)
    } else {
      // Gap in dates - reset current streak
      currentStreak = 1
    }
  }

  return longestStreak
}

/**
 * Calculates the number of days between two dates
 * @param start Starting date
 * @param end Ending date
 * @returns Number of days between the dates (always positive)
 */
function getDaysBetween(start: Date, end: Date): number {
  // Calculate absolute difference in milliseconds
  const diffTime = Math.abs(end.getTime() - start.getTime())
  // Convert to days (1000ms * 60s * 60m * 24h = milliseconds per day)
  return Math.ceil(diffTime / (1000 * 60 * 60 * 24))
}

/**
 * Calculates a love score based on various chat metrics
 * The score is out of 100 and combines multiple factors that indicate engagement and affection
 * @param metrics Object containing various chat statistics
 * @returns Love score between 0 and 100
 */
function calculateLoveScore(metrics: {
  totalMessages: number
  totalDays: number
  averageMessagesPerDay: number
  loveEmojis: number
  totalEmojis: number
  averageMessageLength: number
  consistency: number
}): number {
  let score = 0

  // === MESSAGE FREQUENCY COMPONENT (30 points max) ===
  // Higher message frequency indicates more engagement
  // Each message per day contributes 2 points, capped at 30
  const messagesPerDayScore = Math.min(metrics.averageMessagesPerDay * 2, 30)
  score += messagesPerDayScore

  // === LOVE EMOJI USAGE COMPONENT (25 points max) ===
  // Higher ratio of love emojis to total emojis indicates more affection
  // Calculate what percentage of emojis are love-related
  const loveEmojiRatio = metrics.totalEmojis > 0 ? metrics.loveEmojis / metrics.totalEmojis : 0
  // Convert ratio to percentage and cap at 25 points
  const loveEmojiScore = Math.min(loveEmojiRatio * 100, 25)
  score += loveEmojiScore

  // === CHAT CONSISTENCY COMPONENT (20 points max) ===
  // Higher consistency (more days with messages) indicates sustained engagement
  // Consistency is already a percentage, so scale it to 20 points
  const consistencyScore = (metrics.consistency / 100) * 20
  score += consistencyScore

  // === MESSAGE LENGTH ENGAGEMENT COMPONENT (15 points max) ===
  // Longer messages indicate more thoughtful communication
  // Each 10 characters contributes 1 point, capped at 15
  const lengthScore = Math.min(metrics.averageMessageLength / 10, 15)
  score += lengthScore

  // === DURATION BONUS COMPONENT (10 points max) ===
  // Longer chat duration indicates sustained relationship
  // Each 30 days contributes 1 point, capped at 10
  const durationScore = Math.min(metrics.totalDays / 30, 10)
  score += durationScore

  // Round the final score and ensure it doesn't exceed 100
  return Math.round(Math.min(score, 100))
}