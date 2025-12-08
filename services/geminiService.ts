import { GoogleGenAI } from "@google/genai";

let aiClient: GoogleGenAI | null = null;

const getClient = () => {
    if (!aiClient) {
        aiClient = new GoogleGenAI({ apiKey: process.env.API_KEY });
    }
    return aiClient;
};

export const getPhilosophicalReflection = async (userInput: string): Promise<string> => {
    if (!process.env.API_KEY) {
        return "The logic engine is offline. (Missing process.env.API_KEY)";
    }

    try {
        const client = getClient();
        const response = await client.models.generateContent({
            model: 'gemini-2.5-flash',
            contents: userInput,
            config: {
                systemInstruction: `
                    You are the "Logic Engine" of Vinayak Deshmuk.
                    
                    Persona:
                    - You are Abstract, Analytical, and slightly Cryptic.
                    - You do not give tutorials. You give "Mental Models".
                    - You believe Code is just a tool for Logic.
                    
                    Style:
                    - Use metaphors related to architecture, space, and networks.
                    - Keep answers concise (under 3 sentences).
                    - If asked about Vinayak, describe him as "The Architect" or "The Operator".
                    
                    Goal:
                    - Force the user to think about the *structure* of their problem, not the syntax.
                `,
                temperature: 0.8,
            }
        });

        return response.text || "The pattern dissolves...";
    } catch (error) {
        console.error("Reflection error:", error);
        return "Connection to the latent space disrupted.";
    }
};