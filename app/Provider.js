'use client';
import React from 'react'
import { AuthContextProvider } from './context/authContext'
const Provider = ({children}) => {
  
  return (
    <AuthContextProvider >
        {children}
    </AuthContextProvider>
  )
}

export default Provider