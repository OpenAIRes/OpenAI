const express = require('express');
const OpenAI = require('openai');
const client = new OpenAI();

const app = express();
app.use(express.json());

app.post('/chat', async (req, res) => {
  try {
    const userMessage = req.body.message;
    const completion = await client.chat.completions.create({
      model: 'gpt-4o',
      messages: [{ role: 'user', content: userMessage }],
    });
    res.json({ response: completion.choices[0].message.content.trim() });
  } catch (err) {
    console.error('ChatGPT request failed:', err);
    res.status(500).json({ error: 'Failed to get response from ChatGPT' });
  }
});

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Server listening on port ${port}`));
