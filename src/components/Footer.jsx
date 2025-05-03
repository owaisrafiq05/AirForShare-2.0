import { useRef } from "react";
import { Link } from "react-router-dom";
import { Github, Linkedin } from "lucide-react";
import logo from '../assets/logo.png';

const FooterComponent = () => {
  const footerRef = useRef(null);

  return (
    <footer ref={footerRef} className="bg-gradient-to-b from-gray-900 to-black text-white">
      {/* Main Footer Content */}
      <div className="container mx-auto px-6 pt-16 pb-8 ">
        <div className="flex flex-wrap justify-between px-6 ">
          {/* Company Info */}
          <div className="flex flex-col space-y-4">
          <a href="/" className="flex items-center ">
              <img
                src={logo}
                alt="AirForShare Logo"
                className="rounded-full h-25 w-25 object-cover border-2 border-teal-400"
              />
            </a>
            <p className="text-gray-300 text-sm leading-relaxed max-w-md">
              A modern web-based application focused on simple and secure file sharing. 
              It provides both public file sharing and peer-to-peer capabilities for more private transfers.
            </p>
          </div>

          {/* Navigation Links */}
          <div className="flex flex-col space-y-4">
            <h3 className="text-xl font-bold text-white relative pb-2 after:content-[''] after:absolute after:left-0 after:bottom-0 after:h-1 after:w-12 after:bg-[#abd373]">
              Useful Links
            </h3>
            <ul className="space-y-3">
              <li>
                <Link
                  to="/"
                  className="text-gray-300 hover:text-[#abd373] transition-all duration-300 flex items-center group"
                >
                  <span className="w-2 h-2 bg-[#abd373] rounded-full mr-3 transition-all duration-300 group-hover:w-3"></span>
                  Home
                </Link>
              </li>
              <li>
                <Link
                  to="/public-files"
                  className="text-gray-300 hover:text-[#abd373] transition-all duration-300 flex items-center group"
                >
                  <span className="w-2 h-2 bg-[#abd373] rounded-full mr-3 transition-all duration-300 group-hover:w-3"></span>
                  Public Files
                </Link>
              </li>
              <li>
                <Link
                  to="/rooms"
                  className="text-gray-300 hover:text-[#abd373] transition-all duration-300 flex items-center group"
                >
                  <span className="w-2 h-2 bg-[#abd373] rounded-full mr-3 transition-all duration-300 group-hover:w-3"></span>
                  P2P Rooms
                </Link>
              </li>
            </ul>
          </div>

          {/* Developers Section */}
          <div className="flex flex-col space-y-4">
            <h3 className="text-xl font-bold text-white relative pb-2 after:content-[''] after:absolute after:left-0 after:bottom-0 after:h-1 after:w-12 after:bg-[#abd373]">
              Developers
            </h3>
            <div className="space-y-3">
              <a
                href="https://www.linkedin.com/in/abubakar-hassan-0554bb2ab/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-300 hover:text-[#abd373] transition-all duration-300 flex items-center group"
              >
                <Linkedin className="mr-3 h-5 w-5 text-gray-400 group-hover:text-[#abd373] transition-colors duration-300" />
                <span>Abubakar Bin Hassan</span>
              </a>
              <a
                href="https://www.linkedin.com/in/owais-rafiq-639494253/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-300 hover:text-[#abd373] transition-all duration-300 flex items-center group"
              >
                <Linkedin className="mr-3 h-5 w-5 text-gray-400 group-hover:text-[#abd373] transition-colors duration-300" />
                <span>Owais Rafiq</span>
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Footer Bottom / Copyright */}
      <div className="border-t border-gray-800">
        <div className="container mx-auto px-6 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-sm text-gray-400">
              &copy; {new Date().getFullYear()} AirForShare 2.0. All Rights Reserved.
            </p>
            <div className="flex space-x-4 mt-4 md:mt-0">
              <a
                href="https://github.com/airforshare"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-[#abd373] transition-all duration-300 p-2 rounded-full hover:bg-gray-800"
              >
                <Github className="h-5 w-5" />
                <span className="sr-only">GitHub</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default FooterComponent;