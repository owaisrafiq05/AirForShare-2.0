import { Link, useLocation } from 'react-router-dom';
import { FaCloudUploadAlt, FaUsers, FaHome } from 'react-icons/fa';
import { useState, useEffect } from 'react';

const Header = () => {
  const location = useLocation();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  
  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 10;
      if (isScrolled !== scrolled) {
        setScrolled(isScrolled);
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [scrolled]);
  
  // Close mobile menu when route changes
  useEffect(() => {
    setMenuOpen(false);
  }, [location.pathname]);
  
  const isActive = (path) => {
    return location.pathname === path;
  };
  
  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-50 bg-gradient-to-r from-blue-600 to-indigo-700 text-white transition-all duration-300 ${
        scrolled ? 'py-2 shadow-lg' : 'py-4'
      }`}
    >
      <div className="container mx-auto px-4 flex justify-between items-center">
        <Link 
          to="/" 
          className="text-2xl font-bold flex items-center gap-2 hover:opacity-90 transition-opacity group"
        >
          <div className={`p-2 rounded-full bg-white/10 group-hover:bg-white/20 transition-all duration-300 ${scrolled ? 'scale-90' : ''}`}>
            <FaCloudUploadAlt className="text-2xl text-white" />
          </div>
          <span className="animate-gradient-text font-extrabold">AirForShare 2.0</span>
        </Link>
        
        {/* Mobile menu button */}
        <button 
          className="md:hidden flex items-center p-2" 
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          <div className="w-6 flex flex-col items-end gap-1.5">
            <span className={`block h-0.5 bg-white transition-all duration-300 ${menuOpen ? 'w-6 transform rotate-45 translate-y-2' : 'w-6'}`}></span>
            <span className={`block h-0.5 bg-white transition-all duration-300 ${menuOpen ? 'opacity-0' : 'w-4'}`}></span>
            <span className={`block h-0.5 bg-white transition-all duration-300 ${menuOpen ? 'w-6 transform -rotate-45 -translate-y-2' : 'w-5'}`}></span>
          </div>
        </button>
        
        {/* Desktop navigation */}
        <nav className="hidden md:flex items-center space-x-2">
          <NavItem to="/" icon={<FaHome />} text="Home" isActive={isActive('/')} />
          <NavItem to="/public-files" icon={<FaCloudUploadAlt />} text="Public Files" isActive={isActive('/public-files')} />
          <NavItem to="/rooms" icon={<FaUsers />} text="Rooms" isActive={isActive('/rooms')} />
        </nav>
      </div>
      
      {/* Mobile menu */}
      <div 
        className={`md:hidden overflow-hidden transition-all duration-300 ease-in-out ${
          menuOpen ? 'max-h-60 opacity-100 py-4' : 'max-h-0 opacity-0'
        }`}
      >
        <div className="container mx-auto px-4 space-y-2">
          <MobileNavItem to="/" icon={<FaHome />} text="Home" isActive={isActive('/')} />
          <MobileNavItem to="/public-files" icon={<FaCloudUploadAlt />} text="Public Files" isActive={isActive('/public-files')} />
          <MobileNavItem to="/rooms" icon={<FaUsers />} text="Rooms" isActive={isActive('/rooms')} />
        </div>
      </div>
    </header>
  );
};

const NavItem = ({ to, icon, text, isActive }) => (
  <Link 
    to={to} 
    className={`flex items-center gap-2 py-2 px-4 rounded-full transition duration-300 ${
      isActive 
        ? 'bg-white/20 text-white font-medium' 
        : 'hover:bg-white/10 text-white/90 hover:text-white'
    }`}
  >
    <span className="text-lg">{icon}</span>
    <span>{text}</span>
  </Link>
);

const MobileNavItem = ({ to, icon, text, isActive }) => (
  <Link 
    to={to} 
    className={`flex items-center gap-3 py-3 px-4 rounded-lg transition-colors ${
      isActive 
        ? 'bg-white/20 text-white font-medium' 
        : 'text-white/90 hover:text-white'
    }`}
  >
    <span className="text-xl">{icon}</span>
    <span className="font-medium">{text}</span>
  </Link>
);

export default Header; 