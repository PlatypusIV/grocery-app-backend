const prisma = require('./prismaScraper');
const cityAlko = require('./cityAlkoScraper');

const getAllLinks = prismaRoots => {
	const prismaLinks = [];
	try {
		prismaRoots.forEach(page => {
			prismaLinks.push(...prisma.scrapePages(page));
		});
	} catch (error) {
		console.log(error);
	}

	return prismaLinks;
};

const getAllProducts = (prismaHtml, coopHtml, cityAlkoHtml) => {
	const products = [];
	if (prismaHtml === null || prismaHtml === undefined) prismaHtml = [];
	if (coopHtml === null || coopHtml === undefined) coopHtml = [];
	if (cityAlkoHtml === null || cityAlkoHtml === undefined) cityAlkoHtml = [];
	try {
		for (let i = 0, pLen = prismaHtml.length; i < pLen; i++) {
			products.push(...prisma.scrapeProducts(prismaHtml[i]));
		}
	} catch (_e) {
		console.log(_e);
	}
	return products;
};

module.exports = {
	getAllProducts,
	getAllLinks,
};
