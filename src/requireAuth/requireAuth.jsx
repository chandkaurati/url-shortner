import { useUserContext } from '@/context/userContext'
import React from 'react'
import { useNavigate } from 'react-router-dom'

const RequireAuth = ({children}) => {
const {user:session} = useUserContext()
const navigate = useNavigate()

 if(!session.session){
    navigate("/home")
 }

  return (
    <div>
    {children}
    </div>
  )
}

export default RequireAuth
