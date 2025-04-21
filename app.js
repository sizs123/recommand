const express = require('express');
const multer = require('multer');
const path = require('path');

const app = express();
const upload = multer();
const port = process.env.PORT || 3000;

// ✅ 정적 파일 제공 (HTML 결과용)
app.use(express.static(path.join(__dirname, 'public')));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ✅ Webhook 처리
app.post('/webhook', upload.none(), (req, res) => {
  console.log("✅ Webhook 도착");
  const data = req.body;
  console.log(data);

  const q1 = data["Q1. 오늘은 떨리는 소개팅!"];
  const q2 = data["Q2. 조식에서 꼭 먹는 메뉴는?"];
  // Q3~Q8도 필요한 경우 추가

  // 기본 점수
  const drinks = {
    "두곡": 0,
    "대곡주": 0,
    "명냥": 0,
    "국교1573": 0,
    "니하오": 0,
    "장향형": 0,
    "청향형": 0,
  };

  if (q1 === "웃
