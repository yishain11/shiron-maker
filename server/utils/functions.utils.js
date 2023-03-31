function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

function checkObjectEmpty(obj) {
    if (typeof obj !== 'object') {
        return false;
    }
    if (Object.keys(obj).length > 0) {
        return false;
    }
    return true;
}


module.exports = { checkObjectEmpty, sleep };