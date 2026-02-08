const http = require('http');

const port = parseInt(process.env.PORT, 10) || 3000;

const server = http.createServer((req, res) => {
  res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
  res.end(`<h1>BlobeVM running on port ${port}</h1><p>PID: ${process.pid}</p>`);
});

server.listen(port, () => {
  console.log(`Server listening on port ${port} (pid ${process.pid})`);
});

process.on('SIGINT', () => {
  server.close(() => process.exit(0));
});
