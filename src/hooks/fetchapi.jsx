import { useState } from "react";


function useFetch(callback, options = {}) {
  const [data, setData] = useState({});
  const [error, seterror] = useState();
  const [loding, setloding] = useState();

  const fn = async (...args)=>{
     try {
      setloding(true)
      const responce = await callback(options, ...args )
      setData(responce)
     } catch (error) {
      seterror(error)
     }finally{
      setloding(false)
     }
  }

  return {data, error, loding, fn}
}

export default useFetch
