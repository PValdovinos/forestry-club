import { useState } from 'react'
import './App.css'
import Stub from './components/Stub'
import { BrowserRouter, Route, Routes } from 'react-router';
import ReactDOM from 'react-dom/client';
import AdminReview from './AdminReview';
import AdminMemberView from './AdminMemberView';
import Navigation from './Navigation';

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

function App() {

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Navigation />}>
            <Route index element={<p>Home</p>} />
            <Route path='/adminReview' element={<AdminReview />} />
            <Route path='/adminReview/:member' element={<AdminMemberView />} />
          </Route>
        </Routes>
      </BrowserRouter>

      <p>Success</p>
      <Container>
        <Row>
          <Col>
            <BrowserRouter>
              <Routes>
                <Route path='/' element={<Navigation />}>
                  <Route index element={<App />} />
                  <Route path='/AdminReview' element={<AdminReview />} />
                </Route>
              </Routes>
            </BrowserRouter>
          </Col>
        </Row>
        <Row>
          <Col>
            <AdminReview />
          </Col>
        </Row>
      </Container>
    </>
  )
}

export default App