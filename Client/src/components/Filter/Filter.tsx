import React, { useState, useEffect } from 'react';
import { TextField, Box, Typography } from '@mui/material';
import { useDebounce } from 'use-debounce';
import { useSearchParams } from 'react-router-dom';
// import { SearchParams } from '../../types';
import { isUrlFilterChanged, searchParamsFilter } from '../../utils';

/** Компонент фильтра. */
const Filter: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [localFilterEmail, setLocalFilterEmail] = useState(searchParams.get('filterEmail') || ''); // Текущий текст Email
  const [localFilterBody, setLocalFilterBody] = useState(searchParams.get('filterBody') || ''); // Текущий текст тела комментария.

  const [debouncedFilterEmail] = useDebounce(localFilterEmail, 700); // Дебаунсинг для email фильтра
  const [debouncedFilterBody] = useDebounce(localFilterBody, 700);   // Дебаунсинг для body фильтра

  // Передача в родительский компонент дебаунсированных значений, когда они изменяются
  useEffect(() => {
    const search = searchParams.get('search') || '';
    const filterBody = searchParams.get('filterBody') || '';
    const newSearchParams = searchParamsFilter({ search, filterEmail: debouncedFilterEmail, filterBody })
    if (isUrlFilterChanged(searchParams, newSearchParams)) {
      setSearchParams(newSearchParams);
    }
  }, [debouncedFilterEmail, searchParams, setSearchParams]);

  useEffect(() => {
    const search = searchParams.get('search') || '';
    const filterEmail = searchParams.get('filterEmail') || '';
    const newSearchParams = searchParamsFilter({search, filterEmail, filterBody: debouncedFilterBody});
    if (isUrlFilterChanged(searchParams, newSearchParams)) {
      setSearchParams(newSearchParams);
    }
  }, [debouncedFilterBody, searchParams, setSearchParams]);

  // Обработчики изменения ввода
  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLocalFilterEmail(e.target.value);
  };

  const handleBodyChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLocalFilterBody(e.target.value);
  };

  return (
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
  );
};

export default React.memo(Filter);
