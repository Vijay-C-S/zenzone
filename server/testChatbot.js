// Simple test script for the enhanced chatbot (no dependencies)

const testMessages = [
  "I'm feeling really anxious about my job interview tomorrow",
  "I've been feeling depressed lately and don't know what to do",
  "I'm so overwhelmed with everything going on in my life",
  "I feel so lonely and isolated from everyone",
  "I'm angry at my friend and don't know how to handle it",
  "I'm exhausted and burned out from work",
  "I just need help, I don't know what to do anymore"
]

function getEnhancedResponse(message) {
  const lowerMessage = message.toLowerCase()
  
  if (lowerMessage.includes('anxious') || lowerMessage.includes('anxiety')) {
    return "I hear that you're experiencing anxiety, and I want you to know that what you're feeling is completely valid and manageable. Anxiety is our mind's way of trying to protect us, even when we don't need that protection right now. Let's try a grounding technique together: Can you identify 5 things you can see, 4 things you can touch, 3 things you can hear, 2 things you can smell, and 1 thing you can taste? This 5-4-3-2-1 technique can help bring you back to the present moment. What feels most overwhelming about your anxiety right now?"
  } else if (lowerMessage.includes('sad') || lowerMessage.includes('depressed') || lowerMessage.includes('down')) {
    return "I'm truly sorry you're experiencing these difficult feelings. Depression can feel like carrying an invisible weight, and it takes courage to reach out when you're struggling. Your feelings are completely valid, and you're not alone in this experience. Sometimes when we're feeling low, even small acts of self-compassion can create tiny shifts - perhaps a warm cup of tea, stepping outside for fresh air, or listening to music that speaks to you. You mentioned feeling down - can you tell me what's been weighing on your heart lately?"
  } else if (lowerMessage.includes('stress') || lowerMessage.includes('overwhelmed')) {
    return "Feeling overwhelmed is a signal that you're carrying more than feels manageable right now, and that's completely understandable. When stress builds up, our minds can feel scattered and everything can seem urgent at once. Let's try to create some space for you. Take a moment to breathe - in through your nose for 4 counts, hold for 4, out through your mouth for 6. This activates your parasympathetic nervous system and can help you feel more grounded. What would it look like to prioritize just one or two things today instead of everything at once?"
  } else if (lowerMessage.includes('lonely') || lowerMessage.includes('alone')) {
    return "Loneliness can feel so heavy, and I want you to know that reaching out here shows incredible strength. Sometimes loneliness isn't about being physically alone - it's about feeling disconnected or misunderstood. Your feelings matter, and you deserve to feel seen and heard. Even small connections can help - perhaps reaching out to one person you trust, or engaging in a community activity that aligns with your interests. What does connection usually look like for you when you're feeling more balanced?"
  } else if (lowerMessage.includes('angry') || lowerMessage.includes('mad')) {
    return "Anger often carries important information about our boundaries and needs, so thank you for sharing this with me. It sounds like something has really activated your protective instincts. When we're feeling intense anger, our bodies are often flooded with stress hormones. Try the 'STOP' technique: Stop what you're doing, Take a breath, Observe what you're feeling and thinking, and Proceed with intention. Your anger is valid - what situation or boundary crossing is fueling these feelings?"
  } else if (lowerMessage.includes('tired') || lowerMessage.includes('exhausted')) {
    return "Exhaustion - whether physical, emotional, or mental - is your body and mind's way of asking for rest and restoration. It sounds like you've been pushing through a lot, and acknowledging your tiredness is an important step in honoring your needs. Sometimes burnout happens when we're giving more than we're receiving. What would genuine rest look like for you right now? Not just sleep, but the kind of rest that restores your spirit?"
  } else if (lowerMessage.includes('help') || lowerMessage.includes('don\'t know')) {
    return "Asking for help is one of the most courageous things we can do, and I'm honored that you're sharing this space with me. Feeling uncertain or lost is part of the human experience, especially during times of transition or challenge. You don't have to have all the answers right now. Sometimes the next step is simply to be gentle with yourself and take things one moment at a time. What's one small thing that usually brings you a sense of peace or comfort?"
  } else {
    return "Thank you for trusting me with your thoughts and feelings. I can sense that something is on your mind, and I want you to know that whatever you're experiencing is valid and worthy of attention. Sometimes just putting our thoughts into words can provide a small sense of relief. I'm here to listen without judgment and support you in whatever way feels helpful. What's been sitting heaviest on your heart or mind today?"
  }
}

function testChatbot() {
  console.log('🤖 Testing Enhanced ZenBot Professional Responses...\n')
  
  testMessages.forEach((message, index) => {
    console.log(`\n📝 User Message ${index + 1}: "${message}"`)
    console.log('\n🤖 ZenBot Enhanced Response:')
    const response = getEnhancedResponse(message)
    
    // Word wrap for better readability
    const words = response.split(' ')
    let line = ''
    for (const word of words) {
      if ((line + word).length > 80) {
        console.log(line.trim())
        line = word + ' '
      } else {
        line += word + ' '
      }
    }
    if (line.trim()) console.log(line.trim())
    
    console.log('\n' + '='.repeat(100))
  })
  
  console.log('\n✅ Enhanced Professional Chatbot Testing Completed!')
  console.log('\n🎯 Key Improvements:')
  console.log('   • More empathetic and validating language')
  console.log('   • Specific therapeutic techniques and coping strategies')
  console.log('   • Professional mental health terminology')
  console.log('   • Thoughtful follow-up questions')
  console.log('   • Evidence-based interventions')
  console.log('   • Warm, professional tone throughout')
}

testChatbot()
