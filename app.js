const express = require('express');
const multer = require('multer');
const path = require('path');

const app = express();
const upload = multer();
const port = process.env.PORT || 3000;

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.post('/webhook', upload.none(), (req, res) => {
  const data = req.body;
  const pretty = data.pretty || "";

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

  const recommendation = Object.entries(drinks).sort((a, b) => b[1] - a[1])[0][0];
  const safeFile = encodeURIComponent(recommendation);
  res.redirect(302, `/result.html?drink=${safeFile}`);

});

app.listen(port, () => {
  console.log("✅ Server is running on port " + port);
});
