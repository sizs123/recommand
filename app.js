
const express = require('express');
const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

const scoreTable = {
  "웃는 모습이 귀엽고 스윗한 스타일 🍭":     [1,0,0,0,0,0,1],
  "말수가 적지만 깊이 있는 분위기 📚":       [0,1,0,1,0,1,0],
  "깔끔하고 단정한 도시 스타일 🏙️":         [0,0,1,0,0,0,1],
  "갓 구운 달콤한 와플 🧇":                 [1,0,0,0,0,0,1],
  "오래 끓인 깊은 맛의 미소된장국 🍲":       [0,1,0,1,0,1,0],
  "시원하고 개운한 과일 샐러드 🍉":         [0,0,1,0,0,0,1],
  "잔잔하고 감성적인 발라드 🎤":            [0,1,1,1,0,1,0],
  "파워풀한 신나는 아이돌 K-POP 🎸":        [1,0,0,0,1,1,1],
  "요가처럼 부드럽고 편안한 운동 🧘‍♀️":     [0,1,1,0,0,1,0],
  "근육을 키우는 강도 높은 헬스 🏋️‍♂️":     [1,1,0,0,1,0,0],
  "가벼운 동네 산책 🚶‍♂️":                 [0,0,0,0,0,0,1],
  "캐주얼한 펍에서 가볍게 수다 🍟":         [1,0,0,0,1,0,1],
  "고급 다이닝에서 좋은 분위기 즐기기 🍷":   [0,1,1,1,0,1,0],
  "리뷰가 많은 현지 맛집 🌮":              [0,1,0,1,0,0,0],
  "편하게 즐기는 동네 식당 🍝":            [1,0,1,0,1,0,0],
  "길 가다가 끌리는 곳으로 도전 💥":        [0,0,0,1,1,1,0],
  "따뜻하고 기분 좋은 해피엔딩 🎈":         [1,0,0,0,0,0,0],
  "묵직한 감동의 진한 드라마 🎬":           [0,1,1,1,0,1,0],
  "상쾌하고 깔끔한 결말의 영화 🍃":         [0,0,0,0,0,0,1],
  "기분이 가벼워지는 어쿠스틱 🎧":          [1,0,0,0,0,0,1],
  "깊이 있는 클래식이나 재즈 🎷":           [0,1,1,1,0,1,0],
  "마음이 편안해지는 피아노 연주 🎹":       [0,0,0,0,0,0,1]
};

const label = ["두곡","대곡주","명냥","국교1573","니하오","장향형","청향형"];
const descriptions = {
  "두곡":"달콤하고 부드러운 향이 매력적인 두곡을 추천합니다!",
  "대곡주":"깊이 있는 향과 무게감 있는 대곡주가 잘 어울려요.",
  "명냥":"깔끔하고 정제된 스타일의 명냥은 도시적인 당신에게 딱!",
  "국교1573":"중후하고 고급스러운 국교1573, 진한 감성을 가진 당신에게.",
  "니하오":"모험적인 당신에겐 니하오처럼 신선한 술이 어울려요!",
  "장향형":"독특한 매력을 지닌 장향형 향을 즐겨보세요.",
  "청향형":"가볍고 청량한 청향형 술이 당신의 무드를 닮았어요."
};

app.post("/webhook",(req,res)=>{
  const body=req.body;
  const answers=[body.q1,body.q2,body.q3,body.q4,body.q5,body.q6,body.q7,body.q8];
  const totals=[0,0,0,0,0,0,0];
  answers.forEach(ans=>{
    const scores=scoreTable[ans];
    if(scores){
      scores.forEach((v,i)=>totals[i]+=v);
    }
  });
  const maxScore=Math.max(...totals);
  const maxIndex=totals.indexOf(maxScore);
  const result=label[maxIndex];
  res.json({recommendation:result,score:maxScore,message:descriptions[result]});
});
app.get("/",(req,res)=>res.send("Server running"));
app.listen(port, () => console.log("Listening on port " + port));

