'use client';

import React, { createContext, useContext, useState } from 'react';

const SocketContext = createContext();

export const SocketProvider = ({ children }) => {
  const [isConnected] = useState(true);

  return (
    <SocketContext.Provider value={{ socket: null, isConnected }}>
      {children}
    </SocketContext.Provider>
  );
};

export const useSocket = () => useContext(SocketContext);
