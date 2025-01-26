import React, { useState } from 'react';
import { Filter, ModeSelector, JsonView, SearchBar , TableView } from '../components'; // TODO: поправить импорты
import { CircularProgress, Alert, Box } from '@mui/material';
import { useAppSelector } from '../redux';
import { useData } from '../hooks';

/// Компонент главной страницы
export const MainPage: React.FC = () => {
  const [mode, setMode] = useState<'json' | 'table'>('table');
  const error = useAppSelector(state => state.comments.error)
  const { isLoading } = useData();

  if (isLoading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <Alert severity="error">{error}</Alert>
      </Box>
    );
  }

  return (
    <Box sx={{ padding: 3 }}>
      { /* Выбор режима отображения */}
      <ModeSelector mode={mode} onChangeMode={setMode} />

      {/* Фильтрация */}
      {mode === 'table' && (
        <>
          <SearchBar />
          <Box sx={{ marginTop: 2 }}>
            <Filter />
          </Box>
        </>
      )}

      {mode === 'json' ? (
        <JsonView />
      ) : (
        <TableView />
      )}
    </Box>
  );
};
