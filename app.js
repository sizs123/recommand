app.post('/webhook', upload.none(), (req, res) => {
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

  // Q1
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

  // Q2
  if (q2 === "갓 구운 달콤한 와플 🧇") {
    drinks["두곡"] += 1;
    drinks["장향형"] += 1;
  } else if (q2 === "오래 끓인 깊은 맛의 미소된장국 🍲") {
    drinks["대곡주"] += 1;
    drinks["명냥"] += 1;
    drinks["국교1573"] += 1;
  } else if (q2 === "시원하고 개운
