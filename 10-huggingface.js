import { HuggingFaceInference } from 'langchain/llms/hf'

const model = new HuggingFaceInference({
  model: 'gpt2',
  apiKey: 'YOUR-API-KEY' // In Node.js defaults to process.env.HUGGINGFACEHUB_API_KEY
})
