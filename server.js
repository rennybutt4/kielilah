const http = require('http');
const fs = require('fs');
const path = require('path');

const port = parseInt(process.env.PORT, 10) || 3000;

const server = http.createServer((req, res) => {
  let filePath = path.join(__dirname, 'public', req.url === '/' ? 'index.html' : req.url);
  let contentType = 'text/html; charset=utf-8';
  
  if (filePath.endsWith('.css')) contentType = 'text/css';
  if (filePath.endsWith('.js')) contentType = 'text/javascript';
  if (filePath.endsWith('.json')) contentType = 'application/json';
  if (filePath.endsWith('.png')) contentType = 'image/png';
  if (filePath.endsWith('.jpg') || filePath.endsWith('.jpeg')) contentType = 'image/jpeg';
  
  fs.readFile(filePath, (err, data) => {
    if (err) {
      res.writeHead(404, { 'Content-Type': 'text/html' });
      res.end('<h1>404 Not Found</h1>');
    } else {
      res.writeHead(200, { 'Content-Type': contentType });
      res.end(data);
    }
  });
});

server.listen(port, () => {
  console.log(`Server listening on port ${port} (pid ${process.pid})`);
});

process.on('SIGINT', () => {
  server.close(() => process.exit(0));
});
