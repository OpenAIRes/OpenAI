import OpenAI from "openai";
const client = new OpenAI();

const completion = await client.chat.completions.create({
    model: "gpt-4.1",
    messages: [
        {
            role: "user",
            content: "",
        },
    ],
    logprobs: true,
    store: true,
    top_logprobs: 20,
});

console.log(completion.choices[0].message.content);