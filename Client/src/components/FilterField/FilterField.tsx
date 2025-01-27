import React from 'react';
import { TextField, IconButton, InputAdornment } from '@mui/material';
import ClearIcon from '@mui/icons-material/Clear';

interface FilterFieldProps {
  label: string;
  value?: string;
  onChange: (e: string) => void;
}

/** Компонент поля ввода */
const FilterField: React.FC<FilterFieldProps> = ({ label, value, onChange }) => {

  // Функция для очистки поля
  const handleClear = () => {
    onChange('');
  };

  return (
    <TextField
      label={label}
      variant="outlined"
      value={value || ''}
      onChange={(e) => onChange(e.target.value)}
      fullWidth
      InputProps={{
        endAdornment: (
          <InputAdornment position="end">
            {value && (
              <IconButton edge="end" onClick={handleClear}>
                <ClearIcon />
              </IconButton>
            )}
          </InputAdornment>
        ),
      }}
    />
  );
};

export default FilterField;
