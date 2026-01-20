
import { GoogleGenAI } from "@google/genai";

// Fix: Initializing GoogleGenAI with named parameter apiKey as per guidelines
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const getCodeHint = async (code: string, error: string, challengeDesc: string) => {
  try {
    // Fix: Using ai.models.generateContent directly with model name and contents
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: `O usuário está tentando resolver este desafio de Python: "${challengeDesc}".
      O código digitado foi:
      \`\`\`python
      ${code}
      \`\`\`
      O erro ou saída incorreta foi: "${error}".
      
      Dê uma dica curta e amigável em português para ajudar o jogador a corrigir o código, sem dar a resposta completa diretamente. Seja encorajador como um mentor robô.`,
    });
    // Fix: Accessing .text property directly (not calling as a function)
    return response.text || "Continue tentando! Você está quase lá.";
  } catch (err) {
    return "Ocorreu um erro ao consultar o mentor, mas não desista! Revise sua lógica.";
  }
};
