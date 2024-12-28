import React from 'react'
import Home from '../Screen/Home'
import MainLayout from './MainLayout'

const HomePage = ({children}) => {
  return (
 
    <>
    <MainLayout>
     <Home />
    </MainLayout>
   </>
  )
}

export default HomePage;