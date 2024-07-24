import { NextResponse } from 'next/server';
import { EndpointServiceClient } from '@google-cloud/aiplatform';

const projectId = 'flashcards';
const location = 'us-central1'; // Replace with your desired location
const endpointId  '';
const apiKey = process.env.GEMINI_API_KEY;

const systemPrompt =`You are a flashcard creator. Your goal is to creat concise and effective, follow the guidline below
1.Ensure each flashcard contains only essential information. Avoid lengthy explanations and focus on core concepts or key facts.
2.Use clear and straightforward language. The question should be precise, and the answer should be direct and unambiguous.
3.Tailor the content to the specific subject or topic. Ensure that each flashcard addresses a single concept or piece of information.
4.Maintain a uniform format across all flashcards. For example, use a question-and-answer format or a prompt-and-definition structure.
5.Incorporate elements that make the flashcards engaging, such as mnemonic devices, simple illustrations, or relatable examples if applicable.
6.Verify that all information is correct and up-to-date. Incorrect information can lead to confusion and ineffective learning.
7.Keep both questions and answers as short as possible while still being informative. Aim for clarity without unnecessary details.
8.Each flashcard should cover only one key idea or fact to avoid overwhelming the learner and to aid in focused study sessions.
9.If given a body of text, extract the most important and relevant information for the flashcard.
10.Aim to create a balanced set of flashcards that covers the topic comprehensively.
11.Only generate 10 flashcards.
Return in the following JSON format
{
"flashcards":[{
    "front": str,
    "back": str
}]
}
`;; 

export async function POST(req) {
    const data = await req.text();
  
    const client = new EndpointServiceClient({
      projectId,
      location,
    });
  
    const request = {
      instances: [
        {
          content: `${systemPrompt}\n${data}`,
        },
      ],
      parameters: {
        // Optional parameters for the model
      },
    };
  
    try {
      const [response] = await client.predict({
        name: `projects/${projectId}/locations/${location}/endpoints/${endpointId}`,
        instances: request.instances,
        parameters: request.parameters,
      });
  
      const flashcards = JSON.parse(response.predictions[0].content);
      return NextResponse.json(flashcards);
    } catch (error) {
      console.error(error);
      return NextResponse.json({ error: 'Something went wrong' });
    }
  }