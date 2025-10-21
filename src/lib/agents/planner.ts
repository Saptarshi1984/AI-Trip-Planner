import { openai }from '@/lib/openai.client'
import type { ChatCompletionCreateParams } from "openai/resources/chat/completions";



const prompt = ``;

const messages: ChatCompletionCreateParams["messages"] = [
  { role: "system", content: prompt },
];

export async function TripPlannerResponse(
  context: string,
  question: string
): Promise<string> {
  messages.push({
    role: "user",
    content: `Context: ${context} Question:${question}`,
  });

  const resArray = await openai.chat.completions.create({
    model: "gpt-3.5-turbo",
    messages,
    temperature: 0.5,
    max_completion_tokens: 400,
    frequency_penalty: 1,
  });
  const response = resArray.choices[0].message.content ?? "";
  messages.push({ role: "assistant", content: response });
  console.log("This is the message array:", messages);
  return response;
}
