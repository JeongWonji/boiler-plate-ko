const mongoose = require("mongoose");
const userSchema = mongoose.Schema({
  name: {
    type: String,
    maxlength: 50,
  },
  email: {
    type: String,
    trim: true, //스페이스바 효과를 없애주는 일을 함(trim)
    unique: 1,
  },
  password: {
    type: String,
    minlength: 5,
  },
  lastname: {
    type: String,
    maxlength: 50,
  },
  role: {
    type: Number,
    default: 0,
  },
  image: String,
  token: {
    type: String,
  },
  //토큰이 사용할수 있는 기간
  tokenExp: {
    type: Number,
  },
});

//위에서 만든 스키마를 모델로 감싸준다
const User = mongoose.model("User", userSchema);

//다른파일에서도 사용할수있게
module.exports = { User };
