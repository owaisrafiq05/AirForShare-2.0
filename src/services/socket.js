import { io } from 'socket.io-client';
import { toast } from 'sonner';

let socket = null;
const SOCKET_URL = 'http://localhost:3000';

// Events to handle
const eventHandlers = {
  roomInfo: [],
  userJoined: [],
  message: [],
  newFile: [],
  userLeft: [],
  p2pSignal: [],
  roomJoinError: [],
  roomInvitation: [],
  inviteError: []
};

// Initialize socket connection
const initSocket = () => {
  if (socket) return socket;
  
  socket = io(SOCKET_URL);
  
  socket.on('connect', () => {
    console.log('Connected to socket server');
  });
  
  socket.on('disconnect', (reason) => {
    console.log('Disconnected from socket server:', reason);
    
    if (reason === 'io server disconnect') {
      // The server has forcefully disconnected the socket
      socket.connect();
    }
  });
  
  socket.on('connect_error', (error) => {
    console.error('Socket connection error:', error);
    toast.error('Failed to connect to server. Please try again later.');
  });
  
  // Set up event listeners
  Object.keys(eventHandlers).forEach(event => {
    socket.on(event, (data) => {
      console.log(`Socket event: ${event}`, data);
      
      // Display toast messages for certain events
      if (event === 'roomJoinError' || event === 'inviteError') {
        toast.error(data.message);
      } else if (event === 'roomInfo') {
        toast.success(`Joined room: ${data.roomId}`);
      } else if (event === 'userJoined') {
        toast.info(`${data.user.username} joined the room`);
      } else if (event === 'userLeft') {
        toast.info(`${data.username} left the room`);
      } else if (event === 'roomInvitation') {
        toast.info(`You've been invited to a room by ${data.from.username}`);
      }
      
      // Call all handlers for this event
      eventHandlers[event].forEach(handler => handler(data));
    });
  });
  
  return socket;
};

// Add an event handler
const on = (event, handler) => {
  if (!eventHandlers[event]) {
    console.warn(`Unknown socket event: ${event}`);
    return;
  }
  
  eventHandlers[event].push(handler);
};

// Remove an event handler
const off = (event, handler) => {
  if (!eventHandlers[event]) {
    console.warn(`Unknown socket event: ${event}`);
    return;
  }
  
  eventHandlers[event] = eventHandlers[event].filter(h => h !== handler);
};

// Join a room
const joinRoom = (params) => {
  if (!socket) {
    initSocket();
  }
  
  socket.emit('joinRoom', params);
};

// Send a message to a room
const sendMessage = (roomId, message) => {
  socket.emit('sendMessage', { roomId, message });
};

// Share file info with a room
const shareFileInfo = (roomId, fileInfo) => {
  socket.emit('fileInfo', { roomId, fileInfo });
};

// Send a WebRTC signal to another peer
const sendSignal = (to, signal, from) => {
  socket.emit('p2pSignal', { to, signal, from });
};

// Invite a user to a room
const inviteToRoom = (roomId, targetSocketId) => {
  socket.emit('inviteToRoom', { roomId, targetSocketId });
};

// Get socket ID
const getSocketId = () => {
  if (!socket) {
    initSocket();
  }
  
  return socket.id;
};

// Disconnect socket
const disconnect = () => {
  if (socket) {
    socket.disconnect();
    socket = null;
    
    // Clear all event handlers
    Object.keys(eventHandlers).forEach(event => {
      eventHandlers[event] = [];
    });
  }
};

export {
  initSocket,
  on,
  off,
  joinRoom,
  sendMessage,
  shareFileInfo,
  sendSignal,
  inviteToRoom,
  getSocketId,
  disconnect
}; 