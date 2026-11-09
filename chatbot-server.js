require('dotenv').config();

const express = require('express');
const cors = require('cors');

const app = express();

app.use(cors());
app.use(express.json());

const PORT = 5001;

app.post('/api/ai/chat', async (req, res) => {

    try {

        const userMessage = req.body.message;

        if (!userMessage) {
            return res.status(400).json({
                success: false,
                message: 'Message is required'
            });
        }

        const prompt = `
You are the AI assistant for E-STRI, a digital platform
for local ironing and cleaning services.

Help users with:
- Ironing
- Laundry
- Dry cleaning
- Shoe cleaning
- Curtain cleaning
- Booking guidance
- Vendor information
- General E-STRI questions

Rules:
- Answer in simple English.
- Keep answers short and helpful.
- Do not invent prices, vendors or bookings.
- If the question is unrelated to E-STRI, politely say that
you mainly assist with E-STRI services.

User question:
${userMessage}
`;

        const response = await fetch(
            'https://generativelanguage.googleapis.com/v1beta/models/gemini-3.5-flash-lite:generateContent',
            {
                method: 'POST',

                headers: {
                    'Content-Type': 'application/json',
                    'x-goog-api-key': process.env.GEMINI_API_KEY
                },

                body: JSON.stringify({
                    contents: [
                        {
                            parts: [
                                {
                                    text: prompt
                                }
                            ]
                        }
                    ]
                })
            }
        );

        const data = await response.json();

        console.log('Gemini response:', data);

        if (!response.ok) {

            return res.status(500).json({
                success: false,
                message: 'Gemini API failed',
                error: data
            });

        }

        const reply =
            data.candidates?.[0]?.content?.parts?.[0]?.text ||
            'Sorry, I could not generate a response.';

        res.json({
            success: true,
            reply: reply
        });

    } catch (error) {

        console.log('CHATBOT ERROR:', error);

        res.status(500).json({
            success: false,
            message: 'Chatbot error',
            error: error.message
        });

    }

});

app.listen(PORT, () => {

    console.log(`Gemini Chatbot Server running on http://localhost:${PORT}`);

});