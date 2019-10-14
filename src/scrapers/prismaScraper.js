// const $ = require('jquery');
const cheerio = require('cheerio');

const scrapeProducts = htmlPage => {
	try {
		// const elements = $(htmlPage);
		// let products = $('.js-shelf-item',elements);
		// console.log(products);

		const prodNames = [];

        const $ = cheerio.load(htmlPage);

        $('.decimal').each((i,e)=>{
            console.log($(e).html());
        });

        $('.subname').each((i,e)=>{
            console.log($(e).html());
        })

	} catch (_e) {
		console.log(_e);
	}
};

module.exports = {
	scrapeProducts,
};
