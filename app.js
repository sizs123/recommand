// ✅ 필요한 모듈 세팅
const express = require('express');
const multer = require('multer');
const upload = multer();

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));


// ✅ 전통주 결과 설명 및 이미지 맵
const descriptions = {
  "두곡": "부드럽고 달콤한 향이 매력적인 두곡! 초보자도 쉽게 즐길 수 있어요.",
  "대곡주": "진하고 깊은 풍미의 대곡주! 정갈한 다이닝과 잘 어울려요.",
  "명냥": "상쾌하고 감성적인 향, 깔끔한 마무리! 명냥은 기분 좋은 하루를 열어줍니다.",
  "국교1573": "중국 전통주의 고급스러운 끝판왕, 깊고 묵직한 향.",
  "니하오": "친숙하고 편안한 달큰한 느낌. 누구와 마셔도 좋아요.",
  "장향형": "진한 향과 깊은 맛, 숙성미가 살아있는 장향형!",
  "청향형": "산뜻하고 가벼운 맛, 깔끔하게 떨어지는 피니시!"
};

const imageMap = {
  "두곡": "https://yourcdn.com/images/dugok.jpg",
  "대곡주": "https://yourcdn.com/images/daegokju.jpg",
  "명냥": "https://yourcdn.com/images/myeongnyang.jpg",
  "국교1573": "https://yourcdn.com/images/gukgyo.jpg",
  "니하오": "https://yourcdn.com/images/nihao.jpg",
  "장향형": "https://yourcdn.com/images/janghyang.jpg",
  "청향형": "https://yourcdn.com/images/cheonghyang.jpg"
};

// ✅ 리디렉션용 중간 페이지
app.get('/redirect', (req, res) => {
  const drink = req.query.drink;
  if (!drink) return res.send("추천 결과가 없습니다.");
  res.redirect(`/result/${encodeURIComponent(drink)}`);
});

// ✅ 결과 페이지 라우트
app.get('/result/:drink', (req, res) => {
  const drink = req.params.drink;
  const description = descriptions[drink] || "추천 정보를 찾을 수 없습니다.";
  const image = imageMap[drink] || "https://yourcdn.com/images/default.jpg";

  res.send(`
    <html>
      <head><title>${drink} 추천 결과</title><meta charset="UTF-8" /></head>
      <body style="font-family:sans-serif; text-align:center; padding:40px;">
        <h1>✨ 당신에게 어울리는 전통주는 <span style="color:crimson">${drink}</span>입니다!</h1>
        <img src="${image}" alt="${drink}" style="width:300px; border-radius:16px; margin:20px 0;" />
        <p>${description}</p>
      </body>
    </html>
  `);
});

// ✅ Webhook 처리 및 리디렉션
app.post('/webhook', upload.none(), (req, res) => {
  console.log("✅ Webhook 도착");
  console.log(req.body);

  const pretty = req.body.pretty || "";

  const drinks = {
    "두곡": 0,
    "대곡주": 0,
    "명냥": 0,
    "국교1573": 0,
    "니하오": 0,
    "장향형": 0,
    "청향형": 0
  };

  const answer = (text) => pretty.includes(text);

  if (answer("웃는 모습이 귀엽고 스윗한 스타일")) { drinks["두곡"]++; drinks["장향형"]++; }
  if (answer("말수가 적지만 깊이 있는 분위기")) { drinks["대곡주"]++; drinks["명냥"]++; drinks["국교1573"]++; }
  if (answer("깔끔하고 단정한 도시 스타일")) { drinks["명냥"]++; drinks["청향형"]++; }

  if (answer("갓 구운 달콤한 와플")) { drinks["두곡"]++; drinks["장향형"]++; }
  if (answer("오래 끓인 깊은 맛의 미소된장국")) { drinks["대곡주"]++; drinks["명냥"]++; drinks["국교1573"]++; }
  if (answer("시원하고 개운한 과일 샐러드")) { drinks["명냥"]++; drinks["청향형"]++; }

  const sorted = Object.entries(drinks).sort((a, b) => b[1] - a[1]);
  const recommendation = sorted[0][0];

  res.redirect(`/redirect?drink=${encodeURIComponent(recommendation)}`);
});

// ✅ 서버 시작
app.listen(port, () => {
  console.log("✅ Server is running on port " + port);
});
