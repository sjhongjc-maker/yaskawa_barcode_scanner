const fs = require('fs');
const path = require('path');

let zxingFile = '';
const searchDirs = [
  'node_modules/@zxing/browser/umd',
  'node_modules/@zxing/browser'
];

for (const dir of searchDirs) {
  if (fs.existsSync(dir)) {
    const files = fs.readdirSync(dir);
    const minFile = files.find(f => f.endsWith('.min.js'));
    const indexFile = files.find(f => f === 'index.js');
    if (minFile) { zxingFile = path.join(dir, minFile); break; }
    if (indexFile) { zxingFile = path.join(dir, indexFile); break; }
  }
}

if (!zxingFile) {
  console.error('ZXing 파일을 찾을 수 없습니다');
  process.exit(1);
}

console.log('사용 파일:', zxingFile);
const src = fs.readFileSync(zxingFile, 'utf8');
const output = src + '\nwindow._zxingBundleLoaded=true;\n';
fs.writeFileSync('zxing-bundle.js', output);
console.log('완료:', fs.statSync('zxing-bundle.js').size, 'bytes');
