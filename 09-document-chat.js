const { RetrievalQAChain, loadQAStuffChain } = require('langchain/chains')
const { TextLoader } = require('langchain/document_loaders/fs/text')
const { CharacterTextSplitter } = require('langchain/text_splitter')
const { OpenAIEmbeddings } = require('langchain/embeddings/openai')
const { FaissStore } = require('langchain/vectorstores/faiss')
const { OpenAI } = require('langchain/llms/openai')
const dotenv = require('dotenv')
dotenv.config()

async function main () {
  // Initialize the LLM to use to answer the question.
  const model = new OpenAI({ streaming: true })
  const loader = new TextLoader('mydocs.txt')
  const docs = await loader.load()

  const textSplitter = new CharacterTextSplitter({
    chunkSize: 200,
    chunkOverlap: 50
  })
  const documents = await textSplitter.splitDocuments(docs)

  // Create a vector store from the documents.
  const vectorStore = await FaissStore.fromDocuments(
    documents,
    new OpenAIEmbeddings()
  )

  await vectorStore.save('./')

  // Create a chain that uses the OpenAI LLM and FAISS vector store.
  const chain = RetrievalQAChain.fromLLM(model, vectorStore.asRetriever())

  const res = await chain.call({
    query: 'What is langsmith?'
  })
  console.log({ res })
}

main()
