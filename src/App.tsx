import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AuthProvider } from '@/hooks/useAuth';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import ScrollToTop from '@/components/ScrollToTop';
import Home from '@/pages/Home';
import About from '@/pages/About';
import Academics from '@/pages/Academics';
import Admissions from '@/pages/Admissions';
import SchoolLife from '@/pages/SchoolLife';
import GalleryPage from '@/pages/GalleryPage';
import News from '@/pages/News';
import Contact from '@/pages/Contact';
import AdminLogin from '@/pages/AdminLogin';
import Admin from '@/pages/Admin';

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <ScrollToTop />
        <Routes>
          {/* Admin routes (no public chrome) */}
          <Route path="/admin/login" element={<AdminLogin />} />
          <Route path="/admin" element={<Admin />} />

          {/* Public site routes */}
          <Route
            path="*"
            element={
              <div className="flex min-h-screen flex-col bg-cream-50">
                <Navbar />
                <main className="flex-1">
                  <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/about" element={<About />} />
                    <Route path="/academics" element={<Academics />} />
                    <Route path="/admissions" element={<Admissions />} />
                    <Route path="/school-life" element={<SchoolLife />} />
                    <Route path="/gallery" element={<GalleryPage />} />
                    <Route path="/news" element={<News />} />
                    <Route path="/news/:id" element={<News />} />
                    <Route path="/contact" element={<Contact />} />
                    <Route path="*" element={<Home />} />
                  </Routes>
                </main>
                <Footer />
              </div>
            }
          />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}
