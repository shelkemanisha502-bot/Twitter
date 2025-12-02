import { GoogleGenAI } from "@google/genai";
import { AISuggestionType } from "../types";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const generateTweetEnhancement = async (
  currentText: string,
  type: AISuggestionType
): Promise<string> => {
  if (!currentText.trim()) return "";

  let prompt = "";
  
  switch (type) {
    case AISuggestionType.FIX_GRAMMAR:
      prompt = `Fix the grammar and spelling of the following social media post. Keep the tone natural. Return ONLY the fixed text.\n\nText: "${currentText}"`;
      break;
    case AISuggestionType.MAKE_FUNNY:
      prompt = `Rewrite the following social media post to be humorous and witty. Return ONLY the new text.\n\nText: "${currentText}"`;
      break;
    case AISuggestionType.MAKE_PROFESSIONAL:
      prompt = `Rewrite the following social media post to be professional and polished suitable for LinkedIn or a business context. Return ONLY the new text.\n\nText: "${currentText}"`;
      break;
    case AISuggestionType.GENERATE_HASHTAGS:
      prompt = `Append 3-5 relevant and trending hashtags to the end of the following social media post. Return the full text including the hashtags.\n\nText: "${currentText}"`;
      break;
    default:
      return currentText;
  }

  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
    });
    
    return response.text?.trim() || currentText;
  } catch (error) {
    console.error("Gemini API Error:", error);
    throw error;
  }
};