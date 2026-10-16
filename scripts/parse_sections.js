import fs from 'fs';
const html = fs.readFileSync('D:/cns3/scripts/page.html', 'utf8');

const b = html.indexOf('Blog Section');
console.log(html.substring(b - 200, b + 200));



