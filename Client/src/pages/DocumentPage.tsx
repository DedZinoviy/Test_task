import React from 'react';
import { useParams } from 'react-router-dom';
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

  return (
    <Paper sx={{ padding: 3, margin: '20px auto', maxWidth: 800 }}>
      <Typography variant="h4" gutterBottom align="center" sx={{ fontWeight: 'bold' }}>
        Детали комментария
      </Typography>

      <Box sx={{ marginBottom: 2 }}>
        <Typography variant="h6" component="div" sx={{ fontWeight: 'bold' }}>
          Имя:
        </Typography>
        <Typography variant="body1" sx={{ paddingLeft: 1 }}>
          {comment.name}
        </Typography>
      </Box>

      <Box sx={{ marginBottom: 2 }}>
        <Typography variant="h6" component="div" sx={{ fontWeight: 'bold' }}>
          Почта:
        </Typography>
        <Typography variant="body1" sx={{ paddingLeft: 1 }}>
          {comment.email}
        </Typography>
      </Box>

      <Box sx={{ marginBottom: 3 }}>
        <Typography variant="h6" component="div" sx={{ fontWeight: 'bold' }}>
          Содержание:
        </Typography>
        <Typography variant="body1" sx={{ paddingLeft: 1 }}>
          {comment.body}
        </Typography>
      </Box>

      {/* Кнопка "Назад" */}
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
