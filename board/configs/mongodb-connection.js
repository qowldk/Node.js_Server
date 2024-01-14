const { MongoClient } = require("mongodb");
const uri =
  "mongodb+srv://qowldk1030:grhdwn00@cluster0.aulipmv.mongodb.net/board";

module.exports = function (callback) {
  return MongoClient.connect(uri, callback);
};
