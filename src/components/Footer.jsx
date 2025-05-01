import { useRef } from "react"
import { Link } from "react-router-dom"
import { Github, Linkedin } from "lucide-react"
import logo from '../assets/logo.png' // Make sure the path is correct

const FooterComponent = () => {
  const footerRef = useRef(null)

  return (
    <div>
      <footer ref={footerRef} className="bg-gray-900 bg-opacity-90 shadow-lg shadow-black py-12 rounded-t-[60px]">
        <div className="container mx-auto flex flex-wrap justify-between px-6">
          {/* First Column: Logo with Description */}
          <div className="w-full md:w-1/3 p-6 flex flex-col items-center md:items-start">
            <Link to="/" className="flex items-center justify-center">
              <img
                src={logo}
                alt="AirForShare Logo"
                width={180}
                height={60}
                className="h-12 w-auto object-contain"
              />
            </Link>
            <p className="text-gray-300 mt-4 text-center md:text-left text-sm leading-relaxed">
              A modern web-based application focused on simple and secure file sharing. It provides both public file
              sharing and peer-to-peer capabilities for more private transfers.
            </p>
          </div>

          {/* Second Column: Links */}
          <div className="w-full md:w-1/4 p-6">
            <h3 className="text-xl font-semibold text-white mb-4 text-center md:text-left">Useful Links</h3>
            <div className="mt-2">
              <ul className="space-y-3">
                <li>
                  <Link
                    to="/"
                    className="text-gray-300 hover:text-[#abd373] transition-colors duration-200 transform hover:translate-x-1 flex items-center justify-center md:justify-start"
                  >
                    <span className="w-1.5 h-1.5 bg-[#abd373] rounded-full mr-2"></span>
                    Home
                  </Link>
                </li>
                <li>
                  <Link
                    to="/public-files"
                    className="text-gray-300 hover:text-[#abd373] transition-colors duration-200 transform hover:translate-x-1 flex items-center justify-center md:justify-start"
                  >
                    <span className="w-1.5 h-1.5 bg-[#abd373] rounded-full mr-2"></span>
                    Public Files
                  </Link>
                </li>
                <li>
                  <Link
                    to="/rooms"
                    className="text-gray-300 hover:text-[#abd373] transition-colors duration-200 transform hover:translate-x-1 flex items-center justify-center md:justify-start"
                  >
                    <span className="w-1.5 h-1.5 bg-[#abd373] rounded-full mr-2"></span>
                    P2P Rooms
                  </Link>
                </li>
              </ul>
            </div>
          </div>

          {/* Third Column: Developer Information */}
          <div className="w-full md:w-1/4 p-6">
            <h3 className="text-xl font-semibold text-white mb-4 text-center md:text-left">Developers</h3>
            <div className="mt-2 flex flex-col items-center md:items-start">
              <a
                href="https://www.linkedin.com/in/abubakar-hassan-0554bb2ab/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-300 hover:text-[#abd373] transition-colors duration-200 flex items-center mb-3 group"
              >
                <Linkedin className="mr-2 h-5 w-5 group-hover:text-[#abd373]" />
                <span>Abubakar Bin Hassan</span>
              </a>
              <a
                href="https://www.linkedin.com/in/owais-rafiq-639494253/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-300 hover:text-[#abd373] transition-colors duration-200 flex items-center group"
              >
                <Linkedin className="mr-2 h-5 w-5 group-hover:text-[#abd373]" />
                <span>Owais Rafiq</span>
              </a>
            </div>
          </div>
        </div>

        {/* Horizontal Line */}
        <div className="container mx-auto px-6">
          <div className="border-t border-gray-700 my-8"></div>

          {/* Footer Text */}
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-sm text-gray-400">
              &copy; {new Date().getFullYear()} AirForShare 2.0. All Rights Reserved.
            </p>
            <div className="flex space-x-4 mt-4 md:mt-0">
              <a
                href="https://github.com/airforshare"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-[#abd373] transition-colors"
              >
                <Github className="h-5 w-5" />
                <span className="sr-only">GitHub</span>
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default FooterComponent
