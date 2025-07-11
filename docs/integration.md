# Integrating ChatGPT into Your Application

This project provides a minimal example of using the `openai` Node.js package to talk to ChatGPT. Once you are comfortable running the basic scripts, you can incorporate the same logic into other contexts, such as a web server or custom CLI tool.

## Web Backend (Express Example)

Install `express` in your project:

```bash
npm install express
```

Create a small server (e.g. `server.js`):

```javascript
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
```

Run it with:

```bash
node server.js
```

You can then send POST requests with a JSON body `{ "message": "Your prompt" }` to `http://localhost:3000/chat`.

## CLI Tool Integration

To integrate into a larger CLI, you can require the `index.js` logic and call the `chat` function from your own command definitions. Use a library like [`commander`](https://www.npmjs.com/package/commander) or [`yargs`](https://www.npmjs.com/package/yargs`) to define commands, then pass prompts from the command line to ChatGPT.

Example snippet using `commander`:

```javascript
const { Command } = require('commander');
const { chat } = require('./index'); // export chat from index.js

const program = new Command();
program
  .command('ask <prompt>')
  .description('Send a prompt to ChatGPT')
  .action(async (prompt) => {
    await chat(prompt);
  });

program.parse(process.argv);
```

This approach allows you to build a full-featured CLI with multiple subcommands while reusing the ChatGPT logic from this project.
