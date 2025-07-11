const OpenAI = require('openai');
require('dotenv').config();
const client = new OpenAI();

const model = process.env.OPENAI_MODEL || 'gpt-4o';
const temperature = process.env.OPENAI_TEMPERATURE
  ? parseFloat(process.env.OPENAI_TEMPERATURE)
  : undefined;

async function chat(prompt) {
  try {
    const completion = await client.chat.completions.create({
      model,
      messages: [{ role: 'user', content: prompt }],
      temperature,
    });
    console.log(completion.choices[0].message.content.trim());
  } catch (err) {
    console.error('ChatGPT request failed:', err);
  }
}

const prompt = process.argv.slice(2).join(' ');
if (!prompt) {
  console.error('Usage: node index.js <your prompt>');
  process.exit(1);
}

chat(prompt);
