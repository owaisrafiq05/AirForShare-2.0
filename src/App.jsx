import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Toaster } from 'sonner';
import { lazy, Suspense } from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import Loader from './components/Loader';

// Lazy load pages for better performance
const Home = lazy(() => import('./pages/Home'));
const PublicFiles = lazy(() => import('./pages/PublicFiles'));
const Rooms = lazy(() => import('./pages/Rooms'));
const RoomDetail = lazy(() => import('./pages/RoomDetail'));
const NotFound = lazy(() => import('./pages/NotFound'));

function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen flex flex-col bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100">
        <Header />
        <main className="flex-grow pt-20 md:pt-24">
          <Suspense fallback={<div className="flex items-center justify-center h-[70vh]"><Loader size="lg" /></div>}>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/public-files" element={<PublicFiles />} />
              <Route path="/rooms" element={<Rooms />} />
              <Route path="/room/:id" element={<RoomDetail />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </Suspense>
        </main>
        <Footer />
        <Toaster richColors position="top-right" />
      </div>
    </BrowserRouter>
  );
}

export default App;
