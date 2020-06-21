const { userID, DB } = require(`./db.js`);

// I don't even know what to tell you, it saves the database, there is nothing else to this file
async function saveDB(savedb) {
    savedb.save().then(console.log(`Successfully saved DataBase`)).catch(err => console.error(err));
}


module.exports = { name: "dbsave", saveDB };