/*
 Это ваше второе задание.
 Напишите Я люблю большие бутылки в функции res.send 
*/
import express from 'express';

const app = express();
const port = 3111;

app.get('/', (req, res) => {
  res.send('Welcome to a WebContainers app! 🥳');
});

app.listen(port, () => {
  console.log(`App is live at http://localhost:${port}`);
});
