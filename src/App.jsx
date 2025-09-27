import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import NavBar from './components/NavBar';
import Protected from './components/Protected';

import BrowseBooks from './pages/BrowseBooks';
import Login from './pages/Login';
import Signup from './pages/Signup';
import PostBook from './pages/PostBook';
import MyListings from './pages/MyListings';
import MyTransactions from './pages/MyTransactions';
import BookDetail from './pages/BookDetail';

export default function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <NavBar />
        <Routes>
          <Route path="/" element={<BrowseBooks />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/post" element={<Protected><PostBook /></Protected>} />
          <Route path="/mine" element={<Protected><MyListings /></Protected>} />
          <Route path="/transactions" element={<Protected><MyTransactions /></Protected>} />
          <Route path="/books/:id" element={<Protected><BookDetail /></Protected>} />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}
