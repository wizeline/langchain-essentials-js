const { OpenAI } = require('openai')
const dotenv = require('dotenv')
dotenv.config()

async function chat (input) {
  const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY
  })
  const messages = [{ role: 'user', content: input }]
  const model = 'gpt-3.5-turbo'

  response = await openai.chat.completions.create({
    messages: messages,
    model: model,
    temperature: 0
  })
  //console.log(response)
  console.log(response.choices[0].message.content)
}

prompt = 'What do you know about Wizeline?'
chat(prompt)
// main('Google') // This goes at the end
// main('Coursera') // This goes at the end

// prompt: The starting text you provide to the model for generating more content.
// max_tokens: The maximum length (in words or characters) of the generated output.
// temperature: How creative and random (high value) or focused and determined (low value) the text should be.
// top_p: Controls how diverse the generated text is by considering only highly probable tokens. Higher =  less diverse.
// frequency_penalty: Influences how often the model repeats certain phrases in the output.
// presence_penalty:  A higher value encourages the model to generate more varied and unique responses.
// stop_sequences: Strings that signal the model to stop generating when encountered.
// user: A description of an imaginary user that helps guide the model's responses.
// engine: Specifies which version of the GPT-3 model to use for generating text.
