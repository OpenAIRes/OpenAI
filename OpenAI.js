import OpenAI from "openai";

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
