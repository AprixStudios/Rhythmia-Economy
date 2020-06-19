const MongoDB = require('mongodb');
const mongoose = require('mongoose');

const Schema = new mongoose.Schema({
    userID: String,
    id: Number,
    earnRate: Number,
    balance: {purse: Number, bank: Number},
    lastClaimed: {daily: String, weekly: String, monthly: String, work: String},
    unlocks: {colors: [], powerUps: []},
    boosters: [{time: Number, boost: Number}],
    rebirth: Number,
    job: String,
    skills: {cop: Number, law: Number, decisions: Number, communication: Number, firefighter: Number, physics: Number, medical: Number, therapy: Number, coding: Number, creativity: Number, editing: Number, commentary: Number, humour: Number, driving: Number, music: Number, painting: Number}
});

const userID = mongoose.model("userID", Schema);
const DB = mongoose.model("id", Schema);

module.exports = { name: "db", userID, DB }