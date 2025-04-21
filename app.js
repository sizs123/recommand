const express = require('express');
const multer = require('multer');
const path = require('path');

const app = express(); // ✅ 바로 여기! app 정의 필수
const upload = multer();

const port = process.env.PORT || 3000;

// 정적 파일 서비스 (public 폴더 안에 result.html 있어야 함)
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// ✅ Webhook 엔드포인트
app.post('/webhook', upload.none(), (req, res) => {
  const data = req.body;

  const q1 = data["Q1. 오늘은 떨리는 소개팅!"];
  const q2 = data["Q2. 조식에서 꼭 먹는 메뉴는?"];

  const drinks = {
    "두곡": 0,
    "대곡주": 0,
    "명냥": 0,
    "국교1573": 0,
    "니하오": 0,
    "장향형": 0,
    "청향형": 0,
  };

  // Q1 로직
  if (q1 === "웃는 모습이 귀엽고 스윗한 스타일 🍭") {
    drinks["두곡"] += 1;
    drinks["장향형"] += 1;
  } else if (q1 === "말수가 적지만 깊이 있는 분위기 📚") {
    drinks["대곡주"] += 1;
    drinks["명냥"] += 1;
    drinks["국교1573"] += 1;
  } else if (q1 === "깔끔하고 단정한 도시 스타일 🏙️") {
    drinks["명냥"] += 1;
    drinks["청향형"] += 1;
  }

  // Q2 로직
  if (q2 === "갓 구운 달콤한 와플 🧇") {
    drinks["두곡"] += 1;
    drinks["장향형"] += 1;
  } else if (q2 === "오래 끓인 깊은 맛의 미소된장국 🍲") {
    drinks["대곡주"] += 1;
    drinks["명냥"] += 1;
    drinks["국교1573"] += 1;
  } else if (q2 === "시원하고 개운한 과일 샐러드 🍉") {
    drinks["명냥"] += 1;
    drinks["청향형"] += 1;
  }

  const recommendation = Object.entries(drinks).sort((a, b) => b[1] - a[1])[0][0];
  const message = `당신에게 어울리는 전통주는 "${recommendation}" 입니다!`;

  // ✅ 결과 페이지로 리디렉션
  res.redirect(`/result.html?message=${encodeURIComponent(message)}`);
});

// ✅ 서버 실행
app.listen(port, () => {
  console.log(`✅ Server is running on port ${port}`);
});
