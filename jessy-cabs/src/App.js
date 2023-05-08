import React from 'react';
import Login from './component/form/LoginForm';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Dashboard from './component/Dashboard';

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route exact path='/login' element={<Login/>}  />
          <Route exact path='/' element={<Dashboard/>}  />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
