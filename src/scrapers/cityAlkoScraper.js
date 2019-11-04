const cheerio = require('cheerio');

const scrapeProducts = html => {
	try {
        const $ = cheerio.load(html);
        $('.face').each((i,e)=>{
            console.log($(e).html());
        });

        console.log();
	} catch (error) {
		console.log(error);
	}
};

module.exports = {
	scrapeProducts,
};
