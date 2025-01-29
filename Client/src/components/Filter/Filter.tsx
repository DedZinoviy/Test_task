import React, { useState, useEffect } from 'react';
import { Box, Typography } from '@mui/material';
import { useDebounce } from 'use-debounce';
import { useSearchParams } from 'react-router-dom';
import { isUrlBodyChanged, isUrlEmailChanged, searchParamsFilter } from '../../utils';
import { FilterField } from '../FilterField';

/** Компонент фильтра. */
const Filter: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const initiateFilterEmail = searchParams.get('filterEmail') || '';
  const [localFilterEmail, setLocalFilterEmail] = useState(initiateFilterEmail); // Текущий текст Email
  const initiateFilterBody = searchParams.get('filterBody') || ''
  const [localFilterBody, setLocalFilterBody] = useState(initiateFilterBody); // Текущий текст тела комментария.

  const [debouncedFilterEmail] = useDebounce(localFilterEmail, 700); // Дебаунсинг для email фильтра
  const [debouncedFilterBody] = useDebounce(localFilterBody, 700);   // Дебаунсинг для body фильтра

  // Сохранение значений фильтра в URL.
  useEffect(() => {
    const search = searchParams.get('search') || '';
    const newSearchParams = searchParamsFilter({ search, filterEmail: debouncedFilterEmail, filterBody: debouncedFilterBody })
    if (isUrlEmailChanged(searchParams, newSearchParams) || isUrlBodyChanged(searchParams, newSearchParams)) {
      setSearchParams(newSearchParams);
    }
  }, [debouncedFilterEmail, debouncedFilterBody, searchParams, setSearchParams]);


  // Обработчики изменения ввода
  const handleEmailChange = (s: string) => {
    setLocalFilterEmail(s);
  };

  const handleBodyChange = (s: string) => {
    setLocalFilterBody(s);
  };

  return (
    <Box display="flex" gap={2} marginBottom={2} flexDirection="column">
      <Typography variant="h6" gutterBottom>Фильтрация</Typography>
      <FilterField
        label='Фильтр по email'
        value={localFilterEmail}
        onChange={handleEmailChange}
      />
      <FilterField
        label="Фильтр по сообщению"
        value={localFilterBody}
        onChange={handleBodyChange}
      />
    </Box>
  );
};

export default Filter;
