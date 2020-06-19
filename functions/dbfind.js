const { userID, DB } = require(`./db.js`);

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