import { Route, Routes } from 'react-router';
import HomePage from './components/HomePage';
import ProductDetail from './Screen/ProductDetail';
import Search from './components/Search';


function App() {


  return (
    <div className='bg-slate-400'>
      <Routes>
       <Route index   path="/" element={<HomePage />} />
       <Route path="/product/:id" element={<ProductDetail />} />
       <Route path="/search" element={<Search />} />
       </Routes>
    </div>
  )
}

export default App
