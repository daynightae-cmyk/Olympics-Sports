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
      model: 'gemini-3.8-flash',
      contents: [
        {
          role: 'user',
          parts: [
            { inlineData: { mimeType: 'image/png', data: base64Data } },
            { text: 'Identify this product. Choose exactly one option from: swim_goggles_black, swim_goggles_white, swim_cap_black, swim_cap_white, swim_fins, kickboard, football_white, football_black, jersey_black, jersey_white, shorts_black, shorts_white, jacket_black, duffle_bag, bottle, basketball, running_shoes, store_hero. Respond with ONLY the matching option, nothing else.' }
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
  const results = {};
  for (let i = 1; i <= 16; i++) {
    const num = String(i).padStart(2, '0');
    console.log(`Starting product_${num}.png...`);
    const desc = await check(num);
    console.log(`Result [${num}]: ${desc}`);
    results[`product_${num}`] = desc;
    fs.writeFileSync('scripts/products_flash38_desc.json', JSON.stringify(results, null, 2));
    await new Promise(resolve => setTimeout(resolve, 6000));
  }
  console.log('Finished slowly checking all products with gemini-3.8-flash!');
}

main().catch(console.error);
