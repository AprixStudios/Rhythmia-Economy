const { userID, DB } = require(`./db.js`);

async function getDB(userid) {
DB.findOne({
    userID: userid
}, (err, res) => {return (err, res)});
}

module.exports = { name: "dbfind", getDB };