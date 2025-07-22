import OpenAI from "openai";
const client = new OpenAI();

const response = await client.responses.create({
    model: "gpt-4.1",
    input: "Write a one-sentence bedtime story about a unicorn."
});

console.log(response.output_text);

const chatCompletion = await client.chat.completions.create({
    model: "gpt-3.5-turbo",
    messages: [{ role: "user", content: "Say hello to a new user." }]
});

console.log(chatCompletion.choices[0].message.content);

const embedding = await client.embeddings.create({
    model: "text-embedding-3-small",
    input: "OpenAI provides a powerful API."
});

console.log(embedding.data[0].embedding.length);
