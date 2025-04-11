import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Toaster } from 'sonner';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import PublicFiles from './pages/PublicFiles';
import Rooms from './pages/Rooms';
import RoomDetail from './pages/RoomDetail';
import NotFound from './pages/NotFound';

function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen flex flex-col bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100">
        <Header />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/public-files" element={<PublicFiles />} />
            <Route path="/rooms" element={<Rooms />} />
            <Route path="/room/:id" element={<RoomDetail />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </main>
        <Footer />
        <Toaster richColors position="top-right" />
      </div>
    </BrowserRouter>
  );
}

export default App;
