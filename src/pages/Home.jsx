import { Link } from 'react-router-dom';
import { FaCloudUploadAlt, FaUsers, FaArrowRight } from 'react-icons/fa';

const Feature = ({ icon, title, description }) => (
  <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md border border-gray-200 dark:border-gray-700 hover:shadow-lg transition-shadow duration-300">
    <div className="flex justify-center mb-4">
      <div className="p-3 bg-blue-100 dark:bg-blue-900/50 rounded-lg">
        {icon}
      </div>
    </div>
    <h3 className="text-xl font-bold mb-2 text-center">{title}</h3>
    <p className="text-gray-600 dark:text-gray-400 text-center">{description}</p>
  </div>
);

const Home = () => {
  return (
    <div className="container mx-auto px-4 py-10">
      {/* Hero Section */}
      <div className="text-center mb-16">
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 bg-gradient-to-r from-blue-600 to-indigo-600 inline-block text-transparent bg-clip-text">
          Welcome to AirForShare 2.0
        </h1>
        <p className="text-xl md:text-2xl text-gray-700 dark:text-gray-300 max-w-3xl mx-auto mb-8">
          The modern solution for simple, secure file sharing with peer-to-peer capabilities
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link 
            to="/public-files" 
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium flex items-center justify-center gap-2"
          >
            <FaCloudUploadAlt className="text-xl" />
            <span>Public File Sharing</span>
            <FaArrowRight className="ml-1" />
          </Link>
          <Link 
            to="/rooms" 
            className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3 rounded-lg font-medium flex items-center justify-center gap-2"
          >
            <FaUsers className="text-xl" />
            <span>P2P File Sharing</span>
            <FaArrowRight className="ml-1" />
          </Link>
        </div>
      </div>
      
      {/* Features Section */}
      <div className="mb-16">
        <h2 className="text-3xl font-bold text-center mb-10">Key Features</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <Feature 
            icon={<FaCloudUploadAlt className="text-blue-600 dark:text-blue-400 text-4xl" />}
            title="Public File Sharing"
            description="Upload files to our secure cloud storage and share them publicly with anyone, anywhere."
          />
          <Feature 
            icon={<FaUsers className="text-blue-600 dark:text-blue-400 text-4xl" />}
            title="P2P File Sharing"
            description="Share files directly with specific users through a secure peer-to-peer connection."
          />
          <Feature 
            icon={
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-10 h-10 text-blue-600 dark:text-blue-400">
                <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 1 0-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 0 0 2.25-2.25v-6.75a2.25 2.25 0 0 0-2.25-2.25H6.75a2.25 2.25 0 0 0-2.25 2.25v6.75a2.25 2.25 0 0 0 2.25 2.25Z" />
              </svg>
            }
            title="Secure Transfers"
            description="All file transfers are encrypted and secure, ensuring your data stays private and protected."
          />
        </div>
      </div>
      
      {/* How It Works Section */}
      <div className="mb-16">
        <h2 className="text-3xl font-bold text-center mb-10">How It Works</h2>
        <div className="max-w-3xl mx-auto">
          <div className="space-y-8">
            <div className="flex items-start gap-6">
              <div className="flex-shrink-0 w-12 h-12 flex items-center justify-center rounded-full bg-blue-100 dark:bg-blue-900/50 text-blue-600 font-bold text-xl">1</div>
              <div>
                <h3 className="text-xl font-bold mb-2">Choose Your Sharing Method</h3>
                <p className="text-gray-600 dark:text-gray-400">
                  Select between public file sharing (accessible to anyone) or P2P file sharing (private, direct transfers).
                </p>
              </div>
            </div>
            <div className="flex items-start gap-6">
              <div className="flex-shrink-0 w-12 h-12 flex items-center justify-center rounded-full bg-blue-100 dark:bg-blue-900/50 text-blue-600 font-bold text-xl">2</div>
              <div>
                <h3 className="text-xl font-bold mb-2">Upload & Share</h3>
                <p className="text-gray-600 dark:text-gray-400">
                  Upload your files using our simple drag-and-drop interface and share them instantly.
                </p>
              </div>
            </div>
            <div className="flex items-start gap-6">
              <div className="flex-shrink-0 w-12 h-12 flex items-center justify-center rounded-full bg-blue-100 dark:bg-blue-900/50 text-blue-600 font-bold text-xl">3</div>
              <div>
                <h3 className="text-xl font-bold mb-2">Download & Enjoy</h3>
                <p className="text-gray-600 dark:text-gray-400">
                  Recipients can download the files from the shared link or directly in their P2P room.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* CTA Section */}
      <div className="text-center">
        <h2 className="text-3xl font-bold mb-6">Ready to start sharing?</h2>
        <Link 
          to="/public-files" 
          className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-lg font-medium text-lg inline-block"
        >
          Get Started Now
        </Link>
      </div>
    </div>
  );
};

export default Home; 