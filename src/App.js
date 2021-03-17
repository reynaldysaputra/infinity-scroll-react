import React, { useState } from 'react';
import { useBookSearch } from './useBookSearch';

function App() {
  const [query, setQuery] = useState('');
  const [page, setPage] = useState(1);

  function handleSearch(e) {
    setQuery(e.target.value);
    setPage(1);
  }
  
  useBookSearch(query, page);
  
  return (
    <div className="App">
      <input type="search" onChange={handleSearch}/>
    </div>
  );
}

export default App;
