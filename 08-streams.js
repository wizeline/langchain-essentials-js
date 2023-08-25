const { ConversationChain } = require('langchain/chains')
const { ChatOpenAI } = require('langchain/chat_models/openai')
const {
  ChatPromptTemplate,
  HumanMessagePromptTemplate,
  SystemMessagePromptTemplate,
  MessagesPlaceholder
} = require('langchain/prompts')
const { BufferWindowMemory } = require('langchain/memory')
const readline = require('readline')
const dotenv = require('dotenv')
dotenv.config()

function getChain () {
  const chat = new ChatOpenAI({
    modelName: 'gpt-3.5-turbo',
    temperature: 0,
    streaming: true
  })

  const chatPrompt = ChatPromptTemplate.fromPromptMessages([
    SystemMessagePromptTemplate.fromTemplate(
      'The following is a friendly conversation between a human and an AI. The AI is talkative and provides lots of specific details from its context. If the AI does not know the answer to a question, it truthfully says it does not know.'
    ),
    new MessagesPlaceholder('history'),
    HumanMessagePromptTemplate.fromTemplate('{input}')
  ])

  const chain = new ConversationChain({
    memory: new BufferWindowMemory({
      k: 1,
      returnMessages: true,
      memoryKey: 'history'
    }),
    prompt: chatPrompt,
    llm: chat
  })
  return chain
}

function getUserInput (query) {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  })
  return new Promise(resolve =>
    rl.question(query, ans => {
      rl.close()
      resolve(ans)
    })
  )
}

async function main () {
  const chain = getChain()
  while (true) {
    const userInput = await getUserInput('Human> ')
    const response = await chain.call({
      input: userInput,
      callbacks: [
        {
          handleLLMNewToken (token) {
            process.stdout.write(token)
          }
        },
        {
          handleLLMStart (token) {
            process.stdout.write('AI> ')
          }
        }
      ]
    })
    console.log(' ')
  }
}

main()
