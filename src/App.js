import './App.css';
import Table from './Table';
import React, { useState } from 'react';

// Component hierarchy
// App: Renders 2 Node -> Input Node and Table Component
// Table: Renders 2 Node -> Main Table Node and Posts Component (before any click action, second table is invisible.)

function App() {
  // state holding search input changes
  const [query, setQuery] = useState('');
  // search functionality for filtering Main table
  const search = (rows) => {
    return rows.filter((row) => row.name.toLowerCase().indexOf(query) > -1);
  };
  

  return (
    <div className="App">
      <input type='text' id='search-input' value={query} placeholder={`Search`} onChange={(e) => setQuery(e.target.value)}></input>
      <Table search={search} query={query} />
    </div>
  );
}

export default App;
