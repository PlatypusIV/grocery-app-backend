const mongoClient = require('mongodb').MongoClient;
const url = 'mongodb://localhost:27017/';
const groceryDb = 'grocery-db';
// const stores = ['prisma', 'selver'];
const stores = ['prisma'];


const createDbIfNeeded = () => {
	try {
		mongoClient.connect(url, (err, db) => {
			if (err) throw err;
			console.log('Database created!');
			let dbo = db.db(groceryDb);
			const collPromise = new Promise((resolve, reject) => {
				for (let i = 0, storesLen = stores.length; i < storesLen; i++) {
					//only returns a promise if you dont enter the error parameter
					dbo.createCollection(stores[i]).then(() => {
						if (i === stores.length - 1) {
							resolve();
						}
					});
				}
			});

			collPromise.then(() => {
				db.close();
			});
		});
	} catch (error) {
		console.log(error);
	}
};

const wipeCollectionsIfNeeded = () => {
	try {
		return new Promise((oResolve, oReject) => {
			mongoClient.connect(url, (err, db) => {
				if (err) throw err;
				let dbo = db.db(groceryDb);
				const delPromise = new Promise((resolve, reject) => {
					for (let i = 0, sLen = stores.length; i < sLen; i++) {
						dbo.collection(stores[i]).drop((err, ok) => {
							if (err) throw err;
						});
					}
					resolve();
				});
				delPromise.then(() => {
          db.close();
          oResolve();
				});
			});
		});
	} catch (error) {
		consolelog(error);
	}
};

// const updateProductsInStore = (products, store) => {
// 	try {
// 		mongoClient.connect(url,(err, db) => {
// 			if (err) throw err;
// 			let dbo = db.db(groceryDb);
//       const query = { "store": store };
//       const newValues = {$set:products};
// 			const updatePromise = new Promise((resolve, reject) => {
// 				dbo.collection(store).updateMany(query, newValues, (err, res) => {
// 					if (err) reject(err);
// 					resolve(res);
// 				});
// 			});
// 			updatePromise.then(data => {
// 				console.log(`Updated: ${data} items in ${store}`);
// 				db.close();
// 			});
// 		});
// 	} catch (error) {
// 		console.log(error);
// 	}
// };

//figure out how to do this

const addProductsToDb = (products, store) => {
	try {
		mongoClient.connect(url, (err, db) => {
			if (err) throw err;
			var coll = db.db(groceryDb);
			coll.collection(store).insertMany(products, (err, response) => {
				if (err) throw err;
				console.log(`Inserted ${response.insertedCount} into ${store} collection!`);
				db.close();
			});
		});
	} catch (error) {
		console.log(error);
	}
};

const queryAllStores = query => {
	const promiseArr = [];

	try {
		for (let i = 0, sLen = stores.length; i < sLen; i++) {
			promiseArr.push(queryFromDb(query, stores[i]));
		}
	} catch (error) {
		console.log(error);
	}
	return promiseArr;
};

const queryFromDb = (query, store) => {
	return new Promise((outerResolve, outerReject) => {
		mongoClient.connect(url, (err, db) => {
			if (err) throw err;
			let dbo = db.db(groceryDb);
			const findPromise = new Promise((resolve, reject) => {
				dbo.collection(store)
					.find(query)
					.toArray((err, result) => {
						if (err) throw err;
						resolve(result);
					});
			});
			findPromise.then(data => {
				// console.log(data);
				outerResolve(data);
				db.close();
			});
		});
	});
};

const checkIfDbExists = () => {
	return new Promise((resolve, reject) => {
		mongoClient.connect(url, (err, db) => {
			let dbo = db.db(groceryDb);

			dbo.collections((err, res) => {
				let exists = res.length === stores.length;
				resolve(exists);
				db.close();
			});
		});
	});
};

module.exports = {
	createDbIfNeeded,
	addProductsToDb,
	queryFromDb,
	queryAllStores,
	checkIfDbExists,
	wipeCollectionsIfNeeded,
};
