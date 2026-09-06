#!/usr/bin/env bash
urls=(
  "https://i.postimg.cc/3wNVhZJj/Chat-GPT-Image-Sep-5-2026-01-46-30-PM.png"
  "https://i.postimg.cc/Dz0Hhcyd/Chat-GPT-Image-Sep-5-2026-01-46-33-PM.png"
  "https://i.postimg.cc/qvjSWF0G/Chat-GPT-Image-Sep-5-2026-01-46-42-PM.png"
  "https://i.postimg.cc/g2NQ17dw/Chat-GPT-Image-Sep-5-2026-01-53-36-PM.png"
  "https://i.postimg.cc/HkBRFNHL/Chat-GPT-Image-Sep-5-2026-01-53-40-PM.png"
  "https://i.postimg.cc/7ZmdjRDD/Chat-GPT-Image-Sep-5-2026-01-53-42-PM-(1).png"
  "https://i.postimg.cc/bwz4CPXJ/Chat-GPT-Image-Sep-5-2026-01-53-45-PM.png"
  "https://i.postimg.cc/XYVtHWMV/Chat-GPT-Image-Sep-5-2026-01-53-48-PM.png"
  "https://i.postimg.cc/pL23GvNP/Chat-GPT-Image-Sep-5-2026-01-53-48-PM-(1).png"
  "https://i.postimg.cc/htSNyBkH/Chat-GPT-Image-Sep-5-2026-01-53-50-PM.png"
  "https://i.postimg.cc/9QWs8h68/Chat-GPT-Image-Sep-5-2026-01-53-51-PM.png"
  "https://i.postimg.cc/xTGW3C4F/Chat-GPT-Image-Sep-5-2026-01-53-55-PM.png"
  "https://i.postimg.cc/Kv7dDzHH/Chat-GPT-Image-Sep-5-2026-01-53-58-PM.png"
  "https://i.postimg.cc/4NvrQdS8/Chat-GPT-Image-Sep-5-2026-01-54-00-PM.png"
  "https://i.postimg.cc/Fsb2VRBD/Chat-GPT-Image-Sep-5-2026-01-54-02-PM.png"
  "https://i.postimg.cc/sDCkWSwp/Chat-GPT-Image-Sep-5-2026-01-54-04-PM.png"
)

i=1
for url in "${urls[@]}"; do
  printf -v num "%02d" "$i"
  curl -s -L -o "product_${num}.png" "$url" &
  ((i++))
done
wait
ls -lh product_*.png
