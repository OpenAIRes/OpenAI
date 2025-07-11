const OpenAI = require('openai');
require('dotenv').config();
const readline = require('readline');

const client = new OpenAI();

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
      const completion = await client.chat.completions.create({
        model: 'gpt-4o',
        messages
      });

      const response = completion.choices[0].message.content.trim();
      console.log(response);
      messages.push({ role: 'assistant', content: response });
    } catch (err) {
      console.error('ChatGPT request failed:', err);
    }

    rl.prompt();
  });

  rl.on('close', () => {
    console.log('Chat ended');
    process.exit(0);
  });
}

startChat();
