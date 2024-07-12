import axios from 'axios';

const openaiApiKey = process.env.OPENAI_API_KEY;

export async function POST(req: Request) {

    const body = await req.json();

    const { base64_image } = body;

    if (!base64_image) {
        return new Response(`Base64 image is required`, {
            status: 400
        });
    }

    const headers = {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${openaiApiKey}`,
    };

    const payload = {
        model: 'gpt-4o',
        messages: [
            {
                role: 'user',
                content: [
                    {
                        type: 'text',
                        text: "This image is about chat history. I want to reply to last message. There are conditions about that like following: Imagine a woman's (if necessary) fascinating reaction to this text. Use a provocative tone. Don't write in a literary manner. Avoid passion. Build mystery. Basic vocabulary. No questions. Just give answers without quotes. Responses should be a maximum of 15 words.",
                    },
                    {
                        type: 'image_url',
                        image_url: {
                            url: `data:image/jpeg;base64,${base64_image}`,
                        },
                    },
                ],
            },
        ],
        max_tokens: 300,
    };

    try {
        const response = await axios.post('https://api.openai.com/v1/chat/completions', payload, { headers });
        return new Response(JSON.stringify(response.data));
    } catch (error) {
        return new Response(`Error making request to OpenAI API`, {
            status: 500
        });
    }
}