import express, { Application, Request, Response } from "express";
import { ollama } from "ollama-ai-provider"
import { CoreSystemMessage, CoreUserMessage, streamText } from 'ai';
import cors from 'cors';
const axios = require("axios");
import { baseDesignPrompt, fileInstruction, getSystemPrompt, systemPromptForFileStructure } from "./utils/prompt";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { basePrompt as nodeBasePrompt } from "./default/node";
import { basePrompt as reactBasePrompt } from "./default/react";
import { basePrompt as nextBasePrompt } from "./default/next";
import { geminiAPIKEY as API_KEY, OpenAINamespace, OpenAIURL } from "./utils/config";
const app = express();


app.use(cors({
  origin: "*",
  methods: "GET,POST",
}));
app.use(express.json())
app.use(express.urlencoded({ extended: false }))

app.post("/template", async (req: Request, res: Response) => {
  const { prompt } = req.body;
  try {
    const googleAI = new GoogleGenerativeAI(API_KEY);
    const geminiModel = googleAI.getGenerativeModel({
      model: "gemini-1.5-flash",
      systemInstruction: systemPromptForFileStructure
    });
    const result = await geminiModel.generateContent(prompt);
    const language = result?.response?.candidates![0]?.content?.parts[0]?.text;
    if (!language?.toLocaleLowerCase()?.includes('react') && !language?.toLocaleLowerCase().includes('node') && !language?.toLocaleLowerCase().includes('next') && !language?.toLocaleLowerCase().includes('angular')) {
      res.status(403).json({ message: 'oop! you are doing demo so i definitely mess up no matter how hard you try' })
      return;
    }

    const codeFileStructure = language.toLocaleLowerCase().includes('react') ?
      [baseDesignPrompt, reactBasePrompt] : language.toLocaleLowerCase().includes('node') ? nodeBasePrompt : [baseDesignPrompt, nextBasePrompt];

    res.status(200).json(codeFileStructure);
    return;
  } catch (error) {

  }
})

app.post('/chat', async (req: Request, res: Response) => {

  const { prompt } = req.body;
  try {
    const generate = async () => {
      try {
        let result = ''
        if (OpenAINamespace && OpenAIURL) {
          result = await callAzureOpenAI(prompt)
        } else if (req.body.generateFromLocal) {
          result = await generateAppUsingLocalDepModel(prompt)
        } else {
          result = await generateAppUsingGEMINE(prompt)
        }
        res.status(200).json({ text: result })
      } catch (error) {
        console.log("response error", error);
      }
    };
    generate()
  } catch (error) {
    console.log(error)
  }
})



const generateAppUsingGEMINE = async (prompt: string[]) => {

  const googleAI = new GoogleGenerativeAI(API_KEY);
  const geminiModel = googleAI.getGenerativeModel({
    model: "gemini-1.5-flash",
    systemInstruction: getSystemPrompt()
  });

  const messages = prompt.map((p: any) => ({ 'role': 'user', 'parts': [{ 'text': p }] }))
  const instructionWithMessages = [...messages, { 'role': 'user', 'parts': [{ 'text': fileInstruction }] }]

  const result = await geminiModel.generateContent({
    contents: instructionWithMessages
  });

  console.log(result?.response?.candidates![0]?.content?.parts[0]?.text)
  return result?.response?.candidates![0]?.content?.parts[0]?.text || ''
}

const generateAppUsingLocalDepModel = async (prompt: string[]) => {
  const messages: CoreUserMessage[] | CoreSystemMessage[] = prompt.map((p: any) => ({ 'role': 'user', 'content': p }))
  const instructionWithMessages: CoreUserMessage[] | CoreSystemMessage[] = [...messages, { 'role': 'user', 'content': fileInstruction }]

  const { textStream } = await streamText({
    model: ollama('deepseek-r1:8b'),
    system: getSystemPrompt(),
    temperature: 0,
    messages: instructionWithMessages
  });

  let fullText: string = '';
  for await (const textPart of textStream) {
    fullText += textPart;
    process.stdout.write(textPart);
  }
  return fullText;
}




/**
 * Calls an OpenAI API deployed on Azure with a system prompt and an array of user prompts.
 * @param {string} apiUrl - The endpoint URL of the OpenAI API on Azure.
 * @param {string} accessKey - The API access key for authentication.
 * @param {string} systemPrompt - The system-level instruction for the AI.
 * @param {string[]} userPrompts - An array of user prompts for the AI.
 * @param {number} maxTokens - The maximum number of tokens to generate.
 * @returns {Promise<string>} - The AI-generated response.
 */
async function callAzureOpenAI(userPrompts: any) {
  try {
    console.log(userPrompts)
    // Construct messages in OpenAI chat format
    const messages = [
      { role: "system", content: getSystemPrompt() }, // System prompt
      ...userPrompts.map((prompt: any) => ({ role: "user", content: prompt })), // Convert array of prompts to user messages
      { role: "user", content: fileInstruction }
    ];

    const response = await axios.post(
      OpenAIURL,
      {
        messages: messages,
        max_tokens: 20000,
        temperature: 0.7,
        top_p: 0.9,
        n: 1,
      },
      {
        headers: {
          "Content-Type": "application/json",
          "api-key": OpenAINamespace, // Azure OpenAI authentication
        },
      }
    );

    if (response.data && response.data.choices && response.data.choices.length > 0) {
      return response.data.choices[0].message.content.trim();
    } else {
      throw new Error("Invalid response from OpenAI API");
    }
  } catch (error: any) {
    console.error("Error calling Azure OpenAI API:", error.response?.data || error.message);
    throw error;
  }
}



app.listen(3002, () => {
  console.log("up and running")
})