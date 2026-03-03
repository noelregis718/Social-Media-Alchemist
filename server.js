const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const { GoogleGenerativeAI } = require('@google/generative-ai');

dotenv.config();

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Initialize Gemini API
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || "");

app.post('/api/generate', async (req, res) => {
  const { topic, platform, additionalDetails } = req.body;

  if (!process.env.GEMINI_API_KEY) {
    return res.status(500).json({ error: 'GEMINI_API_KEY is not configured in .env' });
  }

  try {
    const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

    const prompts = {
      linkedin: `Act as a world-class LinkedIn personal branding expert. Write a highly engaging LinkedIn post about: "${topic}". 
        Additional details: ${additionalDetails}. 
        Requirements:
        1. Start with a "scroll-stopping" hook.
        2. Use a professional yet conversational tone.
        3. Break text into short, readable paragraphs.
        4. Include 3-5 relevant hashtags.
        5. End with a thought-provoking call to action (CTA).`,
      
      twitter: `Act as a viral Twitter (X) growth expert. Write a powerful, punchy tweet about: "${topic}".
        Additional details: ${additionalDetails}.
        Requirements:
        1. Must be under 280 characters.
        2. Use a strong hook.
        3. Include 2-3 trending hashtags.
        4. Make it highly shareable.`,
      
      instagram: `Act as a top Instagram marketing specialist. Write a captivating caption for an Instagram post about: "${topic}".
        Additional details: ${additionalDetails}.
        Requirements:
        1. Engaging first line.
        2. Storytelling approach.
        3. Include a "Save this for later" or "Double tap" CTA.
        4. Include a block of 10-15 relevant hashtags.
        5. Use emojis naturally.`,

      facebook: `Act as a social media engagement specialist. Write a friendly and engaging Facebook post about: "${topic}".
        Additional details: ${additionalDetails}.
        Requirements:
        1. Relatable and community-focused tone.
        2. Clear call to action to comment or share.
        3. Use 2-3 emojis.
        4. Keep it concise but personal.`,

      tiktok: `Act as a TikTok content strategist. Write a high-energy script/caption for a TikTok video about: "${topic}".
        Additional details: ${additionalDetails}.
        Requirements:
        1. Ultra-fast hook for the first 3 seconds.
        2. Use trending terminology.
        3. Include 5-7 viral hashtags.
        4. Short, punchy sentences.`,

      youtube: `Act as a YouTube growth expert. Write a compelling YouTube Community Post about: "${topic}".
        Additional details: ${additionalDetails}.
        Requirements:
        1. Engaging question to spark comments.
        2. Informative yet casual.
        3. Use 1-2 relevant emojis.
        4. Strong call to action for subscribers.`,

      threads: `Act as a Threads engagement expert. Write a conversational, "human" post for Threads about: "${topic}".
        Additional details: ${additionalDetails}.
        Requirements:
        1. Authentic and unpolished feel.
        2. Provoke a conversation or debate.
        3. No hashtags (native to Threads style).
        4. Under 500 characters.`
    };

    const prompt = prompts[platform] || prompts.linkedin;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();

    res.json({ content: text });
  } catch (error) {
    console.error('Error generating content:', error);
    res.status(500).json({ error: 'Failed to generate content' });
  }
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
