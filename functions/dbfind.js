const { userID, DB } = require(`./db.js`);

// all this file does is just to get the database of the user, sooo...
async function getDB(userid) {
return new Promise((resolve, reject) => {
  DB.findOne({
    userID: userid
}, (err, res) => {
  if (err) return reject(err);
  resolve(res);
});
});
}

module.exports = { name: "dbfind", getDB };