// Local preview only. Cloudflare Pages serves the files directly.
const http = require('node:http');
const fs = require('node:fs/promises');
const path = require('node:path');
const root = __dirname;
const port = 8087;
const types = {
    '.html': 'text/html; charset=utf-8', '.js': 'text/javascript; charset=utf-8',
    '.png': 'image/png', '.jpg': 'image/jpeg', '.ogg': 'audio/ogg',
    '.mp3': 'audio/mpeg', '.wav': 'audio/wav', '.txt': 'text/plain; charset=utf-8'
};
const server = http.createServer(async (req, res) => {
    try {
        if (req.method !== 'GET' && req.method !== 'HEAD') {
            res.writeHead(405, {Allow: 'GET, HEAD'}).end();
            return;
        }
        const urlPath = decodeURIComponent(new URL(req.url, 'http://localhost').pathname);
        const file = path.resolve(root, '.' + (urlPath.endsWith('/') ? urlPath + 'index.html' : urlPath));
        if (!file.startsWith(root + path.sep) || urlPath.split('/').some(part => part.startsWith('.'))) {
            res.writeHead(403).end();
            return;
        }
        let data, status = 200, contentType = types[path.extname(file)] || 'application/octet-stream';
        try {
            data = await fs.readFile(file);
        } catch (error) {
            if (error.code !== 'ENOENT' && error.code !== 'EISDIR') throw error;
            status = 404;
            contentType = types['.html'];
            data = await fs.readFile(path.join(root, '404.html'));
        }
        res.writeHead(status, {'Content-Type': contentType, 'Cache-Control': 'no-store'});
        res.end(req.method === 'HEAD' ? undefined : data);
    } catch {
        res.writeHead(500).end('Unable to serve this file.');
    }
});
server.listen(port, '127.0.0.1', () => console.log(`Local: http://127.0.0.1:${port}/`));
server.on('error', error => { console.error(error.message); process.exitCode = 1; });
