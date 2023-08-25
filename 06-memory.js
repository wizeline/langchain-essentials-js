const { ConversationChain } = require('langchain/chains')
const { ChatOpenAI } = require('langchain/chat_models/openai')
const {
  ChatPromptTemplate,
  HumanMessagePromptTemplate,
  SystemMessagePromptTemplate,
  MessagesPlaceholder
} = require('langchain/prompts')
const { BufferMemory } = require('langchain/memory')
const dotenv = require('dotenv')
dotenv.config()

async function main () {
  const chat = new ChatOpenAI({ modelName: 'gpt-3.5-turbo', temperature: 0 })

  const chatPrompt = ChatPromptTemplate.fromPromptMessages([
    SystemMessagePromptTemplate.fromTemplate(
      'The following is a friendly conversation between a human and an AI. The AI is talkative and provides lots of specific details from its context. If the AI does not know the answer to a question, it truthfully says it does not know.'
    ),
    new MessagesPlaceholder('history'),
    HumanMessagePromptTemplate.fromTemplate('{input}')
  ])

  const chain = new ConversationChain({
    memory: new BufferMemory({ returnMessages: true, memoryKey: 'history' }),
    prompt: chatPrompt,
    llm: chat
  })

  const response = await chain.call({
    input: 'Hey! my name is Santiago?'
  })

  const response2 = await chain.call({
    input: 'Hey! What is my name?'
  })

  //console.log(chain.memory.chatHistory)
}

main()
