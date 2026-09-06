const fs = require('fs');
const path = require('path');
const crypto = require('crypto');

function getHash(filePath) {
  const fileBuffer = fs.readFileSync(filePath);
  return crypto.createHash('md5').update(fileBuffer).digest('hex');
}

const userDir = path.join(__dirname, '../public/media/user-products');
const prodDir = path.join(__dirname, '../public/media/products');

const userFiles = fs.readdirSync(userDir).filter(f => f.endsWith('.png'));
const prodFiles = fs.readdirSync(prodDir).filter(f => f.endsWith('.jpg') || f.endsWith('.png'));

console.log('Comparing files...');

const userHashes = userFiles.map(f => ({ file: f, hash: getHash(path.join(userDir, f)), size: fs.statSync(path.join(userDir, f)).size }));
const prodHashes = prodFiles.map(f => ({ file: f, hash: getHash(path.join(prodDir, f)), size: fs.statSync(path.join(prodDir, f)).size }));

for (const uf of userHashes) {
  console.log(`User file: ${uf.file}, Size: ${uf.size}`);
  const match = prodHashes.find(pf => pf.size === uf.size || pf.hash === uf.hash);
  if (match) {
    console.log(`  MATCH FOUND: ${match.file}`);
  } else {
    console.log(`  No exact match by size or hash`);
  }
}
