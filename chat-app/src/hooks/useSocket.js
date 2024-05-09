import { useCallback, useEffect, useState } from "react";
import io from "socket.io-client";

// ----------------------------------------------------------------------

export const useSocket = (serverPath) => {
  const [socket, setSocket] = useState(null);
  const [online, setOnline] = useState(false);

  const connectSocket = useCallback(() => {
    const token = localStorage.getItem("token");

    const socketTmp = io.connect(serverPath, {
      transports: ["websocket"],
      autoConnect: true,
      forceNew: true,
      query: { "x-token": token },
    });

    setSocket(socketTmp);
  }, [serverPath]);

  const disconnectSocket = useCallback(() => {
    socket?.disconnect();
  }, [socket]);

  useEffect(() => {
    setOnline(socket?.connected);
  }, [socket]);

  useEffect(() => {
    socket?.on("connect", () => {
      setOnline(true);
    });

    // return socket.disconnect()
  }, [socket]);

  useEffect(() => {
    socket?.on("disconnect", () => {
      setOnline(false);
    });
  }, [socket]);

  return {
    socket,
    online,
    connectSocket,
    disconnectSocket,
  };
};
