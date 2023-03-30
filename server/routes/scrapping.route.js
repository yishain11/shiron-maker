const express = require('express');
const router = express.Router();
const { getHtml } = require('../utils/scrapping');

router.post('/', async (req, res) => {
    const url = req.body.url;
    const page = await getHtml(url);
    console.log('page', page);
    res.end();
    return;
});

module.exports = router;