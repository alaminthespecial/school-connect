// summerizer.js
import { TextServiceClient } from '@google-ai/generativelanguage';
import { GoogleAuth } from 'google-auth-library';


const client = new TextServiceClient({
  authClient: new GoogleAuth().fromAPIKey(process.env.NEXT_PUBLIC_FIREBASE_MODEL_API_KEY),
});

export async function POST(request) {
  try {
    const reqBody = await request.json();


    // const textC=`your task is to generate  10 'multiple choice with options ${reqBody.questionType} only' questions  and answer options based on the following syllabus ${reqBody.syllabus} return the respone as structured Questions in the following format `;
    const textC = `Your task is to provide me 3 subject area i should focus during my secondary to become a ${reqBody.syllabus} `;


    const summarizationResponse = await client.generateText({
      model: process.env.NEXT_PUBLIC_FIREBASE_MODEL_NAME,
      temperature: 0.6,
      candidateCount: 1,
      top_k: 40,
      top_p: 0.95,
      max_output_tokens: 1024,
      stop_sequences: [],
      safety_settings: [
        { "category": "HARM_CATEGORY_DEROGATORY", "threshold": 1 },
        { "category": "HARM_CATEGORY_TOXICITY", "threshold": 1 },
        { "category": "HARM_CATEGORY_VIOLENCE", "threshold": 2 },
        { "category": "HARM_CATEGORY_SEXUAL", "threshold": 2 },
        { "category": "HARM_CATEGORY_MEDICAL", "threshold": 2 },
        { "category": "HARM_CATEGORY_DANGEROUS", "threshold": 2 }
      ],
      prompt: {
        text: textC,
      },
    });
    console.log("route summarizer",typeof summarizationResponse[0].candidates[0].output);
   
    if (summarizationResponse[0]) {
      // const summarizeContent = JSON.stringify(summarizationResponse[0].candidates[0].output, null, 2);
        
        
      return new Response(
        JSON.stringify({
        message: "Questions generated successfully",
        syllabus: reqBody.syllabus,
        summarization: summarizationResponse[0].candidates[0].output,
      }), {
        status: 200,
        headers: { 'Content-Type': 'application/json' },
      });
    } else {
      console.log('No candidates found in the result.');

      return new Response(JSON.stringify({
        message: "URL summarized successfully",
        syllabus: reqBody.syllabus,
        summarization: "Unable to summarize content",
      }), {
        status: 200,
        headers: { 'Content-Type': 'application/json' },
      });
    }
  } catch (error) {
    console.error("this is questions route Server error:", error);

    return new Response(JSON.stringify({ message: "Internal Server Error this for question route" }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}