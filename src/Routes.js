import React from 'react';
import { Routes, Route } from 'react-router-dom';
import  RouteHandler  from './components/RouteHandler';
import Home from './pages/Home';
import About from './pages/About';
import NotFound from './pages/NotFound';
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';
import AdPage from './pages/AdPage';
import AddAd from './pages/AddAd';
import Ads from './pages/Ads';

export default () => {
  return (
    <Routes>
      <Route path='/' element={<Home />} />
      <Route path='/about' element={<About />} />
      <Route path='/signin' element={<SignIn />} />
      <Route path='/signup' element={<SignUp />} />
      <Route path='/post-an-ad' element={
        <RouteHandler private>
          <AddAd />
        </RouteHandler>} />
      <Route path='/ad/:id' element={<AdPage />} />
      <Route path='/ads' element={<Ads />} />
      <Route path='*' element={<NotFound />} />
    </Routes>
  );
}