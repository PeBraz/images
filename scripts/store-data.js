import { parseString } from 'xml2js';
import fs from 'fs';
import betterSqlite3 from 'better-sqlite3';

const db = betterSqlite3('./images.db');
const OUTPUT_FILE = './output/images.xml'

function parseContent(content, parentName = null) {
  const results = [];
  if (!content) {
    return results;
  }
  const name = content['$'].words;
  const fullName = parentName ? `${parentName} > ${name}` : name ;
  for (const row of (content.synset) || []) {
    for (const result of parseContent(row, fullName)) {
      results.push(result);
    }
  }
  results.push({name: fullName, size: results.length});
  return results;
}

db.prepare('CREATE TABLE IF NOT EXISTS images (name TEXT, size NUMBER)').run();

const data = fs.readFileSync(OUTPUT_FILE, 'utf-8');
parseString(data, (err, res) => {
  if (err) {
    throw err;
  }
  const startContent = Object.values(res)[0].synset[0];
  const all = parseContent(startContent);

  const stmt = db.prepare('INSERT INTO images VALUES (?, ?)')
  db.transaction(values => {
    for (const {name, size} of values) {
      stmt.run(name, size);
    }
  })(all);
});
console.log('Finito');
db.close();
