const prisma = require('./prismaScraper');

let getAllProducts = (prismaHtml, coopHtml) => {
	if (prismaHtml === null || prismaHtml === undefined) prismaHtml = [];
	if (coopHtml === null || coopHtml === undefined) coopHtml = [];
	try {
		for (let i = 0, pLen = prismaHtml.length; i < pLen; i++) {
			prisma.scrapeProducts(prismaHtml[i]);
        }

	} catch (_e) {
		console.log(_e);
	}
};

module.exports={
    getAllProducts
}