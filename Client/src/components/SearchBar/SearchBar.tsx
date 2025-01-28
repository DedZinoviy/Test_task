import React, { useState, useEffect } from 'react';
import { Box, Typography } from '@mui/material';
import { useDebounce } from 'use-debounce';
import { useSearchParams } from 'react-router-dom';
import { isUrlSearchChanged, searchParamsFilter } from '../../utils';
import { FilterField } from '../FilterField';

/** Компонент поискового элемента */
const SearchBar: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [localSearch, setLocalSearch] = useState(
    searchParams.get('search') || ''
  ); // Текущий текст поиска
  const [urlSearch] = useState(searchParams.get('search') || '');
  const [debouncedSearch] = useDebounce(localSearch, 700); // Дебаунсинг с задержкой 700 мс

  // Когда debouncedSearch изменяется, передаем его в родительский компонент
  useEffect(() => {
    const filterEmail = searchParams.get('filterEmail') || '';
    const filterBody = searchParams.get('filterBody') || '';
    const newSearchParams = searchParamsFilter({
      search: debouncedSearch,
      filterEmail,
      filterBody,
    });
    if (isUrlSearchChanged(searchParams, newSearchParams)) {
      setSearchParams(newSearchParams);
    }
  }, [debouncedSearch, searchParams, setSearchParams]);

  useEffect(() => {
     setLocalSearch(urlSearch);
  }, [urlSearch]);

  // Обработчик изменения ввода
  const handleChange = (s: string) => {
    setLocalSearch(s);
  };

  return (
    <Box sx={{ marginBottom: 2 }}>
      <Typography variant="h6" gutterBottom>
        Поиск по имени
      </Typography>
      <FilterField 
        label="Поиск"
        value={localSearch}
        onChange={handleChange}
      />
      {/* TODO: Добавить кнопку очистки всех фильтров */}
    </Box>
  );
};

export default SearchBar;
