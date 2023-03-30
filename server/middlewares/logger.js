function logger(req, res, next) {
    const { url, method } = req;
    console.log(`got req to url: ${url}, method: ${method}, body: ${req.body ? JSON.stringify(req.body) : 'none'}`);
    next();
}

module.exports = logger;
