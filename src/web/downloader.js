let request = require('request');
const fetch = require('node-fetch');

const getHtml = (url, callback) => {
	request.head(url, (err, res, body) => {
		console.log('content-type:', res.headers['content-type']);
		console.log('content-length:', res.headers['content-length']);

		request(url).on('data', data => callback(data.toString()));
	});
};

const fetchHtml = async (url) => {
    let html;
	try {
        html = await fetch(url, { method: 'GET' });
        
	} catch (_e) {
		console.log(_e);
    }
    
    return html.text();
};

// const fetchHtml = (url, callback) => {
// 	try {
// 		html = await fetch(url, { method: 'GET' })
// 			.then(resp => {
// 				return resp.text();
// 			})
// 			.then(data => {
//                 callback(data.toString());
// 			})
// 			.catch(error => {
// 				console.log(error);
// 			});
// 	} catch (_e) {
// 		console.log(_e);
//     }
// };

const getPages = async (urlArray) =>{
    if(urlArray === null || urlArray === undefined) return; 
    const htmlArray = [];
    try {
        for(let i= 0,uLen= urlArray.length;i<uLen;i++){
            let pageHtml = await fetchHtml(urlArray[i]);
            htmlArray.push(pageHtml);
        }
    } catch (_e) {
        console.log(_e);
    }

    return htmlArray;
}

module.exports = {
    getPages
};
