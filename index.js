const OpenAI = require('openai');
require('dotenv').config();
const client = new OpenAI();

const maxRetries = parseInt(process.env.OPENAI_MAX_RETRIES || '3', 10);

const model = process.env.OPENAI_MODEL || 'gpt-4o';
const temperature = process.env.OPENAI_TEMPERATURE
  ? parseFloat(process.env.OPENAI_TEMPERATURE)
  : undefined;

async function createCompletionWithRetry(options) {
  for (let attempt = 1; attempt <= maxRetries; attempt++) {
    try {
      return await client.chat.completions.create(options);
    } catch (err) {
      console.error(`ChatGPT request failed (attempt ${attempt}/${maxRetries}):`, err);
      if (attempt === maxRetries) {
        throw err;
      }
      const delay = 1000 * attempt;
      await new Promise((resolve) => setTimeout(resolve, delay));
    }
  }
}

async function chat(prompt) {
  try {
    const completion = await createCompletionWithRetry({
      model,
      messages: [{ role: 'user', content: prompt }],
      temperature,
    });
    console.log(completion.choices[0].message.content.trim());
  } catch (err) {
    console.error(`ChatGPT request failed after ${maxRetries} attempts:`, err);
  }
}

const prompt = process.argv.slice(2).join(' ');
if (!prompt) {
  console.error('Usage: node index.js <your prompt>');
  process.exit(1);
}

chat(prompt);
