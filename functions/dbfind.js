const { userID, DB } = require(`./db.js`);

async function getDB(userid) {
db.findOne({
    userID: userid
}, ( err, res ) => {
    return { err, res };
});
return { err, res };
}

module.exports = getDB;