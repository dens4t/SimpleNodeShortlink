const http = require('http');
const fs = require('fs');
const path = require('path');

// Define URL mappings for redirects
const redirects = {
    'musrenbang': {
        name: 'Musrenbang Platform',
        shortUrl: 'musrenbang',
        url: 'https://musrenbang.bappeda.jatimprov.go.id'
    },
    'fkp': {
        name: 'Forum Konsultasi Publik',
        shortUrl: 'fkp',
        url: 'https://fkp.jatimprov.go.id'
    }
};

// Set the port to 80
const PORT = 3000;

http.createServer((req, res) => {
    // Log the URL to help with debugging
    console.log('Request URL:', req.url);

    // Handle the root path by serving the index.html
    if (req.url === '/') {
        const filePath = path.join(__dirname, 'index.html');

        fs.readFile(filePath, 'utf8', (err, data) => {
            if (err) {
                res.writeHead(500, { 'Content-Type': 'text/plain' });
                res.end('Error loading index.html');
                return;
            }

            // Generate links HTML dynamically from redirects object
            const linksHTML = Object.entries(redirects)
                .map(([key, value]) => `
          <li>
            <a href="/${value.shortUrl}">
              <i class="fas fa-link"></i> ${value.name}
              <small style="display: block; color: #666; margin-top: 5px;">Short URL: /${value.shortUrl}</small>
              <small style="display: block; color: #666;">Redirects to: ${value.url}</small>
            </a>
          </li>
        `).join('');
            // Replace placeholder in HTML with generated links
            const modifiedHTML = data.replace('<!--DYNAMIC_LINKS-->', linksHTML);

            res.writeHead(200, { 'Content-Type': 'text/html' });
            res.end(modifiedHTML);
        });
        return;
    }

    // Extract the path after the '/' for routing, also trimming trailing slashes
    const pathName = req.url.replace('/', '').replace(/\/$/, '');  // Remove leading slash and trailing slashes


    // Check if the path matches a defined redirect
    if (redirects[pathName]) {
        res.writeHead(301, { Location: redirects[pathName].url });
        res.end();
    } else {
        // Serve the not-found.html page
        const notFoundPath = path.join(__dirname, 'not-found.html');
        fs.readFile(notFoundPath, 'utf8', (err, data) => {
            if (err) {
                res.writeHead(404, { 'Content-Type': 'text/plain' });
                res.end('404 - Page Not Found');
                return;
            }
            res.writeHead(404, { 'Content-Type': 'text/html' });
            res.end(data);
        });
    }
}).listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
