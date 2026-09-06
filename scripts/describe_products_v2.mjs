import { GoogleGenAI } from '@google/genai';
import fs from 'fs';
import path from 'path';

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

async function main() {
  const jsonPath = 'scripts/products_quick_desc.json';
  let results = {};
  if (fs.existsSync(jsonPath)) {
    try {
      results = JSON.parse(fs.readFileSync(jsonPath, 'utf8'));
    } catch (e) {
      results = {};
    }
  }

  for (let i = 1; i <= 16; i++) {
    const num = String(i).padStart(2, '0');
    const key = `product_${num}`;
    
    // Skip if we already successfully analyzed it and it's not an error or "Unknown"
    if (results[key] && !results[key].startsWith('Error') && results[key] !== 'Unknown') {
      console.log(`Skipping product_${num} (already done: ${results[key]})`);
      continue;
    }

    const imgPath = path.join(process.cwd(), 'public/media/user-products', `product_${num}.png`);
    if (!fs.existsSync(imgPath)) {
      console.log(`File not found: ${imgPath}`);
      continue;
    }

    const base64Data = fs.readFileSync(imgPath).toString('base64');
    console.log(`Analyzing product_${num}.png with 14s delay...`);
    
    try {
      const response = await ai.models.generateContent({
        model: 'gemini-3.5-flash',
        contents: [
          {
            role: 'user',
            parts: [
              {
                inlineData: {
                  mimeType: 'image/png',
                  data: base64Data
                }
              },
              {
                text: 'Tell me in 3-5 words exactly what product this is, e.g., "Black and gold swimming goggles", "White soccer ball", "Black training shorts", etc.'
              }
            ]
          }
        ]
      });
      const desc = response.text?.trim() || 'Unknown';
      console.log(`Result [${num}]: ${desc}`);
      results[key] = desc;
    } catch (err) {
      console.error(`Error on product ${num}:`, err.message);
      results[key] = 'Error: ' + err.message;
    }

    // Write on every step so we don't lose progress!
    fs.writeFileSync(jsonPath, JSON.stringify(results, null, 2));

    // Wait 14 seconds to strictly obey the 5 RPM rate limit!
    await new Promise(resolve => setTimeout(resolve, 14000));
  }
  console.log('Finished analyzing all products!');
}

main().catch(console.error);
