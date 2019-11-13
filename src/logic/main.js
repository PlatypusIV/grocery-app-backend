const downloader = require('../web/downloader');
const scraper = require('../scrapers/rootScraper');
const database = require('../database/dbDialog');

const fileHandling = require('../fileHandling.js');

const server = require('./../server/server');

let interval = null;
let collectionsExist = false;
const halfADay = 43200000;

const handleScraping = async () => {
	try {
		//check if collections exist
		collectionsExist = await database.checkIfDbExists();

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
			// database.updateProductsInStore(products.prisma, 'prisma');

			await database.wipeCollectionsIfNeeded();
			database.addProductsToDb(products.prisma, 'prisma');
		} else {
			database.createDbIfNeeded();

			database.addProductsToDb(products.prisma, 'prisma');

			collectionsExist = true;
		}
	} catch (error) {
		console.log(error);
		if (interval !== undefined || interval !== null) {
			clearInterval(interval);
		}
	}
};

//use this later when server can be up for longer
const scraperInterval = () => {
	interval = setInterval(() => {
        handleScraping();
    }, halfADay);
};

const handleServer = () => {
	server.start();
};

const main = async () => {
	try {
		// handleScraping();
		handleServer();
	} catch (_e) {
		console.log(_e);
	}
};

module.exports = {
	main,
};
