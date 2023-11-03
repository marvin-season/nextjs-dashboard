import { OpenAI } from "openai";

const openai = new OpenAI({
    apiKey: process.env.OPEN_API_KEY,
})

export const chat = async () => {
    const response = await openai.chat.completions.create({
        model: "gpt-3.5-turbo-0301",
        messages: [{ "role": "system", "content": "You are a helpful assistant." },
        { "role": "user", "content": "Who won the world series in 2020?" },
        { "role": "assistant", "content": "The Los Angeles Dodgers won the World Series in 2020." },
        { "role": "user", "content": "Where was it played?" }],
    });

    console.log('response', response);

}