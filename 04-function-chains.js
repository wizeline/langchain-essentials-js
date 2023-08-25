const googleIt = require('google-it')
const { PromptTemplate } = require('langchain/prompts')
const {
  LLMChain,
  SequentialChain,
  TransformChain
} = require('langchain/chains')
const { OpenAI } = require('langchain/llms/openai')
const dotenv = require('dotenv')
dotenv.config()

async function main (input) {
  model = new OpenAI({ modelName: 'gpt-3.5-turbo', temperature: 0 })

  const toolTemplate =
    'Extract the name of the tool/company the text refers to. only return the name: {text}'

  const toolPrompt = new PromptTemplate({
    template: toolTemplate,
    inputVariables: ['text']
  })

  const chain1 = new LLMChain({
    llm: model,
    prompt: toolPrompt,
    outputKey: 'tool'
  })

  async function performGoogleSearch (inputs) {
    try {
      const results = await googleIt({ query: inputs.tool })
      return { links: results }
    } catch (error) {
      console.error('Error:', error)
    }
  }

  // Create a new TransformChain
  const transformChain = new TransformChain({
    transform: performGoogleSearch,
    inputVariables: ['tool'],
    outputVariables: ['links']
  })

  // Step 2: Create a sequential chain
  const chain = new SequentialChain({
    chains: [chain1, transformChain],
    inputVariables: ['text'],
    outputVariables: ['links']
  })

  response = await chain.call({ text: input })
  //console.log(response)
}

text = `Teragonia is dedicated to transforming the financial sponsor universe through cutting-edge data science and generative AI solutions.
We are set out to reimagine how financial sponsors execute their investment thesis,
from investment sourcing to exit, and maximize value to all stakeholders (financial sponsors comprise private equity firms,
venture capitalists, family funds, and sovereign wealth funds). We create at the intersection of business knowledge,
cutting-edge technology, and advanced quantitative techniques, to boost the systemic efficiency of the financial sponsor universe.
Our customizable enterprise applications suite and bespoke advisory solutions provide clarity,
focus and speed to the financial sponsor investment teams, their operating partners and the C-Suites of middle-market companies owned by financial sponsors,
significantly boosting growth, operating efficiency and return on investment.`

main(text)
