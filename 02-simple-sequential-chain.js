const { PromptTemplate } = require('langchain/prompts')
const { LLMChain, SimpleSequentialChain } = require('langchain/chains')
const { OpenAI } = require('langchain/llms/openai')
const dotenv = require('dotenv')
dotenv.config()

async function main (emailText) {
  model = new OpenAI({ modelName: 'gpt-3.5-turbo', temperature: 0 })

  const anonimizeTemplate =
    'Please anonimize every personal/sensitive information about the following text. Replace by -PERSONAL_DATA-: {email}'

  const anonimizePrompt = new PromptTemplate({
    template: anonimizeTemplate,
    inputVariables: ['email']
  })
  const chain1 = new LLMChain({ llm: model, prompt: anonimizePrompt })

  const needTemplate =
    'What is the main need of the subject in the text delimited between triple backticks ```{text}```'

  const needPrompt = new PromptTemplate({
    template: needTemplate,
    inputVariables: ['text']
  })

  const chain2 = new LLMChain({ llm: model, prompt: needPrompt })

  const overallChain = new SimpleSequentialChain({
    chains: [chain1, chain2],
    verbose: true
  })

  response = await overallChain.run(emailText)
  console.log(response)
}

main(
  'Hi! My name is Santiago Morillo Segovia. Im from Cartagena, Colombia. My credit card number is 1234-5678-1234. I would like to cancel my account.'
)
