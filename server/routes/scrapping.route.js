const express = require('express');
const router = express.Router();
const { scrapUtils, functionUtils } = require('../utils/utils.index')

router.post('/', async (req, res) => {
    const url = req.body.url;
    let page = {};
    while (functionUtils.checkObjectEmpty(page)) {
        page = await scrapUtils.getHtml(url);
        await functionUtils.sleep(10000);
    }
    res.end(JSON.stringify(page));
    return;
});

module.exports = router;