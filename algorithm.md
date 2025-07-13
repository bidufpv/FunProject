# Love Score Algorithm Explanation

## Overview
The Love Score is calculated on a scale of 0-100% using multiple weighted factors that indicate relationship engagement and emotional connection.

## Scoring Components

### 1. Message Frequency Score (30 points maximum)
- **Logic**: More frequent communication indicates stronger connection
- **Calculation**: `Math.min(averageMessagesPerDay * 2, 30)`
- **Rationale**: Couples who text more often show active engagement
- **Example**: 15 messages/day = 30 points (maximum)

### 2. Love Emoji Usage Score (25 points maximum)
- **Logic**: Emotional expressions through love emojis show affection
- **Calculation**: `Math.min((loveEmojis / totalEmojis) * 100, 25)`
- **Love Emojis Tracked**: ❤️, 💕, 💖, 💗, 💘, 💙, 💚, 💛, 💜, 🧡, 🖤, 🤍, 🤎, 💝, 💟, 😍, 🥰, 😘, 💋, 💑, 💏
- **Rationale**: Higher ratio of love emojis indicates romantic communication
- **Example**: 50 love emojis out of 200 total = 12.5 points

### 3. Chat Consistency Score (20 points maximum)
- **Logic**: Regular communication over time shows commitment
- **Calculation**: `(activeDays / totalPossibleDays) * 20`
- **Rationale**: Consistent daily communication indicates stable relationship
- **Example**: Chatting 80% of days = 16 points

### 4. Message Length Engagement Score (15 points maximum)
- **Logic**: Longer messages show deeper conversation and investment
- **Calculation**: `Math.min(averageMessageLength / 10, 15)`
- **Rationale**: Detailed messages indicate meaningful conversations
- **Example**: 150 character average = 15 points (maximum)

### 5. Relationship Duration Bonus (10 points maximum)
- **Logic**: Longer relationships show stability and commitment
- **Calculation**: `Math.min(totalDays / 30, 10)`
- **Rationale**: Time investment indicates serious relationship
- **Example**: 300 days of chatting = 10 points (maximum)

## Score Interpretation

| Score Range | Label | Meaning |
|-------------|-------|---------|
| 90-100% | Soulmates! 💕 | Exceptional connection with high engagement |
| 80-89% | True Love! ❤️ | Strong romantic relationship indicators |
| 70-79% | Strong Connection! 💖 | Good relationship with solid communication |
| 60-69% | Good Chemistry! 💜 | Positive relationship signs |
| 50-59% | Growing Bond! 💙 | Developing relationship |
| 0-49% | Getting to Know Each Other! 💚 | Early stage or casual communication |

## Additional Metrics Analyzed

### Message Patterns
- **Daily Distribution**: Identifies most active communication days
- **Time Analysis**: Peak messaging hours (if timestamp available)
- **Response Patterns**: Message clustering and conversation flow

### Emoji Analysis
- **Total Emoji Usage**: Overall expressiveness in communication
- **Emoji Diversity**: Variety of emotional expressions
- **Top Emojis**: Most frequently used emojis by both parties

### Conversation Insights
- **Longest Streak**: Maximum consecutive days of communication
- **Average Message Length**: Depth of individual messages
- **Total Communication Volume**: Overall relationship investment

## Technical Implementation

### WhatsApp Chat Parsing
The parser handles multiple export formats:
\`\`\`
[DD/MM/YYYY, HH:MM:SS] Contact Name: Message content
DD/MM/YYYY, HH:MM:SS - Contact Name: Message content
DD/MM/YYYY, HH:MM - Contact Name: Message content
\`\`\`

### Data Processing Pipeline
1. **Text Parsing**: Extract structured data from raw chat export
2. **Date Normalization**: Handle different date/time formats
3. **Emoji Extraction**: Unicode regex pattern matching
4. **Statistical Analysis**: Calculate all metrics and insights
5. **Score Computation**: Apply weighted algorithm
6. **Visualization**: Generate charts and insights

## Privacy & Security
- **Local Processing**: All analysis happens in the browser
- **No Data Storage**: Chat content never leaves the user's device
- **No Server Communication**: Complete client-side application
- **Temporary Processing**: Data cleared when page refreshes
\`\`\`

