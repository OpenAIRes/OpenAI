# OpenAI ChatGPT Integration

This project demonstrates a minimal ChatGPT integration using the [openai](https://www.npmjs.com/package/openai) package.

## Prerequisites

Create a `.env` file and set your OpenAI API key in it:

```bash
echo "OPENAI_API_KEY=your-key" > .env
```

The script loads this file automatically using [dotenv](https://www.npmjs.com/package/dotenv).

## Usage

Install dependencies (already installed in this environment) and run the script with your prompt:

```bash
npm run chat -- "Hello, ChatGPT!"
```

The ChatGPT response will be printed to the console.

## Interactive Chat

For a multi-turn conversation that keeps a conversation history, run:

```bash
npm run interactive
```

Type messages and press Enter to send them. Use `exit` to quit.
Conversation history is saved to `history.json` in the project root. Set
`OPENAI_HISTORY_FILE` in your `.env` file to use a different path.

## API Configuration

You can adjust request parameters like `model` and `temperature` via environment
variables. Set them in your `.env` file:

```bash
echo "OPENAI_MODEL=gpt-4o" >> .env
echo "OPENAI_TEMPERATURE=0.7" >> .env
echo "OPENAI_MAX_RETRIES=3" >> .env
echo "OPENAI_HISTORY_FILE=history.json" >> .env
```
The `OPENAI_MAX_RETRIES` value controls how many times the scripts retry a
failed API request before giving up.

These values are passed directly to `client.chat.completions.create`. See the
[Chat Completions API docs](https://platform.openai.com/docs/api-reference/chat/create)
for details on available parameters.
