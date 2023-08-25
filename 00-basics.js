const dotenv = require('dotenv')
dotenv.config()

const { OpenAI } = require('openai')

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
})

async function chat (input) {
  const promptTemplate = `Be very technical when responding. Respond what you know about company: {company}` // This goes at the end

  prompt = promptTemplate.replace('{company}', company) // This goes at the end

  const messages = [{ role: 'user', content: input }]
  const model = 'gpt-3.5-turbo'

  response = await openai.chat.completions.create({
    messages: messages,
    model: model,
    temperature: 0
  })

  console.log(response.choices[0].message.content)
}

chat('Wizeline')
// main('Google') // This goes at the end
// main('Coursera') // This goes at the end
