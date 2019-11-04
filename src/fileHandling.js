const fs = require('fs');

const readFromPages = ()=>{
    try {
        return new Promise((resolve,reject)=>{
            fs.readFile('pages.json',{encoding:'utf-8'},(err,data)=>{
                if(err)throw err;
                resolve(JSON.parse(data));
            });
        });
    } catch (error) {
        console.log(error);
    }
}

const writePageUrls = (newObject) => {
	try {
        const data = JSON.stringify(newObject);
        fs.writeFile("pages.json",data,err=>{
            if(err)throw err;
        });
	} catch (error) {
		console.log(error);
	}
};


module.exports={
    readFromPages,
    writePageUrls
}