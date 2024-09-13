import { useState } from 'react'
import {createBrowserRouter, RouterProvider} from "react-router-dom"
import AppLayout from './layout/app-layout'
import Home from './pages/home'
import Dashboard from './pages/dashboard'
import RequireAuth from './requireAuth/requireAuth'

const router = createBrowserRouter([
  {
    element : <AppLayout/>,
    children: [
      {
        path : "/",
        element: <Home/>
      },
      {
        path : "/dashboard",
        element: <Dashboard/>
      },
    ]
  }
])
function App() {

  return <RouterProvider router={router}/>
}

export default App
