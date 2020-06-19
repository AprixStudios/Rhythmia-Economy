const { userID, DB } = require(`./db.js`);

async function saveDB(savedb) {
    savedb.save().then(console.log(`Successfully saved DataBase`)).catch(err => console.error(err));
}


module.exports = { name: "dbsave", saveDB };