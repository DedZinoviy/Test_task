import React, { useState, useEffect } from 'react';
import { TextField, Box, Typography } from '@mui/material';
import { useDebounce } from 'use-debounce'; // Импортируем useDebounce
import { ThemeProvider } from '@mui/material';
import Theme from '../../types/Theme.ts';  // Импорт темы

interface SearchBarProps {
  search: string;
  onSearchChange: (search: string) => void;
}

/** Компонент поискового элемента */
const SearchBar: React.FC<SearchBarProps> = ({ search, onSearchChange }) => {
  const [localSearch, setLocalSearch] = useState(search); // Текущий текст поиска
  const [debouncedSearch] = useDebounce(localSearch, 700); // Дебаунсинг с задержкой 700 мс

  // Когда debouncedSearch изменяется, передаем его в родительский компонент
  useEffect(() => {
    onSearchChange(debouncedSearch);
  }, [debouncedSearch, onSearchChange]);

  // Обработчик изменения ввода
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLocalSearch(e.target.value);
  };

  return (
    <ThemeProvider theme={Theme}> {/* Используем ThemeProvider для темы */}
      <Box sx={{ marginBottom: 2 }}>
        <Typography variant="h6" gutterBottom>Поиск по имени</Typography> {/* Заголовок компонента */}
        <TextField
          label="Поиск"
          variant="outlined"
          value={localSearch}
          onChange={handleChange}
          fullWidth
        />
      </Box>
    </ThemeProvider>
  );
};

export default SearchBar;
