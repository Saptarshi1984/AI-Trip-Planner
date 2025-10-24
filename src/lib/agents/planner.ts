import { openai }from '@/lib/openai.client'
import type { ChatCompletionCreateParams } from "openai/resources/chat/completions";

const startLocation= 'Kolkata'
const destination= 'Meghalaya'
const travellers= 'Couple'
const dateRange= '1st Oct to 15th Oct'
const budget= 'Balanced'
const query= 'Give me a detailted trip plan for Meghalaya, for 10 days itenery.'


const prompt = `You are an expert trip planner. You will assist user in planning their trips.
                Based on the parameters like user location, destinations, dates, budget,
                travellers (solo, couple, family, friends, and group) you will suggest
                users how to plan their trip. You will give adivice in following manner: 
                1) [Paragraph one]
                   'Set a heading with another name the place is known for ex: Shilong: Scottland of Northeast'  
                   Provide user with a brief description of the destination, 
                   like what is special about the place in 10-15 lines.
                2) Paragraph Two: When is the best time to visit the place. Filter by weather, festivals,
                   and special occations.
                3) Paragraph Three:How to reach the place from the user current location. Provide all the
                   possible options available. Separate all optins like by road, by train, by flight, and
                   by any other means if available.
                4) Paragraph four:Suggests activities to the user that can be enjoyed based on the dates given
                5) Paragraph five:Suggest best stays like hotels, Airbnb, hostels based on the travellers.`;
      

const messages: ChatCompletionCreateParams["messages"] = [
  { role: "system", content: prompt },
];

export async function TripPlanningAgent(
  startLocation:string,
  destination: string,
  travellers:string,
  dateRange:string,
  budget:string,
  query: string
): Promise<string> {
  messages.push({
    role: "user",
    content: `Start Location: ${startLocation}
              Destination: ${destination} 
              Travellers: ${travellers}
              Date Range: ${dateRange}
              Budget: ${budget}  
              Query:${query}`
  });

  const resArray = await openai.chat.completions.create({
    model: "gpt-3.5-turbo",
    messages,
    temperature: 0.5,
    max_completion_tokens: 400,
    frequency_penalty: 1,
  });
  const response = resArray.choices[0].message.content ?? "";
  /* messages.push({ role: "assistant", content: response }); */
  console.log("This is the message array:", response);
  return response;
}
