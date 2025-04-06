require('dotenv').config();
const express = require('express');
const cors = require('cors');
const path = require('path');
const { OpenAI } = require('openai');

const app = express();
const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public'))); // 여기 추가!

// Rest API 사용 시 코드
// // REST API: POST /chat
// app.post('/chat', async (req, res) => {
//   const userMessage = req.body.message;

//   if (!userMessage) {
//     return res.status(400).json({ error: 'message가 필요합니다.' });
//   }

//   try {
//     const response = await openai.chat.completions.create({
//       model: 'gpt-3.5-turbo-0125',
//       messages: [{ role: 'user', content: userMessage }],
//     });

//     const reply = response.choices[0].message.content;
//     res.status(200).json({ reply });
//   } catch (error) {
//     console.error('[❌ OpenAI 오류]', error.message);
//     res.status(500).json({ error: 'GPT 응답 중 오류 발생' });
//   }
// });

// app.listen(3000, () => {
//   console.log('✅ 서버 실행 중: http://localhost:3000');
// });

// 기본 사용 코드 
app.post('/chat', async (req, res) => {
  const userMessage = req.body.message;

  try {
    const response = await openai.chat.completions.create({
      model: 'gpt-4o-mini',
      messages: [{ role: 'user', content: userMessage }],
    });

    const reply = response.choices[0].message.content;
    res.json({ reply });
  } catch (error) {
    console.error('OpenAI 에러:', error);
    res.status(500).json({ reply: '오류가 발생했습니다 😢' });
  }
});

// // 포켓베이스에 저장 시키는 코드
// app.post('/chat', async (req, res) => {
//   const userMessage = req.body.message;

//   if (!userMessage) {
//     return res.status(400).json({ error: 'message가 필요합니다.' });
//   }

//   try {
//     // 1. 유저 메시지를 PocketBase에 저장
//     await pb.collection('messages').create({
//       text: userMessage,
//       from: 'user'
//     });

//     // 2. GPT 응답 생성
//     const response = await openai.chat.completions.create({
//       model: 'gpt-3.5-turbo-0125',
//       messages: [{ role: 'user', content: userMessage }],
//     });

//     const reply = response.choices[0].message.content;

//     // 3. GPT 메시지도 저장
//     await pb.collection('messages').create({
//       text: reply,
//       from: 'gpt'
//     });

//     res.status(200).json({ reply });
//   } catch (error) {
//     console.error('[❌ 오류]', error.message);
//     res.status(500).json({ error: '처리 중 오류 발생' });
//   }
// });


app.listen(3000, () => {
  console.log('✅ 서버 실행 중: http://localhost:3000');
});
