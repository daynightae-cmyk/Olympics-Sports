import { GoogleGenAI } from '@google/genai';
import fs from 'fs';
import path from 'path';

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

async function check(num) {
  const imgPath = path.join(process.cwd(), 'public/media/user-products', `product_${num}.png`);
  if (!fs.existsSync(imgPath)) return 'Missing';
  const base64Data = fs.readFileSync(imgPath).toString('base64');
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3.5-flash',
      contents: [
        {
          role: 'user',
          parts: [
            { inlineData: { mimeType: 'image/png', data: base64Data } },
            { text: 'Describe in 3-5 words exactly what product this is (e.g. "Black soccer jersey with gold lion logo")' }
          ]
        }
      ]
    });
    return response.text?.trim() || 'Unknown';
  } catch (err) {
    return 'Error: ' + err.message;
  }
}

async function main() {
  const start = parseInt(process.argv[2]) || 1;
  const end = parseInt(process.argv[3]) || 16;
  for (let i = start; i <= end; i++) {
    const num = String(i).padStart(2, '0');
    const desc = await check(num);
    console.log(`PRODUCT_${num}: ${desc}`);
  }
}

main().catch(console.error);
