const express = require("express");
const handlebars = require("express-handlebars");
const app = express();
const postService = require("./services/post-service");

// req.body와 post 요청을 해석하기 위한 설정
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.engine(
  "handlebars",
  handlebars.create({
    helpers: require("./configs/handlebars-helpers"),
  }).engine
); // 템플릿 엔진으로 핸들바 등록
app.set("view engine", "handlebars"); // 웹 페이지 로드시 사용할 템플릿 엔진 설정
app.set("views", __dirname + "/views"); // 뷰 디렉토리를 views로 설정

app.get("/", async (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const search = req.query.search || "";
  try {
    const [posts, paginator] = await postService.list(collection, page, search);
    res.render("home", { title: "테스트 게시판", search, paginator, posts });
  } catch (error) {
    console.error(error);
    res.render("home", { title: "테스트 게시판" });
  }
});

app.get("/write", (req, res) => {
  res.render("write", { title: "테스트 게시판" });
});

app.post("/write", async (req, res) => {
  const post = req.body;
  const result = await postService.writePost(collection, post);
  res.redirect(`/detail/${result.insertedId}`);
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
