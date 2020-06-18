const { userID, DB } = require(`./db.js`);

async function saveDB(newdb) {
    newdb.save().then(console.log(`Successfully saved DataBase`)).catch(err => console.error(err));
}


module.exports = saveDB;