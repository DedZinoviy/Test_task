import React from 'react';
import { Button, Box } from '@mui/material';

interface ModeSelectorProps {
  mode: 'json' | 'table';
  onChangeMode: (mode: 'json' | 'table') => void;
}

/** Компонент переключения формата отображения */
const ModeSelector: React.FC<ModeSelectorProps> = ({ mode, onChangeMode }) => {
  return (
    <>
    <Box display="flex" justifyContent="center" sx={{height: '100%'}}>
      {mode === 'table' ? (
      <Button
      sx={{height: '100%', width: 200}}
      variant="text"
      color="inherit"
      onClick={() => onChangeMode('json')}
      >
      Отображать JSON
      </Button>
      ) : (
      <Button
      sx={{height: '100%', width: 200}}
      variant="text"
      color="inherit"
      onClick={() => onChangeMode('table')}
      >
        Отображать Таблицу
      </Button>
      )}

    </Box>

    </>
  );
};

export default ModeSelector;
