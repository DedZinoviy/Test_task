import React, { useState, useEffect, useCallback } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useQuery } from '@tanstack/react-query';
import ModeSelector from '../components/ModeSelector/ModeSelector';
import SearchBar from '../components/SearchBar/SearchBar';
import Filter from '../components/Filter/Filter';
import JsonView from '../components/JsonView/JsonView';
import TableView from '../components/TableView/TableView';
import { Comment } from '../types/Comment';
import { setComments, setLoading, setError } from '../redux/CommentSlice';
import { RootState } from '../redux/store';
import { CircularProgress, Alert, Box, ThemeProvider } from '@mui/material';
import Theme from '../types/Theme.ts';  // Импорт темы

/// Получение данных
const fetchData = async (): Promise<Comment[]> => {
  const response = await fetch('https://jsonplaceholder.typicode.com/comments');
  if (!response.ok) {
    throw new Error('Ошибка при загрузке данных');
  }
  return response.json();
};

/// Компонент главной страницы
const MainPage: React.FC = () => {
  const [mode, setMode] = useState<'json' | 'table'>('table');
  const [searchParams, setSearchParams] = useSearchParams();

  // Извлечение параметры поиска и фильтров из URL
  const search = searchParams.get('search') || '';
  const filterEmail = searchParams.get('filterEmail') || '';
  const filterBody = searchParams.get('filterBody') || '';

  const dispatch = useDispatch();
  const { data, loading, error } = useSelector((state: RootState) => state.comments);

  const { isLoading, error: queryError, data: queryData } = useQuery<Comment[], Error>({
    queryKey: ['comments'],
    queryFn: fetchData,
  });

  useEffect(() => {
    if (queryData) {
      dispatch(setComments(queryData));
      dispatch(setLoading(false));
    }
  }, [queryData, dispatch]);

  useEffect(() => {
    if (queryError instanceof Error) {
      dispatch(setError(queryError.message));
      dispatch(setLoading(false));
    }
  }, [queryError, dispatch]);

  useEffect(() => {
    if (isLoading) {
      dispatch(setLoading(true));
    }
  }, [isLoading, dispatch]);

  // Обновление строки поиска и фильтров в URL
  useEffect(() => {
    const params: { [key: string]: string } = {};
    if (search) params.search = search;
    if (filterEmail) params.filterEmail = filterEmail;
    if (filterBody) params.filterBody = filterBody;

    setSearchParams(params);
  }, [search, filterEmail, filterBody, setSearchParams]);

  // Обработчики изменений поиска и фильтров
  const handleSearchChange = useCallback((newSearch: string) => {
    setSearchParams({ search: newSearch, filterEmail, filterBody });
  }, [filterEmail, filterBody, setSearchParams]);

  const handleFilterEmailChange = useCallback((newFilterEmail: string) => {
    setSearchParams({ search, filterEmail: newFilterEmail, filterBody });
  }, [search, filterBody, setSearchParams]);

  const handleFilterBodyChange = useCallback((newFilterBody: string) => {
    setSearchParams({ search, filterEmail, filterBody: newFilterBody });
  }, [search, filterEmail, setSearchParams]);

  if (loading || isLoading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <CircularProgress />
      </Box>
    );
  }

  if (error || queryError instanceof Error) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <Alert severity="error">{error || queryError?.message}</Alert>
      </Box>
    );
  }

  return (
    <ThemeProvider theme={Theme}> {/* Используем ThemeProvider для темы */}
      <Box sx={{ padding: 3 }}>
        { /* Выбор режима отображения */ }
        <ModeSelector mode={mode} onChangeMode={setMode} />

        {/* SearchBar */}
        {mode === 'table' && <SearchBar search={search} onSearchChange={handleSearchChange} />}

        {/* Фильтрация */}
        {mode === 'table' && (
          <Box sx={{ marginTop: 2 }}>
            <Filter
              filterEmail={filterEmail}
              filterBody={filterBody}
              onFilterEmailChange={handleFilterEmailChange}
              onFilterBodyChange={handleFilterBodyChange}
            />
          </Box>
        )}

        {mode === 'json' ? (
          <JsonView data={data || []} />
        ) : (
          <TableView search={search} filterEmail={filterEmail} filterBody={filterBody} />
        )}
      </Box>
    </ThemeProvider>
  );
};

export default MainPage;
