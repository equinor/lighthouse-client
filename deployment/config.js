exports.config = {
    local: {
        REDIRECT_URI: 'http://localhost:5000',
    },
    dev: {
        REDIRECT_URI: 'https://frontend-lighthouse-client-dev.radix.equinor.com',
    },
};
