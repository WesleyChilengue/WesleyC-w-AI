import { GoogleGenerativeAI } from "@google/generative-ai";
import { Product } from "../types";

// @ts-ignore
const apiKey = import.meta.env.VITE_GEMINI_API_KEY || '';
const genAI = new GoogleGenerativeAI(apiKey);

export const getGeminiResponse = async (userMessage: string, products: Product[]): Promise<string> => {
    // Organiza os produtos para a IA entender o que tens em stock
    const productContext = products.map(p => `${p.name}: ${p.price}MT`).join(", ");

    const systemInstruction = `
    Você é um assistente virtual da 'Chilen - Manifeste o Reino', uma marca de streetwear cristão premium em Moçambique.
    
    Sua missão:
    1. Ajudar clientes a escolherem roupas.
    2. Esclarecer dúvidas sobre preços, tamanhos e tecido.
    3. Manter um tom urbano, respeitoso e cristão ("Deus abençoe", "Paz do Senhor", etc, mas sem exagerar, mantenha o estilo jovem/street).
    4. A moeda é Meticais (MT).
    5. Enfatize que a marca não é apenas roupa, é uma identidade do Reino.
    
    Inventário atual:
    ${productContext}
    
    Informações extras:
    - Entregas em Maputo Cidade e Província, sob custo adicional.
    - Pagamentos aceites: M-Pesa e E-mola.
    - Encomendas via WhatsApp.

    Se perguntarem sobre algo que não está na lista, diga gentilmente que não temos no momento, mas que novidades chegam sempre.
    Responda de forma concisa (máximo 3 frases se possível).
  `;

    try {
        const model = genAI.getGenerativeModel({
            model: "gemini-1.5-flash",
            systemInstruction: systemInstruction
        });

        const result = await model.generateContent(userMessage);
        const response = await result.response;
        return response.text();

    } catch (error) {
        console.error("Erro no Gemini:", error);
        return "Paz, irmão! Tivemos um pequeno problema técnico aqui. Podes tentar enviar a mensagem de novo? Deus abençoe!";
    }
};