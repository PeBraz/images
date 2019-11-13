import betterSqlite3 from 'better-sqlite3';


const db = betterSqlite3('./plants.db');

// const row = db.prepare('SELECT COUNT(*) FROM plants').get();

// 1st O (n*n)
const rows = db.prepare('SELECT * FROM plants ORDER BY plants.size DESC').all();


// 2nd O (n)
const rootNode = {name: rows[0].name, size: rows[0].size, children: []};
const tree = {[rootNode.name]: rootNode};
for (const {name, size} of rows.slice(1)) {
    const parts = name.split(' > ');
    const nodeName = parts[parts.length - 1];
    tree[nodeName] = {
        name: nodeName,
        size,
        children: []
    };
    if (parts.length > 1) {
        const parentName = parts[parts.length - 2];
        tree[parentName].children.push(tree[nodeName]);
    }   
}

console.log(rootNode);