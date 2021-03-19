import React, { useState } from 'react';
import { useBookSearch } from './useBookSearch';
import InfiniteScroll from 'react-infinite-scroll-component';

function App() {
  const [query, setQuery] = useState('gelora');
  const [page, setPage] = useState(1);
  const {book, hasMore} = useBookSearch(query, page);
  
  return (
    <div className="App">
      <input type="search" value={query} onChange={(e) => setQuery(e.target.value)}/>
        <InfiniteScroll
          dataLength={book.length}
          next={() => setPage(page + 1)}
          hasMore={hasMore}
          loader={<h3>Loading...</h3>}
          endMessage={<b>END</b>}
          >
          <ol>
            {book.map(item => (
              <li key={item}>{item}</li>
            ))}
          </ol>
        </InfiniteScroll>
    </div>
  );
}

export default App;
