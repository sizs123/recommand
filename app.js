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
  } else if (q2 === "시원하고 개운한 과일 샐러드 🍉") {
    drinks["명냥"] += 1;
    drinks["청향형"] += 1;
  }

  // Q3
  if (q3 === "잔잔하고 감성적인 발라드 🎤") {
    drinks["대곡주"] += 1;
    drinks["명냥"] += 1;
    drinks["국교1573"] += 1;
    drinks["니하오"] += 1;
  } else if (q3 === "파워풀한 신나는 아이돌 K-POP 🎸") {
    drinks["두곡"] += 1;
    drinks["국교1573"] += 1;
    drinks["청향형"] += 1;
  }

  // Q4
  if (q4 === "요가처럼 부드럽고 편안한 운동 🧘‍♀️") {
    drinks["명냥"] += 1;
    drinks["국교1573"] += 1;
    drinks["니하오"] += 1;
  } else if (q4 === "근육을 키우는 강도 높은 헬스 🏋️‍♂️") {
    drinks["두곡"] += 1;
    drinks["대곡주"] += 1;
    drinks["국교1573"] += 1;
  } else if (q4 === "가벼운 동네 산책 🚶‍♂️") {
    drinks["청향형"] += 1;
  }

  // Q5
  if (q5 === "캐주얼한 펍에서 가볍게 수다 🍟") {
    drinks["두곡"] += 1;
    drinks["장향형"] += 1;
    drinks["니하오"] += 1;
  } else if (q5 === "고급 다이닝에서 좋은 분위기 즐기기 🍷") {
    drinks["대곡주"] += 1;
    drinks["명냥"] += 1;
    drinks["국교1573"] += 1;
    drinks["니하오"] += 1;
  }

  // Q6
  if (q6 === "리뷰가 많은 현지 맛집 🌮") {
    drinks["대곡주"] += 1;
    drinks["국교1573"] += 1;
  } else if (q6 === "편하게 즐기는 동네 식당 🍝") {
    drinks["두곡"] += 1;
    drinks["장향형"] += 1;
    drinks["니하오"] += 1;
  } else if (q6 === "길 가다가 끌리는 곳으로 도전 💥") {
    drinks["명냥"] += 1;
    drinks["청향형"] += 1;
  }

  // Q7
  if (q7 === "따뜻하고 기분 좋은 해피엔딩 🎈") {
    drinks["두곡"] += 1;
    drinks["장향형"] += 1;
  } else if (q7 === "묵직한 감동의 진한 드라마 🎬") {
    drinks["대곡주"] += 1;
    drinks["명냥"] += 1;
    drinks["국교1573"] += 1;
  } else if (q7 === "상쾌하고 깔끔한 결말의 영화 🍃") {
    drinks["명냥"] += 1;
    drinks["청향형"] += 1;
  }

  // Q8
  if (q8 === "기분이 가벼워지는 어쿠스틱 🎧") {
    drinks["두곡"] += 1;
    drinks["장향형"] += 1;
  } else if (q8 === "깊이 있는 클래식이나 재즈 🎷") {
    drinks["대곡주"] += 1;
    drinks["명냥"] += 1;
    drinks["국교1573"] += 1;
  } else if (q8 === "마음이 편안해지는 피아노 연주 🎹") {
    drinks["명냥"] += 1;
    drinks["청향형"] += 1;
  }

  const recommendation = Object.entries(drinks).sort((a, b) => b[1] - a[1])[0][0];
  const score = drinks[recommendation];
  const message = `당신에게 어울리는 전통주는 "${recommendation}" 입니다!`;

  res.redirect(`/result.html?message=${encodeURIComponent(message)}`);
});
