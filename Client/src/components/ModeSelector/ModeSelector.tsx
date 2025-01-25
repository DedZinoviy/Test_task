import React from 'react';
import { Button, Box, Typography } from '@mui/material';
import { ThemeProvider } from '@mui/material';
import Theme from '../../types/Theme.ts';  // Импорт темы

interface ModeSelectorProps {
  mode: 'json' | 'table';
  onChangeMode: (mode: 'json' | 'table') => void;
}

/** Компонент переключения формата отображения */
const ModeSelector: React.FC<ModeSelectorProps> = ({ mode, onChangeMode }) => {
  return (
    <ThemeProvider theme={Theme}> {/* Используем ThemeProvider для темы */}
      <Box display="flex" justifyContent="center" gap={2} marginBottom={3}>
        <Typography variant="h6">Выберите режим отображения:</Typography>
        <Button
          variant="contained"
          onClick={() => onChangeMode('json')}
          color={mode === 'json' ? 'primary' : 'secondary'}
        >
          Отображать JSON
        </Button>
        <Button
          variant="contained"
          onClick={() => onChangeMode('table')}
          color={mode === 'table' ? 'primary' : 'secondary'}
        >
          Отображать Таблицу
        </Button>
      </Box>
    </ThemeProvider>
  );
};

export default ModeSelector;
