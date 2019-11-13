const downloader = require('../web/downloader');
const scraper = require('../scrapers/rootScraper');
const database = require('../database/dbDialog');

const fileHandling = require('../fileHandling.js');

const server = require('./../server/server');

let interval = null;

const handleScraping = async () => {
	try {
		let collectionsExist = false;

		//start by getting all urls
		const pagesData = await fileHandling.readFromPages();
		const prismaRootPages = await downloader.getPages(pagesData.prismaRoots);
		const prismaUrls = scraper.getAllLinks(prismaRootPages);
		pagesData.prisma = [...prismaUrls];
		fileHandling.writePageUrls(pagesData);

		// then get products
		const prismaHtml = await downloader.getPages(pagesData.prisma);

		const products = scraper.getAllProducts(prismaHtml);

		//then put products into database
		if (collectionsExist) {
			database.updateProductsInStore(products.prisma, 'prisma');
		} else {
			database.createDbIfNeeded();

			database.addProductsToDb(products.prisma, 'prisma');

			collectionsExist = true;
		}
	} catch (error) {
		console.log(error);
	}
};

const handleServer = () => {
	server.start();
};

const main = async () => {
	try {
		handleScraping();
		handleServer();
	} catch (_e) {
		console.log(_e);
	}
};

module.exports = {
	main,
};
