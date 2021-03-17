import React, { useEffect, useState } from "react";
import axios from 'axios';

export function useBookSearch(query, page){
   let source = new axios.CancelToken.source(); // setiap dirender ulang, data ini akan dari ulang

   useEffect(() => {
      axios({
         method : 'GET',
         url : 'http://openlibrary.org/search.json',
         params : {q : query, page : page},
         cancelToken : source.token // ini token yang berisi fungsi cancel
      }).then(res => {
         console.log(res.data);
      }).catch(err => {
         console.log(err);
         if(axios.isCancel(err)) {
            return;
         }
      })
      
      return() => {
         source.cancel('BATALKAN!!!'); // setiap component ini di render, berikan fungsi cancel
      }
      
   }, [query, page])

   
   return null;
}