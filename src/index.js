import React from 'react';
import ReactDOM from 'react-dom';
import Table from './lib/Table.jsx';
import data from "./data/data.json"

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <div>
      <Table data={data} />
    </div>
  </React.StrictMode>
);
