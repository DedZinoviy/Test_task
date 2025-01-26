import React, { useState, useEffect } from 'react';
import { TextField, Box, Typography } from '@mui/material';
import { useDebounce } from 'use-debounce'; // Импортируем useDebounce
import { useSearchParams } from 'react-router-dom';
import { isUrlFilterChanged, searchParamsFilter } from '../../utils';

/** Компонент поискового элемента */
const SearchBar: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [localSearch, setLocalSearch] = useState(
    searchParams.get('search') || ''
  ); // Текущий текст поиска
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
    if (isUrlFilterChanged(searchParams, newSearchParams)) {
      setSearchParams(newSearchParams);
    }
  }, [debouncedSearch, searchParams, setSearchParams]);

  // Обработчик изменения ввода
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLocalSearch(e.target.value);
  };

  return (
    <Box sx={{ marginBottom: 2 }}>
      <Typography variant="h6" gutterBottom>
        Поиск по имени
      </Typography>
      {/* Заголовок компонента */}
      {/* Сделать отдельный компонент FilterField = textfiled + очистка */}
      <TextField
        label="Поиск"
        variant="outlined"
        value={localSearch}
        onChange={handleChange}
        fullWidth
      />
      {/* TODO: Добавить очистку полей фильтров => X */}
      {/* TODO: Добавить кнопку очистки всех фильтров */}
    </Box>
  );
};

export default SearchBar;
