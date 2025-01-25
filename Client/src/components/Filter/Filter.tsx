import React, { useState, useEffect } from 'react';
import { TextField, Box, Typography } from '@mui/material';
import { useDebounce } from 'use-debounce';
import { ThemeProvider } from '@mui/material';
import Theme from '../../types/Theme.ts';  // Импорт темы

interface FilterProps {
  filterEmail: string;
  filterBody: string;
  onFilterEmailChange: (email: string) => void;
  onFilterBodyChange: (body: string) => void;
}

/** Компонент фильтра. */
const Filter: React.FC<FilterProps> = ({ filterEmail, filterBody, onFilterEmailChange, onFilterBodyChange }) => {
  const [localFilterEmail, setLocalFilterEmail] = useState(filterEmail); // Текущий текст Email
  const [localFilterBody, setLocalFilterBody] = useState(filterBody); // Текущий текст тела комментария.

  const [debouncedFilterEmail] = useDebounce(localFilterEmail, 700); // Дебаунсинг для email фильтра
  const [debouncedFilterBody] = useDebounce(localFilterBody, 700);   // Дебаунсинг для body фильтра

  // Передача в родительский компонент дебаунсированных значений, когда они изменяются
  useEffect(() => {
    onFilterEmailChange(debouncedFilterEmail);
  }, [debouncedFilterEmail, onFilterEmailChange]);

  useEffect(() => {
    onFilterBodyChange(debouncedFilterBody);
  }, [debouncedFilterBody, onFilterBodyChange]);

  // Обработчики изменения ввода
  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLocalFilterEmail(e.target.value);
  };

  const handleBodyChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLocalFilterBody(e.target.value);
  };

  return (
    <ThemeProvider theme={Theme}> {/* Оборачиваем компонент в ThemeProvider */}
      <Box display="flex" gap={2} marginBottom={2} flexDirection="column">
        <Typography variant="h6" gutterBottom>Фильтрация</Typography> {/* Заголовок для фильтров */}
        <TextField
          label="Фильтр по email"
          variant="outlined"
          value={localFilterEmail}
          onChange={handleEmailChange}
          fullWidth
        />
        <TextField
          label="Фильтр по сообщению"
          variant="outlined"
          value={localFilterBody}
          onChange={handleBodyChange}
          fullWidth
        />
      </Box>
    </ThemeProvider>
  );
};

export default React.memo(Filter);
