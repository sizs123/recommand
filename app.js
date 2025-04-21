const express = require('express');
const multer = require('multer');
const upload = multer();

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ✅ Webhook 엔드포인트
app.post('/webhook', upload.none(), (req, res) => {
  console.log("✅ Webhook 도착");
  console.log(req.body);  // <-- 콘솔에서 확인해야 응답 여부 판단 가능!

  const data = req.body;

  const q1 = data["Q1. 오늘은 떨리는 소개팅!"];
  const q2 = data["Q2. 조식에서 꼭 먹는 메뉴는?"];
  const q3 = data["Q3. 노래방 선곡 스타일은?"];
  const q4 = data["Q4. 가장 끌리는 운동은?"];
  const q5 = data["Q5. 친구들과 모임할 때 나는?"];
  const q6 = data["Q6. 여행가서 식당 고를 때 나는?"];
  const q7 = data["Q7. 여운이 남는 영화는?"];
  const q8 = data["Q8. 마무리할 때 듣는 음악 스타일은?"];

  const drinks = {
    "두곡": 0,
    "대곡주": 0,
    "명냥": 0,
    "국교1573": 0,
    "니하오": 0,
    "장향형": 0,
    "청향형": 0,
  };

  // ✅ 예시 가중치 (Q1)
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

  // (Q2 ~ Q8도 추가 예정...)

  const recommendation = Object.entries(drinks).sort((a, b) => b[1] - a[1])[0][0];
  const score = drinks[recommendation];

  const message = `당신에게 어울리는 전통주는 "${recommendation}" 입니다!`;

  res.json({ recommendation, score, message });
});

app.listen(port, () => {
  console.log("✅ Server is running on port " + port);
});
