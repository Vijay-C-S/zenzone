// Test script to verify AI API keys
import OpenAI from 'openai'
import { GoogleGenerativeAI } from '@google/generative-ai'
import dotenv from 'dotenv'
import { fileURLToPath } from 'url'
import { dirname, join } from 'path'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

dotenv.config({ path: join(__dirname, '.env') })

console.log('Testing AI API Keys...\n')
console.log('Environment check:')
console.log('EMERGENT_LLM_KEY:', process.env.EMERGENT_LLM_KEY ? '✓ Found' : '✗ Not found')
console.log('GEMINI_API_KEY:', process.env.GEMINI_API_KEY ? '✓ Found' : '✗ Not found')
console.log()

// Test Emergent API
async function testEmergent() {
  console.log('1. Testing Emergent AI...')
  if (!process.env.EMERGENT_LLM_KEY) {
    console.log('   ✗ EMERGENT_LLM_KEY not found in .env')
    return false
  }

  try {
    const client = new OpenAI({
      apiKey: process.env.EMERGENT_LLM_KEY,
      baseURL: 'https://api.emergentmethods.ai/v1'
    })

    const completion = await client.chat.completions.create({
      model: 'Llama-3.3-70B-Instruct',
      messages: [
        { role: 'system', content: 'You are a helpful assistant.' },
        { role: 'user', content: 'Say hello in one sentence.' }
      ],
      max_tokens: 50
    })

    console.log('   ✓ Emergent AI working!')
    console.log('   Response:', completion.choices[0].message.content)
    return true
  } catch (error) {
    console.log('   ✗ Emergent AI failed:', error.message)
    if (error.response) {
      console.log('   Error details:', error.response.data)
    }
    return false
  }
}

// Test Gemini API
async function testGemini() {
  console.log('\n2. Testing Google Gemini...')
  if (!process.env.GEMINI_API_KEY) {
    console.log('   ✗ GEMINI_API_KEY not found in .env')
    return false
  }

  const modelsToTry = ['gemini-2.0-flash-exp', 'gemini-1.5-pro', 'gemini-1.5-flash', 'gemini-pro']

  for (const modelName of modelsToTry) {
    try {
      console.log(`   Trying model: ${modelName}...`)
      const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY)
      const model = genAI.getGenerativeModel({ model: modelName })

      const result = await model.generateContent('Say hello in one sentence.')
      const response = result.response
      const text = response.text()

      console.log(`   ✓ Gemini AI working with model: ${modelName}`)
      console.log('   Response:', text)
      return true
    } catch (error) {
      console.log(`   ✗ Model ${modelName} failed:`, error.message.split('\n')[0])
    }
  }

  console.log('   ✗ All Gemini models failed')
  return false
}

// Run tests
async function runTests() {
  const emergentWorks = await testEmergent()
  const geminiWorks = await testGemini()

  console.log('\n' + '='.repeat(50))
  console.log('Test Results:')
  console.log('='.repeat(50))
  console.log('Emergent AI:', emergentWorks ? '✓ WORKING' : '✗ FAILED')
  console.log('Gemini AI:', geminiWorks ? '✓ WORKING' : '✗ FAILED')
  console.log('='.repeat(50))

  if (!emergentWorks && !geminiWorks) {
    console.log('\n⚠ WARNING: Both AI providers are not working!')
    console.log('The chatbot will use fallback responses.')
  } else if (!emergentWorks) {
    console.log('\n⚠ Emergent AI not working, but Gemini will be used as fallback.')
  } else {
    console.log('\n✓ At least one AI provider is working correctly!')
  }
}

runTests().catch(console.error)
