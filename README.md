# images

Displays a tree of images that can be searched

### How to run

1. Installing
```
git clone https://github.com/PeBraz/images
cd images
npm install
```
2. Initializing data
```
npm run get-data
npm run store-data
```
The first script fetches and saves the file (output/images.xml) and the second one will store it in the database (images.db)

3. Running the server
```
npm run build
npm run server
```
## Structure

```
app
│   # client side code
├── app 
│   ├── App.js 
│   ├── App.css
│   └── index.js
│   # For initializing and storing images data
├── scripts 
│   ├── get-data.js 
│   └── store-data.js
├── public
│   ├── index.html
│   └── style.css
├── server
│    └── index.js
└── main.js # app entry point
 
```
