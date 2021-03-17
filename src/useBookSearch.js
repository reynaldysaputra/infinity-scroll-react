import React, { useEffect, useState } from "react";
import axios from 'axios';

export function useBookSearch(query, page){
   const [index, setIndex] = useState(1);
   const [data, setData] = useState(null);
   const source = axios.CancelToken.source();

   useEffect(() => {
      axios({
         method : 'GET',
         url : 'http://openlibrary.org/search.json',
         params : {q : query, page : page},
         cancelToken : source.token
      }).then(res => {
         setData(res.data);
      }).catch(err => {
         console.log(err);
         if(axios.isCancel(err)) {
            return;
         }
      })
      
      setIndex(i => i + 1);
      console.log(index);

      if(index >= 5) source.cancel('Kouta terpenuhi!!!');
      
   }, [query, page])

   
   return null;
}