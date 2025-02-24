import { useState } from 'react'
import './App.css'
import Stub from './components/Stub'
import { BrowserRouter, Route, Routes} from 'react-router';
import ReactDOM from 'react-dom/client';
import AdminReview from './AdminReview';
import Navigation from './Navigation';


function App() {

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Navigation />}>
            <Route index element={<p>Home</p>} />
            <Route path='/AdminReview' element={<AdminReview />} />
          </Route>
        </Routes>
      </BrowserRouter>

      <p>Success</p>
    </>
  )
}

export default App