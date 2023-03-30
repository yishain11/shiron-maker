const express = require('express');
const router = express.Router();
const { distDir } = require('../constants/constants');

router.use(express.static(distDir));

router.get('/', (req, res) => {
    res.sendFile(distDir + 'index.html');
    res.end();
    return;
});

module.exports = router;