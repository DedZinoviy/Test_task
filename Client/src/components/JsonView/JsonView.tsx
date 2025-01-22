import React from 'react';
import ReactJson from 'react-json-view';

interface JsonViewProps {
  data: object;
}

/** Компонент отображения JSON. */
const JsonView: React.FC<JsonViewProps> = ({ data }) => {
  return (
    <div>
      <h2>Отображение JSON</h2>
      <ReactJson src={data} theme="monokai" />
    </div>
  );
};

export default JsonView;
