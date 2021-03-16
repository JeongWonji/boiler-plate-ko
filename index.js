const express = require("express");
const app = express();
const port = 5000;
const bodyParser = require("body-parser");

const config = require("./config/key");

//유저모델 만든걸 불러옴
const { User } = require("./models/User");

//바디파서가 클라이언트에서 오는 정보를 서버에서 분석해서 가져올수 있게 해주는건데
//application/x-www-form-urlencoded 이렇게 된 데이터를 분석해서 가져올수 있게해줌
app.use(bodyParser.urlencoded({ extended: true }));
//application/json 이렇게 된 데이터를 분석해서 가져옴
app.use(bodyParser.json());

const mongoose = require("mongoose");
mongoose
  .connect(config.mongoURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false,
  })
  .then(() => console.log("MongoDB Connected..."))
  .catch((err) => console.log(err));

app.get("/", (req, res) => {
  res.send("Hello World!~~안녕하세요 ~ ");
});

app.post("/register", (req, res) => {
  //회원 가입 할때 필요한 정보들을 클라이언트에서 가져오면
  //그것들을 데이터 베이스에 넣어준다
  const user = new User(req.body); //req.body안에는 json형식으로 들어있을거임
  //save()는 몽고디비에서 오는 메서드. 정보들이 유저정보에 저장이 됨.
  user.save((err, userInfo) => {
    if (err) return res.json({ success: false, err });
    return res.status(200).json({
      success: true,
    });
  });
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
