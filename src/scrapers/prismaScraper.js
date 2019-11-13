// const $ = require('jquery');
const cheerio = require('cheerio');

const scrapePages = htmlPage => {
	const rootUrl = 'https://www.prismamarket.ee';
	const urlArray = [];
	try {
		const $ = cheerio.load(htmlPage);
		$('.category-shelf-item.clearfix').each((i, e) => {
			const urlPart = $(e)
				.find('a.name.js-category-item')
				.attr('href');
			urlArray.push(rootUrl + urlPart);
		});
	} catch (error) {
		console.log(error);
	}
	return urlArray;
};

const scrapeProducts = htmlPage => {
	const products = [];

	try {
		const $ = cheerio.load(htmlPage);
		const category = $('h2.js-products-page-name.viewport.category-header').text().toLowerCase();

		$('.js-shelf-item').each((i, e) => {
			let product = {};
			product.name = $(e)
				.find('div.info.relative.clear')
				.find('div.name')
				.text();
			const quantity = $(e)
				.find('div.info.relative.clear')
				.find('.quantity')
				.text();
			if (quantity !== null || quantity !== undefined || quantity !== '') {
				product.quantity = quantity;
			}

			product.subname = $(e)
				.find('div.info.relative.clear')
				.find('span.subname')
				.text();
			let price = $(e)
				.find('div.price-and-quantity')
				.find('div.unit-price.js-comp-price')
				.text();

			price = price.replace(/\n/g, '');
			product.price = price.trim();
			product.category = category;
			product.store = "prisma";
			products.push(product);
		});
	} catch (_e) {
		console.log(_e);
	}

	return products;
};

module.exports = {
	scrapeProducts,
	scrapePages,
};
