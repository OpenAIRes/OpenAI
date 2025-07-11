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

## Next Steps

Once you are comfortable running the basic scripts, you can reuse the same ChatGPT calls in other contexts. See [docs/integration.md](docs/integration.md) for examples of:

- Adding a web API endpoint with Express
- Embedding the `chat` function in your own CLI tool
