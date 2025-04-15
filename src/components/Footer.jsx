import React, { useRef } from 'react';
import { Link } from 'react-router-dom';
import { FaGithub, FaLinkedin } from 'react-icons/fa';

const FooterComponent = () => {
  const footerRef = useRef(null);

  return (
    <div>
      <footer
        ref={footerRef}
        className="bg-gray-900 bg-opacity-50 shadow-lg shadow-black sm:pl-20 py-12 rounded-t-[100px]"
      >
        <div className="flex flex-wrap justify-between px-6">
          {/* First Column: Logo with Description */}
          <div className="w-full sm:w-1/4 p-6 flex flex-col items-center">
            <Link to="/" className="flex items-center justify-center">
              <span className="self-center text-4xl font-semibold sm:text-2xl whitespace-nowrap text-white">
                AirForShare
              </span>
            </Link>
            <p className='text-white mt-4 text-center sm:text-left'>
              A modern web-based application focused on simple and secure file sharing. It provides both public file sharing and peer-to-peer capabilities for more private transfers.
            </p>
          </div>

          {/* Second Column: Links */}
          <div className="w-full sm:w-1/4 p-6">
            <h3 className="text-2xl font-semibold text-gray-100">Useful Links</h3>
            <div className="mt-4">
              <ul className="space-y-4">
                <li>
                  <Link
                    to="/"
                    className="text-gray-300 hover:text-[#abd373] transition-colors duration-200 transform hover:scale-105"
                  >
                    Home
                  </Link>
                </li>
                <li>
                  <Link
                    to="/public-files"
                    className="text-gray-300 hover:text-[#abd373] transition-colors duration-200 transform hover:scale-105"
                  >
                    Public Files
                  </Link>
                </li>
                <li>
                  <Link
                    to="/rooms"
                    className="text-gray-300 hover:text-[#abd373] transition-colors duration-200 transform hover:scale-105"
                  >
                    P2P Rooms
                  </Link>
                </li>
              </ul>
            </div>
          </div>

          {/* Third Column: Developer Information */}
          <div className="w-full sm:w-1/4 p-6">
            <h3 className="text-2xl font-semibold text-gray-100">Developers</h3>
            <div className="mt-4">
              <p className="text-gray-300 mt-4">
                <a
                  href="https://www.linkedin.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-[#abd373] transition-colors duration-200 flex items-center"
                >
                  <FaLinkedin className="mr-2" />
                  Developer 1 (ID)
                </a>
              </p>
              <p className="text-gray-300 mt-4">
                <a
                  href="https://www.linkedin.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-[#abd373] transition-colors duration-200 flex items-center"
                >
                  <FaLinkedin className="mr-2" />
                  Developer 2 (ID)
                </a>
              </p>
              <p className="text-gray-300 mt-4">
                <a
                  href="https://www.linkedin.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-[#abd373] transition-colors duration-200 flex items-center"
                >
                  <FaLinkedin className="mr-2" />
                  Developer 3 (ID)
                </a>
              </p>
            </div>
          </div>
        </div>

        {/* Horizontal Line */}
        <div className="border-t border-gray-600 h-0.5 ml-5 mt-8 mb-3 mr-5"></div>
        
        {/* Footer Text */}
        <h2 className="text-sm text-center text-gray-400">
          &copy; {new Date().getFullYear()} AirForShare 2.0. All Rights Reserved.
        </h2>
      </footer>
    </div>
  );
};

export default FooterComponent; 