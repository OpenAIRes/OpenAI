const OpenAI = require('openai');
const client = new OpenAI();

async function chat(prompt) {
  try {
    const completion = await client.chat.completions.create({
      model: 'gpt-4o',
      messages: [{ role: 'user', content: prompt }],
    });
    console.log(completion.choices[0].message.content.trim());
  } catch (err) {
    console.error('ChatGPT request failed:', err);
  }
}

if (require.main === module) {
  const prompt = process.argv.slice(2).join(' ');
  if (!prompt) {
    console.error('Usage: node index.js <your prompt>');
    process.exit(1);
  }
  chat(prompt);
}

module.exports = { chat };
