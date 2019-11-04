const downloader = require('../web/downloader');
const scraper = require('../scrapers/rootScraper');
const database = require('../database/dbDialog');


const fileHandling = require('../fileHandling.js');

const main = async () => {
	try {

        //start by getting all urls
		const pagesData = await fileHandling.readFromPages();
        const prismaRootPages = await downloader.getPages(pagesData.prismaRoots);
		const prismaUrls = scraper.getAllLinks(prismaRootPages);
        pagesData.prisma = [...prismaUrls];
        fileHandling.writePageUrls(pagesData);

        // then get products
		const prismaHtml = await downloader.getPages(pagesData.prisma);

        const products = scraper.getAllProducts(prismaHtml);
        console.log(products);
        
        //then put products into database


	} catch (_e) {
		console.log(_e);
	}
};

module.exports = {
	main,
};
