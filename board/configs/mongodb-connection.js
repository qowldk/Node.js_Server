const { MongoClient } = require("mongodb");
const uri =
  "mongodb+srv://qowldk1030:grhdwn00@cluster0.aulipmv.mongodb.net/?retryWrites=true&w=majority/board";

module.exports = function (callback) {
  return MongoClient.connect(uri, callback);
};
