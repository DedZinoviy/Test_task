import React from 'react';
import { useParams, Link  } from 'react-router-dom';
import { Button, Typography, Paper, Box } from '@mui/material';
import { useSelector } from 'react-redux';
import { RootState } from '../redux/store';
import { Comment } from '../types/Comment';

/**
 * Компонент страницы комментария.
 */
const DocumentPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();  // Получение id из параметров URL

  // Получение комментария из Redux по id
  const comment = useSelector((state: RootState) =>
    state.comments.data.find((comment: Comment) => comment.id === parseInt(id as string))
  );

  // Сообщить об отсутствии комментария, если комментарий не найден
  if (!comment) {
    return <div>Комментарий не найден</div>;
  }

  const handleBack = () => {
    // Переход на предыдущую страницу со старыми параметрами поиска
    window.history.back();
  };

  // Функция для формирования пути с параметрами
  const createUrlWithParams = (search?: string, filterEmail?: string) => {
    const params = new URLSearchParams();
    if (search) params.set('search', search);
    if (filterEmail) params.set('filterEmail', filterEmail);

    return `?${params.toString()}`;
  };

  return (
    <Paper sx={{ padding: 3, margin: '20px auto', maxWidth: 800 }}>
      <Typography variant="h4" gutterBottom align="center" sx={{ fontWeight: 'bold' }}>
        Детали комментария
      </Typography>

      <Box sx={{ marginBottom: 2 }}>
        <Typography variant="h6" component="div" sx={{ fontWeight: 'bold' }}>
          Имя:
        </Typography>
        {/* Ссылка на страницу с параметрами search и filterEmail */}
        <Link
          to={'/' + createUrlWithParams(comment.name, undefined)}
        >
          <Typography variant="body1" sx={{ paddingLeft: 1, color: 'blue', textDecoration: 'underline' }}>
            {comment.name}
          </Typography>
        </Link>
      </Box>

      <Box sx={{ marginBottom: 2 }}>
        <Typography variant="h6" component="div" sx={{ fontWeight: 'bold' }}>
          Почта:
        </Typography>
        {/* Ссылка на страницу с параметрами search и фильтром по почте */}
        <Link
          to={'/' + createUrlWithParams(undefined, comment.email)}
        >
          <Typography variant="body1" sx={{ paddingLeft: 1, color: 'blue', textDecoration: 'underline' }}>
            {comment.email}
          </Typography>
        </Link>
      </Box>

      <Box sx={{ marginBottom: 3 }}>
        <Typography variant="h6" component="div" sx={{ fontWeight: 'bold' }}>
          Содержание:
        </Typography>
        <Typography variant="body1" sx={{ paddingLeft: 1 }}>
          {comment.body}
        </Typography>
      </Box>

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
    </Paper>
  );
};

export default DocumentPage;
