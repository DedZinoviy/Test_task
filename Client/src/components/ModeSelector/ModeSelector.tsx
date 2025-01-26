import React from 'react';
import { Button, Box, Typography } from '@mui/material';

interface ModeSelectorProps {
  mode: 'json' | 'table';
  onChangeMode: (mode: 'json' | 'table') => void;
}

/** Компонент переключения формата отображения */
const ModeSelector: React.FC<ModeSelectorProps> = ({ mode, onChangeMode }) => {
  return (
    <Box display="flex" justifyContent="center" gap={2} marginBottom={3}>
      <Typography variant="h6">Переключить режим отображения:</Typography>
      

      {mode === 'table' ? (
        
      <Button
      variant="contained"
      onClick={() => onChangeMode('json')}
    >
      Отображать JSON
      </Button>
      ) : (

        <Button
        variant="contained"
        onClick={() => onChangeMode('table')}
      >
        Отображать Таблицу
      </Button>
      )}

    </Box>
  );
};

export default ModeSelector;
