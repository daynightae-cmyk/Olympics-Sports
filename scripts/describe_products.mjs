import { GoogleGenAI } from '@google/genai';
import fs from 'fs';
import path from 'path';

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

async function main() {
  const results = [];
  for (let i = 1; i <= 16; i++) {
    const num = String(i).padStart(2, '0');
    const imgPath = path.join(process.cwd(), 'public/media/user-products', `product_${num}.png`);
    if (!fs.existsSync(imgPath)) continue;
    const base64Data = fs.readFileSync(imgPath).toString('base64');
    
    try {
      const response = await ai.models.generateContent({
        model: 'gemini-3.8-flash',
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
                text: `You are cataloging official sports merchandise for United Olympics Sports. 
Analyze this product image. Return a raw JSON object (and nothing else, no markdown codeblock):
{
  "index": ${i},
  "file": "product_${num}.png",
  "category": "swimming" | "football" | "apparel" | "accessories" | "equipment" | "basketball",
  "typeEn": "...",
  "typeAr": "...",
  "titleEn": "...",
  "titleAr": "...",
  "descriptionEn": "...",
  "descriptionAr": "...",
  "colorNameEn": "...",
  "colorNameAr": "...",
  "primaryColorHex": "#...",
  "suggestedPriceAED": 120
}`
              }
            ]
          }
        ]
      });
      const text = response.text?.trim() || '';
      console.log(`Product ${num}:`, text);
      results.push(text);
    } catch (err) {
      console.error(`Error on product ${num}:`, err.message);
    }
  }
  fs.writeFileSync('scripts/products_analysis.json', JSON.stringify(results, null, 2));
}

main().catch(console.error);
