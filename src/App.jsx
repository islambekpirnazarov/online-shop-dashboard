import React from 'react'

import { Route, RouterProvider, createBrowserRouter, createRoutesFromElements } from 'react-router-dom'
import MainLayout from './layouts/MainLayout'
import Categories from './pages/Categories'
import Products from './pages/Products'
import CreateCategory from './pages/CreateCategory'
import CreateProduct from './pages/CreateProduct'

const App = () => {
  const router = createBrowserRouter(createRoutesFromElements(
    <Route path='/' element={<MainLayout/>}>
      <Route index element={<Categories/>}/>
      <Route path='products' element={<Products/>}/>
      <Route path='create-category' element={<CreateCategory/>}/>
      <Route path='create-product' element={<CreateProduct/>}/>
    </Route>
  ))
  return (
    <RouterProvider router={router}/>
  )
}

export default App