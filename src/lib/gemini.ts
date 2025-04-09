import { GoogleGenAI } from "@google/genai";
import { loadEnv } from "./utils";

loadEnv();

const API_KEY = process.env.GEMINI_API_KEY as string;

const ai = new GoogleGenAI({ apiKey: API_KEY });

export async function askGemini(prompt: string) {
  const response = await ai.models.generateContent({
    model: "gemini-2.0-flash",
    contents: prompt,
  });

  return response.text;
}
