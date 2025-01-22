import express, { Request, Response } from 'express';
import axios from 'axios';
import https from 'https';
import dotenv from 'dotenv';

// Загрузка переменных окружения из файла .env
dotenv.config();

// Экземпляр Router
const router = express.Router();

// URL OpenSearch
const url = 'https://localhost:9200/comments_index/_search?pretty&size=500';

// Получение логина и пароля из переменных окружения
const username = process.env.OPENSEARCH_USERNAME;
const password = process.env.OPENSEARCH_PASSWORD;

// Проверка наличия переменных окружения
if (!username || !password) {
  throw new Error('Логин и пароль для OpenSearch не указаны в .env файле');
}

// Конфигурация для axios, включая https агент для игнорирования SSL ошибок (insecure)
const axiosConfig = {
  httpsAgent: new https.Agent({  
    rejectUnauthorized: false  // Отключение проверки SSL-сертификатов (insecure)
  }),
  auth: {
    username: username,   // Логин из .env
    password: password    // Пароль из .env
  }
};

// Маршрут для получения всех комментариев из OpenSearch
router.get('/', async (req: Request, res: Response): Promise<void> => {
    try {
        // Запрос к OpenSearch
        const response = await axios.get(url, axiosConfig);

        // Проверка успешности запроса
        if (response.status === 200) {
            // Извлечение данных из поля _source для каждого документа
            const documents = response.data.hits.hits.map((hit: any) => hit._source);
            
            // Отправка отформатированного JSON-ответа
            res.setHeader('Content-Type', 'application/json');
            res.status(200).send(JSON.stringify(documents, null, 2));
        } else {
            res.status(response.status).json({ error: `Ошибка: ${response.status}` });
        }
    } catch (error) {
        console.error('Ошибка при получении данных:', error);
        res.status(500).json({ error: 'Ошибка при получении данных' });
    }
});

// Экспорт роутера
export default router;
