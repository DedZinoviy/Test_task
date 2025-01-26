import { useQuery } from '@tanstack/react-query';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { setComments, setError } from '../redux/CommentSlice';
import { fetchData } from '../utils';
import { Comment } from '../types';

/**
 * Кастомный хук получения данных.
 * @returns 
 */
export function useData() {
    const dispatch = useDispatch();

    const { isLoading, error: queryError, data: comments } = useQuery<Comment[], Error>({
        queryKey: ['comments'],
        queryFn: fetchData,
    });

    useEffect(() => {
        if (comments) {
            dispatch(setComments(comments)); // Т.к. используем useQuery, то тут redux не нужен
        }
    }, [comments, dispatch]);

    useEffect(() => {
        if (queryError instanceof Error) {
            dispatch(setError(queryError.message));
        }
    }, [queryError, dispatch]);

    return { isLoading, comments, queryError }
}