const readline = require('readline');
const OpenAI = require('openai');
const client = new OpenAI();

const messages = [];

async function sendPrompt(prompt) {
  messages.push({ role: 'user', content: prompt });
  const completion = await client.chat.completions.create({
    model: 'gpt-4o',
    messages,
  });
  const response = completion.choices[0].message.content.trim();
  console.log(response);
  messages.push({ role: 'assistant', content: response });
}

const rl = readline.createInterface({ input: process.stdin, output: process.stdout });
console.log('Start chatting with ChatGPT (type "exit" to quit):');
rl.setPrompt('> ');
rl.prompt();

rl.on('line', async (line) => {
  const input = line.trim();
  if (input.toLowerCase() === 'exit') {
    rl.close();
    return;
  }
  try {
    await sendPrompt(input);
  } catch (err) {
    console.error('ChatGPT request failed:', err.message);
  }
  rl.prompt();
}).on('close', () => {
  console.log('Goodbye!');
  process.exit(0);
});
