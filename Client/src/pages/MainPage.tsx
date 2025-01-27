import React from 'react';
import { Filter, JsonView, SearchBar, TableView } from '../components';
import { CircularProgress, Alert, Box, Typography } from '@mui/material';
import { useAppSelector } from '../redux';
import { useData } from '../hooks';
import { PageProps } from './PageProps';

/// Компонент главной страницы
export const MainPage: React.FC<PageProps> = ({viewMode}) => {
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
      
      {/* Фильтрация */}
      {viewMode === 'table' && (
        <>
          <Typography variant="h1" gutterBottom>
            Таблица
          </Typography>
          <SearchBar />
          <Box sx={{ marginTop: 2 }}>
            <Filter />
          </Box>
        </>
      )}

      {viewMode === 'json' ? (
        <>
          <Typography variant="h1" gutterBottom>
            JSON
          </Typography>
          <JsonView />
        </>
      ) : (
        <TableView />
      )}
    </Box>
  );
};
