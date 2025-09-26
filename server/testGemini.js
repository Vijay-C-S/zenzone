import OpenAI from 'openai';
const openai = new OpenAI({
  apiKey: 'your_actual_gemini_api_key_here',
  baseURL: 'https://generativelanguage.googleapis.com/v1beta/openai/'
});

async function test() {
  const completion = await openai.chat.completions.create({
    model: 'gemini-2.0-flash',
    messages: [{ role: 'user', content: "Hello!" }]
  });
  console.log(completion.choices[0].message.content);
}

test();
