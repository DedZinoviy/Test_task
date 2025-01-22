import React, { useState, useEffect } from 'react';
import { TextField, Box } from '@mui/material';
import { useDebounce } from 'use-debounce';

interface FilterProps {
  filterEmail: string;
  filterBody: string;
  onFilterEmailChange: (email: string) => void;
  onFilterBodyChange: (body: string) => void;
}

/** Компоенет фильтра. */
const Filter: React.FC<FilterProps> = ({ filterEmail, filterBody, onFilterEmailChange, onFilterBodyChange }) => {
  const [localFilterEmail, setLocalFilterEmail] = useState(filterEmail); // Текуший текст Email
  const [localFilterBody, setLocalFilterBody] = useState(filterBody); // текущий текст тела комментария.

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
    <Box display="flex" gap={2} marginBottom={2}>
      <TextField
        label="Фильтр по email"
        variant="outlined"
        value={localFilterEmail}
        onChange={handleEmailChange}
      />
      <TextField
        label="Фильтр по сообщению"
        variant="outlined"
        value={localFilterBody}
        onChange={handleBodyChange}
      />
    </Box>
  );
};

export default React.memo(Filter);
