import React from 'react';
import { Button } from '@mui/material';

interface ModeSelectorProps {
  mode: 'json' | 'table';
  onChangeMode: (mode: 'json' | 'table') => void;
}

/** Компонент переключения формата отображения */
const ModeSelector: React.FC<ModeSelectorProps> = ({ mode, onChangeMode }) => {
  return (
    <div>
      <Button
        variant="contained"
        onClick={() => onChangeMode('json')}
        style={{ margin: '10px' }}
        color={mode === 'json' ? 'primary' : 'secondary'}
      >
        Отображать JSON
      </Button>
      <Button
        variant="contained"
        onClick={() => onChangeMode('table')}
        style={{ margin: '10px' }}
        color={mode === 'table' ? 'primary' : 'secondary'}
      >
        Отображать Таблицу
      </Button>
    </div>
  );
};

export default ModeSelector;
