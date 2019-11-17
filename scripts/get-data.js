import request from 'request';
import fs from 'fs';

const DATA_URL = 'https://s3.amazonaws.com/static.operam.com/assignment/structure_released.xml';
const OUTPUT_FILE = './output/images.xml'

request(DATA_URL, (err, res, body) => {
  if (err) throw err;
  if (!res || res.statusCode !== 200 || !body) {
    console.warn('Failed to load URL');
    return;
  }
  fs.writeFile(OUTPUT_FILE, body, {flag: 'w+'}, err => {
    if (err) throw err;
    console.log('FILE SAVED');
  });
});