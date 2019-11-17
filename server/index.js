import express from 'express';
import betterSqlite3 from 'better-sqlite3';

const db = betterSqlite3('./images.db');

const app = express();
const port = 3000;

app.use(express.static('public'));

app.get('/images', (req, res) => {
  const rows = db.prepare('SELECT * FROM images ORDER BY images.size DESC').all();
  const rootNode = {name: rows[0].name, size: rows[0].size, children: []};
  const tree = {[rootNode.name]: rootNode};
  for (const {name, size} of rows.slice(1)) {
      const parts = name.split(' > ');
      const nodeName = parts[parts.length - 1];
      tree[name] = {
          name: nodeName,
          size,
          children: []
      };
      if (parts.length > 1) {
          const parentName = parts.slice(0, parts.length - 1).join(' > ');
          tree[parentName].children.push(tree[name]);
      }
  }
  res.json(rootNode);
});


app.listen(port, () => console.log(`Listening on port: ${port}!`));
