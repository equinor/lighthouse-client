const express = require('express');
const app = express();
const router = express.Router();
const { config } = require('./config');
const fs = require('fs');

const isWin = process.platform === 'win32';
const env = process.env.RADIX_ENVIRONMENT || 'local';
const path = env === 'local' && isWin ? __dirname + '\\..\\' : __dirname + '/';
const port = 3000;

app.use((req, res, next) => {
    res.setHeader('X-Frame-Options', 'SAMEORIGIN');
    res.setHeader('X-Content-Type-Options', 'nosniff');
    res.setHeader('Referrer-Policy', 'strict-origin');
    res.setHeader(
        'Permissions-Policy',
        'accelerometer=(), camera=(), geolocation=(), gyroscope=(), microfone=(), payment=(), usb=()'
    );
    res.setHeader('X-Xss-Protection', '1; mode=block');
    next();
});
let template = fs.readFileSync(path + 'index.html', 'utf8');
const data = { ...config[env], PUBLIC_URL: process.env.PUBLIC_URL || '' };
const keys = Object.keys(data);
template = template.replace(`%REDIRECT_URI%`, config[env].REDIRECT_URI);
template = template.replace(`%BASE_API_URI%`, config[env].BASE_API_URI);
template = template.replace(`%PUBLIC_URL%`, config[env].PUBLIC_URL);

fs.writeFile(path + 'index.html', template, 'utf-8', function (err, data) {
    if (err) console.log(err);
});

// Define routes
router.get('*', function (req, res) {
    res.sendFile(path + 'index.html');
});

app.use(express.static(path));
app.use('/', router);

app.listen(port, function () {
    console.log('Thelma is running on port 3000');
    console.log('Environment variables:');
    console.log(data);
});
