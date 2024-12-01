const axios = require('axios');

module.exports = async (req, res) => {
    const { url } = req.query;

    if (!url) {
        res.status(400).json({ error: 'Missing "url" query parameter' });
        return;
    }

    try {
        const response = await axios.get(url, {
            responseType: 'arraybuffer',
        });

        // Forward the response headers
        Object.keys(response.headers).forEach((key) => {
            res.setHeader(key, response.headers[key]);
        });

        // Send the content
        res.status(response.status).send(response.data);
    } catch (error) {
        console.error('Error fetching URL:', error.message);
        res.status(500).json({ error: 'Failed to fetch the requested URL' });
    }
};
