function getHtml(url) {
    return fetch(url).then(res => res.text()).then(res => {
        return res;
    }).catch(err => { console.log('err', err); });
}

module.exports = { getHtml };