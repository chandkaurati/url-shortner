import { useState } from "react";


const useFetch = (callback, options) => {
  const [data, setData] = useState({});
  const [error, setError] = useState();
  const [loading, setLoading] = useState();

   async function fetchData() {
     setLoading(true)
      try {
        const responce = await callback(options)
        setData(responce)
        setData(responce?.session)
      } catch (error) {
        setError(error)
      }finally{
        setLoading(false)
      }
  }

  return {data, error, loading, fetchData}
};


export default useFetch