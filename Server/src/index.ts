import express, { Express } from 'express';
import cors  from 'cors';
import commentsRouter from './routes/comments';  // Роутер для комментариев

// Экземпляр приложения
const app: Express = express();

// Настройка CORS для только одного домена
app.use(cors({
    origin: 'http://localhost:5173',
  }));

// Порт, на котором будет слушать сервер
const PORT: number = parseInt(process.env.PORT || '3000', 10);

// Использование роутера для комментариев
app.use('/comments', commentsRouter);

// Запуск сервера
app.listen(PORT, (): void => {
    console.log(`Сервер работает на порту ${PORT}`);
});
