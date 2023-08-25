const { PromptTemplate } = require('langchain/prompts')
const { LLMChain } = require('langchain/chains')
const { OpenAI } = require('langchain/llms/openai')
const dotenv = require('dotenv')
dotenv.config()

// FIRST EXAMPLE
// async function main () {
//   model = new OpenAI({ modelName: 'gpt-3.5-turbo', temperature: 0 })
//   text = await model.predict('Are you up?')
//   console.log(text)
// }

// main()

async function main (companyName) {
  model = new OpenAI({ modelName: 'gpt-3.5-turbo', temperature: 0 })
  //   text = await model.predict('Are you up?') examples
  //   console.log(text)
  const template =
    'Be very technical when responding. Respond what you know about company: {company}'
  const prompt = new PromptTemplate({ template, inputVariables: ['company'] })
  const chain = new LLMChain({ llm: model, prompt })
  const result = await chain.call({ company: companyName })
  console.log(result.text)
}

main('Wizeline')
// main('Google')
