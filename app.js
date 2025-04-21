const express = require("express");
const multer = require("multer");
const path = require("path");
const app = express();
const upload = multer();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));

// 결과 저장용 임시 객체
const results = {};

// Webhook POST 처리
app.post("/webhook", upload.none(), (req, res) => {
  console.log("✅ 받은 요청:", req.body);  

  
  const data = req.body;
  const submissionID = data["submissionID"];
  const q1 = data["Q1. 오늘은 떨리는 소개팅!"];
  const q2 = data["Q2. 조식에서 꼭 먹는 메뉴는?"];

  const drinks = {
    "두곡": 0,
    "대곡주": 0,
    "명냥": 0,
  };

  if (q1 === "웃는 모습이 귀엽고 스윗한 스타일 🍭") {
    drinks["두곡"] += 1;
  } else if (q1 === "말수가 적지만 깊이 있는 분위기 📚") {
    drinks["대곡주"] += 1;
  }

  if (q2 === "갓 구운 달콤한 와플 🧇") {
    drinks["두곡"] += 1;
  } else if (q2 === "시원하고 개운한 과일 샐러드 🍉") {
    drinks["명냥"] += 1;
  }

  const recommendation = Object.entries(drinks).sort((a, b) => b[1] - a[1])[0][0];
  const message = `당신에게 어울리는 전통주는 "${recommendation}" 입니다!`;

  // 메모리에 저장
  if (submissionID) {
    results[submissionID] = message;
  }

  // 리디렉션
  res.redirect(`/result.html?id=${submissionID}`);
});

// 추천 결과 조회용 GET 엔드포인트
app.get("/result-data/:id", (req, res) => {
  const id = req.params.id;
  const message = results[id];
  if (message) {
    res.json({ message });
  } else {
    res.status(404).json({ message: "결과를 찾을 수 없습니다." });
  }
});

// 서버 시작
app.listen(port, () => {
  console.log("✅ Server is running on port " + port);
});
