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
	try {
        return new Promise((resolve,reject)=>{
            fetch(url,{headers:{
                'Content-type':'text/html',
                'user-agent':'Mozilla/5.0 (Windows NT 5.1; rv:33.0) Gecko/20100101 Firefox/33.0'
            }}).then(data=>{
                resolve(data.text());
            }).catch(err=>{
                reject(err);
            });
        });
        // console.log(html);
        
	} catch (_e) {
		console.log(_e);
    }
    
    return html;
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
        let counter = 0;
        for(let i= 0,uLen= urlArray.length;i<uLen;i++){
            counter+=1;
            if(counter === 5){
                setTimeout(async ()=>{
                    const pageHtml = await fetchHtml(urlArray[i]);
                    // console.log(pageHtml);
                    htmlArray.push(pageHtml);
                },5000);
            }else{
                const pageHtml = await fetchHtml(urlArray[i]);
                // console.log(pageHtml);
                htmlArray.push(pageHtml);
            }

        }
    } catch (_e) {
        console.log(_e);
    }

    return htmlArray;
}

module.exports = {
    getPages
};
