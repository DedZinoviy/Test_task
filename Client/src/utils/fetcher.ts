import { Comment } from '../types';

/**
 * Получить данные (комментарии) с сервера.
 */
export const fetchData = async (): Promise<Comment[]> => {
    const response = await fetch( 'http://localhost:3000/comments'/*'https://jsonplaceholder.typicode.com/comments'*/);
    if (!response.ok) {
        throw new Error('Ошибка при загрузке данных');
    }
    return response.json();
};
