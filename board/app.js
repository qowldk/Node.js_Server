const express = require("express");
const handlebars = require("express-handlebars");
const app = express();

app.engine(
  "handlebars",
  handlebars.create({
    helpers: require("./configs/handlebars-helpers"),
  }).engine
); // 템플릿 엔진으로 핸들바 등록
app.set("view engine", "handlebars"); // 웹 페이지 로드시 사용할 템플릿 엔진 설정
app.set("views", __dirname + "/views"); // 뷰 디렉토리를 views로 설정

app.get("/", (req, res) => {
  res.render("home", { title: "테스트 게시판" });
});

app.get("/write", (req, res) => {
  res.render("write", { title: "테스트 게시판" });
});

app.get("/detail/:id", async (req, res) => {
  res.render("detail", {
    title: "테스트 게시판",
  });
});

const mongodbConnection = require("./configs/mongodb-connection");
app.listen(3000, async () => {
  console.log("Server started");
  const mongoClient = await mongodbConnection();
  collection = mongoClient.db().collection("post");
  console.log("MongoDB connected");
});
