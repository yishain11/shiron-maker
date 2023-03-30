const { JSDOM } = require('jsdom');
const removeTags = ['b', 'span', 'strong'];
const linksToInclude = ['class="search_link_name_big"']

function getHtml(url) {
    return fetch(url).then(res => res.text()).then(res => {
        const parsedHtml = parseHtml(res);
        return parsedHtml;
    }).catch(err => { console.log('err', err); });
}

function parseHtml(htmlStr) {
    const dom = new JSDOM(htmlStr);
    const allNodes = dom.window.document.querySelectorAll("*");
    const links = [];
    const linksObj = {};
    allNodes.forEach(node => {
        if (node.tagName.toLowerCase() === "script") {
            node.remove();
        } else if (removeTags.includes(node.tagName.toLowerCase())) {
            node.replaceWith(node.innerHTML);
        } if (node.tagName.toLowerCase() === "a") {
            let linkHtml = node.outerHTML;
            linkHtml = linkHtml.replaceAll('\t', '').replaceAll('<b>', '').replaceAll('</b>', '');
            for (const link of linksToInclude) {
                if (linkHtml.includes(link)) {
                    const id = linkHtml.match(/(?<=prfid=)[0-9]*/)[0];
                    if (!id) {
                        return;
                    }
                    if (!(id in linksObj)) {
                        linksObj[id] = {
                            songUrl: '',
                            songName: '',
                            artistName: '',
                            artistUrl: '',
                        };
                    }
                    const href = node.getAttribute('href');
                    const text = node.textContent.trim();
                    if (href.includes('lyrics')) {
                        linksObj[id].songUrl = href;
                        linksObj[id].songName = text;
                    } else {
                        linksObj[id].artistUrl = href;
                        linksObj[id].artistName = text;
                    }
                    if (!linksObj[id].songName && !linksObj[id].songUrl) {
                        delete linksObj[id];
                    }
                }
            }
        }
    });
    console.log('linksObj', linksObj);
    return linksObj;
}

module.exports = { getHtml };