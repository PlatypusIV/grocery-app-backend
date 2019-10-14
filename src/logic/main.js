const downloader = require('../web/downloader');
const pagesJson = require('../../pages.json');
const scraper = require('../scrapers/rootScraper');


const main = async () =>{
    try {
        const prismaHtml = await downloader.getPages(pagesJson.prisma);
        
        scraper.getAllProducts(prismaHtml);
        
    } catch (_e) {
        console.log(_e);
    }
}

module.exports={
    main
}