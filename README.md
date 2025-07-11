# OpenAI ChatGPT Integration

This project demonstrates a minimal ChatGPT integration using the [openai](https://www.npmjs.com/package/openai) package.

## Prerequisites

Set your OpenAI API key in the `OPENAI_API_KEY` environment variable.

```bash
export OPENAI_API_KEY=your-key
```

## Usage

Install dependencies (already installed in this environment) and run the script with your prompt:

```bash
npm run chat -- "Hello, ChatGPT!"
```

The ChatGPT response will be printed to the console.

### Interactive conversation

You can also start an interactive session that keeps track of the conversation history:

```bash
npm run interactive
```

Type messages and press <kbd>Enter</kbd>. Use `exit` to quit the session.
