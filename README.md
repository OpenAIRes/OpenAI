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
