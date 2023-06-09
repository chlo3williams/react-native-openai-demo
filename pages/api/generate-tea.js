import { Configuration, OpenAIApi } from 'openai';

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

export default async function (req, res) {
  const { calMin, calMax } = req.body;
  const completion = await openai.createCompletion({
    model: 'text-davinci-003',
    prompt: generatePrompt(calMin, calMax),
    temperature: 0.6,
    max_tokens: 2048,
  });
  res.status(200).json({ result: completion.data.choices[0].text });
}

function generatePrompt(calMin, calMax) {
  return `suggest 3 meal ideas between ${calMin} and ${calMax} calories and include nutritional value details and link to the full recipe.`;
}

/**
 * Tea ideas
 * calories
 * macros
 * nutrional value
 * exclude
 */

