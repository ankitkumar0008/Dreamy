

const api_Key = import.meta.env.VITE_API_KEY;


import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({apiKey:api_Key});

async function runchat(prompt) {
  const response = await ai.models.generateContent({
    model: "gemini-3-flash-preview",
    contents: prompt,
  });
  
  return response.text
}

export default runchat;