import React, { useState, useEffect } from 'react';
import { TextField } from '@mui/material';
import { useDebounce } from 'use-debounce'; // Импортируем useDebounce

interface SearchBarProps {
  search: string;
  onSearchChange: (search: string) => void;
}

/** Компонент поискового элемента */
const SearchBar: React.FC<SearchBarProps> = ({ search, onSearchChange }) => {
  const [localSearch, setLocalSearch] = useState(search); // Текуший текст поиска
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
    <TextField
      label="Поиск"
      variant="outlined"
      value={localSearch}
      onChange={handleChange}
      fullWidth
      style={{ marginBottom: '20px' }}
    />
  );
};

export default SearchBar;
