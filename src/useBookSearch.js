import React, { useEffect, useState } from "react";
import axios from 'axios';

export function useBookSearch(query, page){
   const [book, setBook] = useState([]);
   const [hasMore, setHasMore] = useState(true);
   let source = new axios.CancelToken.source(); // setiap dirender ulang, data ini akan dari ulang

   useEffect(() => {
      setBook([]);
   }, [query])

   useEffect(() => {
      setHasMore(true);

      axios({
         method : 'GET',
         url : 'http://openlibrary.org/search.json',
         params : {q : query, page : page},
         cancelToken : source.token // ini token yang berisi fungsi cancel
      }).then(res => {
         setBook(prevState => {
            return [...new Set([...prevState, ...res.data.docs.map(item => item.title)])];
         })

         if(res.data.start === res.data.numFound || res.data.numFound <= 50 || res.data.start === 100) {
            setHasMore(false);
         }
      }).catch(err => {
         if(axios.isCancel(err)) {
            return;
         }
      })
      
      return() => {
         source.cancel('BATALKAN!!!'); // setiap component ini di render, berikan fungsi cancel
      }
      
   }, [query, page])
   
   return {book, hasMore};
}