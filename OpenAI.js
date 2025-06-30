import OpenAI from "openai";
import { HttpsProxyAgent } from "https-proxy-agent";

const proxy = process.env.HTTPS_PROXY || "http://proxy:8080";
const agent = new HttpsProxyAgent(proxy);

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
  httpAgent:  agent,   // plain-HTTP requests (rare)
  httpsAgent: agent,   // HTTPS requests (everything to api.openai.com)
});

const chat = await openai.chat.completions.create({
  model: "gpt-4o",
  messages: [{ role: "user", content: "Hello from behind a proxy!" }],
});
console.log(chat.choices[0].message.content);


async function main() {
    const apiKey = process.env.OPENAI_API_KEY;
    const client = new OpenAI({ apiKey });

    if (!apiKey) {
        console.error("Missing OPENAI_API_KEY environment variable.");
        return;
    }

    try {
        const response = await client.responses.create({
            model: "gpt-4o",
            input: "Write a one-sentence bedtime story about a unicorn.",
        });
        console.log(response.output_text);
    } catch (err) {
        console.error("Error calling OpenAI API:", err);
    }
}

main();
