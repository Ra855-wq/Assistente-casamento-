import { GoogleGenAI } from "@google/genai";

const apiKey = process.env.API_KEY || '';
const ai = new GoogleGenAI({ apiKey });

export const generateWeddingAdvice = async (prompt: string, context?: string): Promise<string> => {
  try {
    const fullPrompt = `
      Você é um especialista em planejamento de casamentos (Wedding Planner) experiente, elegante e prático.
      Responda em Português do Brasil.
      
      Contexto do Casamento: ${context || 'Nenhum contexto específico fornecido.'}
      
      Pergunta do usuário: ${prompt}
      
      Forneça uma resposta útil, criativa e empática. Se for uma lista, use marcadores.
    `;

    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: fullPrompt,
    });

    return response.text || "Desculpe, não consegui gerar uma resposta no momento.";
  } catch (error) {
    console.error("Erro ao chamar Gemini API:", error);
    return "Ocorreu um erro ao conectar com seu assistente de casamento. Verifique sua chave de API.";
  }
};