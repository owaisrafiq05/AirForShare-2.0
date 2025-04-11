# AirForShare 2.0

AirForShare 2.0 is a modern file sharing platform with both public file sharing and peer-to-peer capabilities. This application allows users to:

- Upload and share files publicly with anyone
- Create private rooms for direct peer-to-peer file sharing
- Chat with other users in real-time within rooms
- Share files securely with cloud storage integration

## Features

- **Public File Sharing**: Upload files to cloud storage that can be accessed by anyone
- **P2P File Sharing**: Create private rooms to share files directly with specific users
- **Real-time Chat**: Communicate with other users in sharing rooms
- **Responsive Design**: Works on desktop and mobile devices
- **Secure File Transfers**: All file transfers are encrypted and secure
- **Modern UI**: Clean and intuitive user interface with dark mode support

## Technologies Used

- **Frontend**:
  - React.js
  - Tailwind CSS for styling
  - Socket.io-client for real-time communication
  - Simple-peer for WebRTC peer-to-peer connections
  - React Router for navigation
  - Axios for API requests
  - React Dropzone for file uploads
  - Sonner for toast notifications

- **Backend**:
  - Node.js
  - Express
  - Socket.io for WebSocket connections
  - MongoDB for storing file metadata
  - Cloudinary for cloud file storage
  - WebRTC for peer-to-peer communication

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn
- MongoDB (for backend)
- Cloudinary account (for backend)

### Installation

1. Clone the repository
```bash
git clone https://github.com/yourusername/airforshare-2.0.git
cd airforshare-2.0
```

2. Install dependencies
```bash
npm install
```

3. Create a `.env` file in the backend directory with your Cloudinary and MongoDB credentials:
```
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
MONGODB_URI=your_mongodb_uri
```

4. Start the development server
```bash
npm run dev
```

5. Open your browser and navigate to `http://localhost:5173`

## Project Structure

```
/src
  /assets       # Static assets
  /components   # Reusable UI components
  /context      # React context for state management
  /hooks        # Custom React hooks
  /pages        # Page components
  /services     # API services
  /utils        # Utility functions
```

## Usage

### Public File Sharing

1. Navigate to the Public Files page
2. Use the file upload component to upload a file
3. The file will be stored in Cloudinary and will be available for 1 hour
4. Share the file link with others

### P2P File Sharing

1. Navigate to the Rooms page
2. Create a new room or join an existing one
3. Share the room link with others
4. Upload files in the room to share them privately with room members
5. Chat with other users in the room

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgements

- [Socket.io](https://socket.io/) for real-time communication
- [Cloudinary](https://cloudinary.com/) for file storage
- [React](https://reactjs.org/) for the frontend framework
- [Tailwind CSS](https://tailwindcss.com/) for styling
- [Simple-peer](https://github.com/feross/simple-peer) for WebRTC peers
