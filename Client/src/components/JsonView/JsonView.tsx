import React from 'react';
import ReactJson from 'react-json-view';
import { useAppSelector } from '../../redux';
import { useColorScheme } from '@mui/material';

/** Компонент отображения JSON. */
const JsonView: React.FC = () => {
  const data = useAppSelector(state => state.comments.data)
  const { mode } = useColorScheme();
  return (
    <div>
      <h2>Отображение JSON</h2>
      <ReactJson src={data} theme={mode === 'light' ? 'bright:inverted' : 'bright'}  />
    </div>
  );
};

export default JsonView;
