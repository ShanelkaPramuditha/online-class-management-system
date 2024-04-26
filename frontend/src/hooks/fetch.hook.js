import axios from 'axios';
import ENV from '../config';
import { useEffect, useState } from 'react';
import { getUsername } from '../api/helper';

axios.defaults.baseURL = ENV.BACKEND_URL;

export default function useFetch(query) {
   const [getData, setData] = useState({
      isLoading: false,
      apiData: undefined,
      status: null,
      serverError: null
   });

   useEffect(() => {
      const fetchData = async () => {
         try {
            setData(prev => ({ ...prev, isLoading: true }));

            const { email } = !query ? await getUsername() : '';

            const { data, status } = !query
               ? await axios.get(`/api/user/${email}`)
               : await axios.get(`/api${query}`);

            if (status === 201) {
               setData(prev => ({ ...prev, isLoading: false }));
               setData(prev => ({ ...prev, apiData: data, status: status }));
            }

            setData(prev => ({ ...prev, isLoading: false }));
         } catch (error) {
            setData(prev => ({
               ...prev,
               isLoading: false,
               serverError: error
            }));
         }
      };
      fetchData();
   }, [query]);

   return [getData, setData];
}
