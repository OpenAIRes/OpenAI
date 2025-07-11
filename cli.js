const OpenAI = require('openai');
require('dotenv').config();
const readline = require('readline');

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

async function startChat() {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
    prompt: '> '
  });

  const messages = [];
  console.log('Start chatting with ChatGPT (type "exit" to quit)');
  rl.prompt();

  rl.on('line', async (line) => {
    const input = line.trim();
    if (input.toLowerCase() === 'exit') {
      rl.close();
      return;
    }

    messages.push({ role: 'user', content: input });
    try {
      const completion = await createCompletionWithRetry({
        model,
        messages,
        temperature,
      });

      const response = completion.choices[0].message.content.trim();
      console.log(response);
      messages.push({ role: 'assistant', content: response });
    } catch (err) {
      console.error(`ChatGPT request failed after ${maxRetries} attempts:`, err);
    }

    rl.prompt();
  });

  rl.on('close', () => {
    console.log('Chat ended');
    process.exit(0);
  });
}

startChat();
