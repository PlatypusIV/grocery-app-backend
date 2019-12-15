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

const getAllCategories =(prismaRoots)=>{
	const categories={prisma:[]};
	try {
		for(let i = 0,pLen = prismaRoots.length;i<pLen;i++){
			categories.prisma.push(prisma.scrapeCategories(prismaRoots[i]));
		}
	} catch (error) {
		console.log(error);
	}
	return categories;
}


const getAllProducts = (prismaHtml, coopHtml, cityAlkoHtml) => {
	const products = {prisma:[],coop:[],cityAlko:[]};
	if (prismaHtml === null || prismaHtml === undefined) prismaHtml = [];
	if (coopHtml === null || coopHtml === undefined) coopHtml = [];
	if (cityAlkoHtml === null || cityAlkoHtml === undefined) cityAlkoHtml = [];
	try {
		for (let i = 0, pLen = prismaHtml.length; i < pLen; i++) {
			products.prisma.push(...prisma.scrapeProducts(prismaHtml[i]));
		}
	} catch (_e) {
		console.log(_e);
	}
	return products;
};

module.exports = {
	getAllProducts,
	getAllLinks,
	getAllCategories
};
