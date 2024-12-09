
import Together from "together-ai";
import dotenv from "dotenv";
dotenv.config();

export async function POST(req) {
    console.log("hello");
    const { paragraph } = await req.json();
    console.log(paragraph);
    const together = new Together({
        apiKey: process.env.TOGETHER_API_KEY,
    });

    let getDescriptionPrompt = `just modify this exact paragraph by inserting relevant emojis after every word. do not say anything else or change any word of the paragraph, just insert emojis: \n\n ${paragraph} `;
    
    const stream = await together.chat.completions.create({
        model: "meta-llama/Llama-Vision-Free",
        temperature: 0.2,
        stream: true,
        max_tokens: 500,
        messages: [
          {
            role: "user",
            // @ts-expect-error Need to fix the TypeScript library type
            content: [
              { type: "text", text: getDescriptionPrompt },
            ],
          },
        ],
      });
    
    let generatedParagraph = "";

      for await (const chunk of stream) {
        generatedParagraph += chunk.choices[0]?.delta?.content || "";

      }
      console.log(generatedParagraph);
    
    return new Response(JSON.stringify({ generatedParagraph }), {
      headers: { 'Content-Type': 'application/json' },
    });
}  