export const geminiAPIKEY: string = process.env.GEMINI_API_KEY || ''
export const OpenAINamespace = process.env.OPENAI_SECRATE_KEY;
const AZURE_OPENAI_API_BASE = process.env.AZURE_OPENAI_API_BASE
const AZURE_OPENAI_DEPLOYMENT_ID = process.env.AZURE_OPENAI_DEPLOYMENT_ID
export const OpenAIURL = `${AZURE_OPENAI_API_BASE}/openai/deployments/${AZURE_OPENAI_DEPLOYMENT_ID}/chat/completions?api-version=2023-03-15-preview`

