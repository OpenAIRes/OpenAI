// index.mjs  (or set "type":"module" in package.json)
import OpenAI from "openai";
import { HttpsProxyAgent } from "https-proxy-agent";

// ---- proxy setup -----------------------------------------------------------
const proxyUrl = process.env.HTTPS_PROXY || "http://proxy:8080";
const proxyAgent = new HttpsProxyAgent(proxyUrl);

// ---- OpenAI client ---------------------------------------------------------
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
  httpAgent:  proxyAgent,
  httpsAgent: proxyAgent,
});

// ---------------------------------------------------------------------------
// example 1 – simple greeting
const chat = await openai.chat.completions.create({
  model: "gpt-4o",
  messages: [{ role: "user", content: "Hello from behind a proxy!" }],
});
console.log("gpt-4o says:", chat.choices[0].message.content);

// example 2 – one-sentence bedtime story
const story = await openai.chat.completions.create({
  model: "gpt-4o",
  messages: [
    { role: "user", content: "Write a one-sentence bedtime story about a unicorn." },
  ],
});
console.log("Bedtime story:", story.choices[0].message.content);

