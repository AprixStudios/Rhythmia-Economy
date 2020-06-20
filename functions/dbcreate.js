const { userID, DB } = require(`./db.js`);

async function createDB(userid, dbid) {
const newDB = new DB({
    userID: userid,
    id: dbid,
    earnRate: 1,
    balance: {purse: 0, bank: 0},
    lastClaimed: {daily: "0", weekly: "0", monthly: "0", work: "0"},
    unlocks: {colors: [], powerUps: []},
    boosters: [{time: 0, boost: 0}],
    rebirth: 0,
    job: "None",
    skills: {cop: 0, law: 0, decisions: 0, communication: 0, firefighter: 0, physics: 0, medical: 0, therapy: 0, coding: 0, creativity: 0, editing: 0, commentary: 0, humour: 0, driving: 0, music: 0, painting: 0},
    jailed: 0,
    records: 0,
    rep: {nextRep: "0", amount: 0}
});
return newDB;
}

module.exports = { name: "dbcreate", createDB };