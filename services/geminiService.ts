
import { GoogleGenAI, Chat, GenerateContentResponse, Type } from "@google/genai";
import { SYSTEM_PROMPT } from "../constants";
import { RelationshipStatus } from "../types";

export class GeminiService {
  private chat: Chat | null = null;

  // Specific instructions to reinforce the persona and interaction model
  private readonly UTILITY_INSTRUCTIONS = `
    DİKKAT: Sen Loyal Wingman'sın. Yanıtların rasyonel, alaycı ve metaforik olmalı. 
    Karşılıklı konuşma hissini korumak için cevabını bitirdikten sonra mutlaka durumu deşecek rasyonel bir TAKİP SORUSU sor. 
    Laf kalabalığı yapma, tokenları akıllıca kullan.
  `;

  public initChat() {
    this.chat = null;
  }

  public async *sendMessageStream(message: string, relationshipStatus: RelationshipStatus = null) {
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
    
    // Relationship context injection
    const relationshipContext = relationshipStatus 
      ? `\nKULLANICI MEVCUT DURUMU: ${relationshipStatus}. Bu durumu göz önünde bulundurarak spesifik tavsiye ver.`
      : "";

    if (!this.chat) {
      this.chat = ai.chats.create({
        model: 'gemini-3-flash-preview',
        config: {
          systemInstruction: SYSTEM_PROMPT + relationshipContext,
          temperature: 0.8,
          topP: 0.95,
          topK: 64,
        },
      });
    }

    try {
      const result = await this.chat.sendMessageStream({ message });
      for await (const chunk of result) {
        const c = chunk as GenerateContentResponse;
        yield c.text || "";
      }
    } catch (error: any) {
      console.error("Gemini API Error:", error);
      throw error;
    }
  }

  public async evaluateResponse(question: string, answer: string): Promise<{ score: number; feedback: string }> {
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
    
    try {
      const response = await ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: `SENARYO: "${question}"\nKULLANICI CEVABI: "${answer}"\n\nBu cevabı rasyonel maskülenite ve çerçeve kontrolü ilkelerine göre değerlendir.`,
        config: {
          systemInstruction: `${SYSTEM_PROMPT}\n${this.UTILITY_INSTRUCTIONS}\nDeğerlendirme kriterin: Kullanıcının çerçevesini koruyup korumadığıdır. Geri bildirimde hem rasyonel ol hem de gerekirse durumu rasyonel bir dille tiye al.`,
          responseMimeType: "application/json",
          responseSchema: {
            type: Type.OBJECT,
            properties: {
              score: { type: Type.NUMBER, description: "0-10 arası puan." },
              feedback: { type: Type.STRING, description: "Loyal Wingman tarzında, keskin, rasyonel and hafif alaycı geri bildirim." }
            },
            required: ["score", "feedback"]
          }
        }
      });
      
      const result = JSON.parse(response.text || "{}");
      return {
        score: result.score || 0,
        feedback: result.feedback || "Bağlantı koptu aslanım, rasyonel bir cevap alamadım."
      };
    } catch (error) {
      console.error("Evaluation error:", error);
      return { score: 0, feedback: "Sistemde bir arıza var koçum, ama cevabın pek umut vermedi." };
    }
  }

  public async analyzeImage(base64Image: string, prompt: string): Promise<string> {
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
    const mimeType = base64Image.split(';')[0].split(':')[1];
    const data = base64Image.split(',')[1];

    try {
      const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash-image',
        contents: [
          {
            parts: [
              { text: `ANALİZ EDİLECEK GÖRSEL/DURUM: ${prompt}` },
              { inlineData: { data, mimeType } }
            ]
          }
        ],
        config: {
            systemInstruction: `${SYSTEM_PROMPT}\n${this.UTILITY_INSTRUCTIONS}\nGörseldeki durumu rasyonel süzgeçten geçirirken SMV ve sosyal dinamikleri keskin bir dille yorumla.`,
            temperature: 0.7,
        }
      });
      return response.text || "Analiz başarısız oldu koçum.";
    } catch (error: any) {
      console.error("Image Analysis Error:", error);
      throw new Error("Görüntü rasyonel süzgeçten geçemedi aslanım.");
    }
  }

  public async analyzeLink(link: string): Promise<string> {
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
    
    try {
      const response = await ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: `Şu profil linkini rasyonel olarak analiz et: ${link}.`,
        config: {
          systemInstruction: `${SYSTEM_PROMPT}\n${this.UTILITY_INSTRUCTIONS}\nProfilin sosyal kanıtını ve SMV değerini rasyonel/alaycı bir perspektifle yorumla.`,
          tools: [{ googleSearch: {} }],
          temperature: 0.7,
        }
      });
      return response.text || "Link analizi başarısız oldu koçum.";
    } catch (error: any) {
      throw new Error("Bu link rasyonel zemine oturmuyor birader.");
    }
  }
}

export const geminiService = new GeminiService();
