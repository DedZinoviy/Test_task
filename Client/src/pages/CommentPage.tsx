import React from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { Button, Typography, Box, useColorScheme } from '@mui/material';
import { useAppSelector } from '../redux';
import { PageProps } from './PageProps';
import ReactJson from 'react-json-view';

/**
 * Компонент страницы комментария.
 */
export const CommentPage: React.FC<PageProps> = ({viewMode}) => {
  const navigate = useNavigate()
  const { id } = useParams<{ id: string }>();  // Получение id из параметров URL
  const { mode } = useColorScheme();

  // Получение комментария из Redux по id
  const comment = useAppSelector((state) =>
    state.comments.data.find((comment) => comment.id === parseInt(id as string))
  );

  // Сообщить об отсутствии комментария, если комментарий не найден
  if (!comment) {
    return (
      <Box sx={{ padding: 3, textAlign: 'center' }}>
        <Typography variant="h6">Комментарий не найден</Typography>
      </Box>
    );
  }

  const handleBack = () => {
    // Переход на предыдущую страницу со старыми параметрами поиска
    navigate(-1);
  };

  // Функция для формирования пути с параметрами
  const createUrlWithParams = (search?: string, filterEmail?: string) => {
    const params = new URLSearchParams();
    if (search) params.set('search', search);
    if (filterEmail) params.set('filterEmail', filterEmail);

    return `?${params.toString()}`;
  };

  return (
    <Box sx={{ margin: '20px auto', maxWidth: 800 }}>
      <Typography variant="h1" gutterBottom>
        Детали комментария
      </Typography>
      
      { viewMode === 'table' ? (
        <>
      <Box sx={{ marginBottom: 2 }}>
        <Typography variant="h6" component="div">
          Имя:
        </Typography>
        {/* Ссылка на страницу с параметрами search и filterEmail */}
        <Link
          to={{
            pathname: '/',
            search: createUrlWithParams(comment.name, undefined),
          }}
        >
          <Typography variant="body1" sx={{ paddingLeft: 1, color: 'blue', textDecoration: 'underline' }}>
            {comment.name}
          </Typography>
        </Link>
      </Box>

      <Box sx={{ marginBottom: 2 }}>
        <Typography variant="h6" component="div">
          Почта:
        </Typography>
        {/* Ссылка на страницу с параметрами search и фильтром по почте */}
        <Link
          to={{
            pathname: '/',
            search: createUrlWithParams(undefined, comment.email),
          }}
        >
          <Typography variant="body1" sx={{ paddingLeft: 1, color: 'blue', textDecoration: 'underline' }}>
            {comment.email}
          </Typography>
        </Link>
      </Box>

      <Box sx={{ marginBottom: 3 }}>
        <Typography variant="h6" component="div">
          Содержание:
        </Typography>
        <Typography variant="body1" sx={{ paddingLeft: 1 }}>
          {comment.body}
        </Typography>
      </Box>
      </>
      ) : (
        <>
          <ReactJson src={comment} theme={mode === 'light' ? 'bright:inverted' : 'bright'}  />
        </>
      )}
      <Button
        onClick={handleBack}
        color="primary"
        variant="contained"
        sx={{
          display: 'block',
          margin: '0 auto',
          padding: '10px 20px',
          backgroundColor: '#3f51b5',
          '&:hover': {
            backgroundColor: '#303f9f',
          },
        }}
      >
        Назад
      </Button>
    </Box>
  );
};

