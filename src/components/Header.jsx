import { Link, useLocation } from 'react-router-dom';
import { FaCloudUploadAlt, FaUsers, FaHome, FaBars, FaTimes } from 'react-icons/fa';
import { useState, useEffect, useRef } from 'react';
import logo from '../assets/logo.png'; // Import the logo (ensure you have this in assets)

const Header = () => {
  const location = useLocation();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef(null);
  
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
  
  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target) && menuOpen) {
        setMenuOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [menuOpen]);
  
  const isActive = (path) => {
    return location.pathname === path;
  };
  
  return (
    <>
      <header 
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled || menuOpen ? 'bg-gray-900/90 backdrop-blur-md py-2 shadow-lg' : 'bg-transparent py-4'
        }`}
      >
        <div className="container mx-auto px-6 flex justify-between items-center">
          <Link 
            to="/" 
            className="flex items-center gap-2 hover:opacity-90 transition-opacity"
          >
            <div className="w-10 h-10 rounded-full overflow-hidden bg-white/10 p-1">
              {logo ? (
                <img src={logo} alt="AirForShare Logo" className="w-full h-full object-contain" />
              ) : (
                <FaCloudUploadAlt className="text-3xl text-[#abd373] w-full h-full" />
              )}
            </div>
            <span className="font-extrabold text-white text-xl md:text-2xl">AirForShare <span className="text-[#abd373]">2.0</span></span>
          </Link>
          
          {/* Desktop navigation */}
          <nav className="hidden md:flex items-center space-x-1">
            <NavItem to="/" icon={<FaHome />} text="Home" isActive={isActive('/')} />
            <NavItem to="/public-files" icon={<FaCloudUploadAlt />} text="Public Files" isActive={isActive('/public-files')} />
            <NavItem to="/rooms" icon={<FaUsers />} text="Rooms" isActive={isActive('/rooms')} />
          </nav>
          
          {/* Mobile menu button */}
          <button 
            className="md:hidden p-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors duration-300" 
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
          >
            {menuOpen ? (
              <FaTimes className="text-xl text-white" />
            ) : (
              <FaBars className="text-xl text-white" />
            )}
          </button>
        </div>
      </header>
      
      {/* Mobile menu overlay */}
      <div 
        className={`fixed inset-0 z-40 bg-black/80 backdrop-blur-md transition-opacity duration-300 flex items-center justify-center ${
          menuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
      >
        <div 
          ref={menuRef}
          className="w-4/5 max-w-md bg-gray-800/90 backdrop-blur-md rounded-2xl p-8 transform transition-transform duration-300 shadow-xl border border-gray-700/50"
          style={{ 
            transform: menuOpen ? 'translateY(0)' : 'translateY(-20px)'
          }}
        >
          <div className="flex justify-between items-center mb-8">
            <span className="text-xl text-white font-bold">Menu</span>
            <button 
              onClick={() => setMenuOpen(false)}
              className="p-2 rounded-full bg-gray-700/50 hover:bg-gray-600/50 transition-colors"
            >
              <FaTimes className="text-white" />
            </button>
          </div>
          
          <nav className="flex flex-col space-y-4">
            <MobileNavItem to="/" icon={<FaHome />} text="Home" isActive={isActive('/')} />
            <MobileNavItem to="/public-files" icon={<FaCloudUploadAlt />} text="Public Files" isActive={isActive('/public-files')} />
            <MobileNavItem to="/rooms" icon={<FaUsers />} text="Rooms" isActive={isActive('/rooms')} />
          </nav>
        </div>
      </div>
    </>
  );
};

const NavItem = ({ to, icon, text, isActive }) => (
  <Link 
    to={to} 
    className={`group px-5 py-2 rounded-lg flex items-center gap-2 relative after:absolute after:h-full after:bg-[#abd373] z-20 overflow-hidden after:-z-10 after:w-full after:inset-0 after:rounded-lg transition-all duration-300 hover:transition-all hover:duration-300 after:transition-all after:duration-500 after:hover:transition-all after:hover:duration-500 overflow-hidden cursor-pointer after:-translate-y-full after:hover:translate-y-0 ${
      isActive ? 'bg-[#abd373]/20 text-white' : 'text-white/90'
    }`}
  >
    <span className="text-lg group-hover:text-gray-800 transition-colors duration-300">{icon}</span>
    <span className="font-medium group-hover:text-gray-800 transition-colors duration-300">{text}</span>
  </Link>
);

const MobileNavItem = ({ to, icon, text, isActive }) => (
  <Link 
    to={to} 
    className={`group px-5 py-4 rounded-lg flex items-center gap-3 relative after:absolute after:h-full after:bg-[#abd373] z-20 overflow-hidden after:-z-10 after:w-full after:inset-0 after:rounded-lg transition-all duration-300 hover:transition-all hover:duration-300 after:transition-all after:duration-500 after:hover:transition-all after:hover:duration-500 overflow-hidden cursor-pointer after:-translate-y-full after:hover:translate-y-0 ${
      isActive ? 'bg-[#abd373]/20 text-white' : 'text-white/80'
    }`}
  >
    <span className="text-xl group-hover:text-gray-800 transition-colors duration-300">{icon}</span>
    <span className="font-medium text-lg group-hover:text-gray-800 transition-colors duration-300">{text}</span>
  </Link>
);

export default Header; 