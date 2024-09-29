import databaseService from '@/db/database-service'
import React, { useCallback, useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useParams} from 'react-router-dom'

const Link = () => {
  const [loading, setLoading] = useState()
  const user = useSelector((state)=> state.auth.userData)
  const  {id} = useParams()

   const getUrlStats =  useCallback(async (params) =>{
    setLoading(true)
       try {
       const data =    await databaseService.getUrl({id , user_id: user?.user.id})
       const stats =   await databaseService.getClicksForUrl(id)
        console.log(data)
        console.log(stats)

       } catch (error) {
         console.log(error)
       }
  }, [])
  useEffect(()=>{
   getUrlStats()
  })
  return (
    <div>
       lilnk page
    </div>
  )
}

export default Link
