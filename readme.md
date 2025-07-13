# 💕 WhatsApp Love Score Analyzer

A fun and interactive web application that analyzes your WhatsApp chat exports to calculate a "Love Score" based on communication patterns, emoji usage, and relationship metrics.


## ✨ Features

### 📊 Comprehensive Analysis
- **Love Score Calculation**: 0-100% compatibility rating based on multiple factors
- **Message Frequency Analysis**: Daily communication patterns and trends
- **Emoji Insights**: Love emoji tracking and emotional expression analysis
- **Relationship Metrics**: Duration, consistency, and engagement statistics

### 🎨 Beautiful Interface
- **Modern Design**: Gradient backgrounds with glassmorphism effects
- **Dark/Light Theme**: Toggle between themes with smooth transitions
- **Responsive Layout**: Works perfectly on desktop, tablet, and mobile
- **Interactive Charts**: Real-time data visualization with Recharts

### 🔒 Privacy First
- **Local Processing**: All analysis happens in your browser
- **No Data Upload**: Your chat data never leaves your device
- **No Registration**: Use immediately without creating accounts
- **Secure**: No server-side storage or data transmission

### 📱 Easy to Use
- **Drag & Drop Upload**: Simple file upload with validation
- **Instant Results**: Get your Love Score in seconds
- **Share Results**: Share your score on social media
- **Export Instructions**: Step-by-step WhatsApp export guide

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ 
- npm or yarn package manager

### Installation

1. **Clone the repository**
   \`\`\`bash
   git clone https://github.com/bidufpv/FunProject.git
   cd whatsapp-love-analyzer
   \`\`\`

2. **Install dependencies**
   \`\`\`bash
   npm install
   # or
   yarn install
   \`\`\`

3. **Run the development server**
   \`\`\`bash
   npm run dev
   # or
   yarn dev
   \`\`\`

4. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 📖 How to Use

### Step 1: Export Your WhatsApp Chat
1. Open WhatsApp and go to the chat you want to analyze
2. Tap the contact/group name at the top
3. Scroll down and tap "Export Chat"
4. Choose "Without Media" for faster processing
5. Save the .txt file to your device

### Step 2: Upload and Analyze
1. Visit the Love Score Analyzer
2. Drag and drop your .txt file or click to browse
3. Wait for the analysis to complete (usually takes a few seconds)
4. View your Love Score and detailed insights!

### Step 3: Share Your Results
- Click the "Share Your Score" button to share on social media
- Take screenshots of your favorite insights
- Compare scores with friends (privacy-safe!)

## 🧮 Love Score Algorithm

The Love Score is calculated using a weighted algorithm that considers:

| Factor | Weight | Description |
|--------|--------|-------------|
| **Message Frequency** | 30% | How often you communicate daily |
| **Love Emoji Usage** | 25% | Ratio of romantic emojis to total emojis |
| **Chat Consistency** | 20% | Regular communication over time |
| **Message Engagement** | 15% | Average message length and depth |
| **Relationship Duration** | 10% | Total time period of communication |

### Score Ranges
- **90-100%**: Soulmates! 💕
- **80-89%**: True Love! ❤️
- **70-79%**: Strong Connection! 💖
- **60-69%**: Good Chemistry! 💜
- **50-59%**: Growing Bond! 💙
- **0-49%**: Getting to Know Each Other! 💚

## 🛠️ Tech Stack

### Frontend
- **Next.js 14**: React framework with App Router
- **TypeScript**: Type-safe JavaScript
- **Tailwind CSS**: Utility-first CSS framework
- **shadcn/ui**: Modern UI component library

### Data Visualization
- **Recharts**: React charting library
- **Lucide React**: Beautiful icon library

### File Handling
- **react-dropzone**: Drag and drop file uploads
- **Custom Parser**: WhatsApp chat format parser

### Theming
- **next-themes**: Dark/light theme management
- **CSS Variables**: Dynamic color schemes

## 📁 Project Structure

\`\`\`
whatsapp-love-analyzer/
├── app/
│   ├── globals.css          # Global styles and theme variables
│   ├── layout.tsx           # Root layout with theme provider
│   └── page.tsx             # Main application page
├── components/
│   ├── ui/                  # shadcn/ui components
│   ├── analysis-results.tsx # Results dashboard
│   ├── chat-upload.tsx      # File upload component
│   ├── emoji-chart.tsx      # Emoji usage chart
│   ├── messages-chart.tsx   # Message timeline chart
│   ├── theme-provider.tsx   # Theme context provider
│   └── theme-toggle.tsx     # Dark/light mode toggle
├── lib/
│   └── chat-analyzer.ts     # Core analysis logic
└── public/
    └── ...                  # Static assets
\`\`\`

## 🎯 Key Components

### Chat Parser (`lib/chat-analyzer.ts`)
- Handles multiple WhatsApp export formats
- Extracts messages, timestamps, and senders
- Processes emoji usage and patterns
- Calculates all relationship metrics

### Analysis Engine
- **Love Score Calculation**: Weighted algorithm implementation
- **Statistical Analysis**: Message patterns and trends
- **Insight Generation**: Fun facts and relationship highlights

### Visualization Components
- **Interactive Charts**: Message timeline and emoji usage
- **Responsive Design**: Mobile-first approach
- **Theme Support**: Dark/light mode compatibility

## 🔧 Configuration

### Environment Variables
No environment variables required - the app runs entirely client-side!

### Customization
You can customize the Love Score algorithm by modifying the weights in `lib/chat-analyzer.ts`:

\`\`\`typescript
function calculateLoveScore(metrics: ScoreMetrics): number {
  let score = 0;
  
  // Adjust these weights to change the algorithm
  const messageFrequencyWeight = 30;  // Default: 30
  const loveEmojiWeight = 25;         // Default: 25
  const consistencyWeight = 20;       // Default: 20
  const engagementWeight = 15;        // Default: 15
  const durationWeight = 10;          // Default: 10
  
  // ... calculation logic
}
\`\`\`

## 🤝 Contributing

We welcome contributions! Here's how you can help:

### Development Setup
1. Fork the repository
2. Create a feature branch: \`git checkout -b feature/amazing-feature\`
3. Make your changes and test thoroughly
4. Commit your changes: \`git commit -m 'Add amazing feature'\`
5. Push to the branch: \`git push origin feature/amazing-feature\`
6. Open a Pull Request

### Areas for Contribution
- **Algorithm Improvements**: Enhance the Love Score calculation
- **New Features**: Add more analysis metrics or visualizations
- **UI/UX Enhancements**: Improve the user interface and experience
- **Performance**: Optimize parsing and analysis speed
- **Accessibility**: Improve screen reader and keyboard navigation support

## 🐛 Bug Reports

Found a bug? Please open an issue with:
- Description of the problem
- Steps to reproduce
- Expected vs actual behavior
- Browser and device information
- Sample chat file (with personal info removed)

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **WhatsApp** for the chat export feature
- **shadcn/ui** for the beautiful component library
- **Recharts** for the amazing charting library
- **Next.js** team for the incredible framework
- **Vercel** for hosting and deployment platform


## 🌟 Show Your Support

If you found this project helpful, please:
- ⭐ Star the repository
- 🐛 Report bugs and suggest features
- 🤝 Contribute to the codebase
- 📢 Share with friends and on social media

---

