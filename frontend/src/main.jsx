import Header from './components/Header';
import { createRoot } from 'react-dom/client';
import './index.css';
import FeedsList from './pages/FeedsList';
import FeedDetails from './pages/FeedDetails';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

// Définition des routes
createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <Header />
    <Routes>
      <Route path="/" element={<Navigate to="/feeds" replace />} />
      <Route path="/feeds" element={<FeedsList />} />
      <Route path="/feeds/:id" element={<FeedDetails />} />
    </Routes>
  </BrowserRouter>
);
