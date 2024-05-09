import { createContext, useContext, useEffect } from "react";
import { useSocket } from "../hooks/useSocket";
// context
import { AuthContext } from "../auth/AuthContext";
import { ChatContext } from "./chat/ChatContext";
// types
import { types } from "../types/types";
// helpers
import { scroll2BottomAnimate } from "../helpers/Scroll2Bottom";

// ----------------------------------------------------------------------

export const SocketContext = createContext();

// ----------------------------------------------------------------------

export const SocketProvider = ({ children }) => {
  const { socket, online, connectSocket, disconnectSocket } = useSocket(
    "http://localhost:8080/"
  );
  const { auth } = useContext(AuthContext);
  const { dispatch } = useContext(ChatContext);

  useEffect(() => {
    if (auth.logged) {
      connectSocket();
    }
  }, [auth, connectSocket]);

  useEffect(() => {
    if (!auth.logged) {
      disconnectSocket();
    }
  }, [auth, disconnectSocket]);

  useEffect(() => {
    socket?.on("user-list", (users) => {
      dispatch({
        type: types.usersLoaded,
        payload: users,
      });
    });
  }, [socket, dispatch]);

  useEffect(() => {
    socket?.on("send-message", (message) => {
      dispatch({
        type: types.newMessage,
        payload: message,
      });

      scroll2BottomAnimate("messages");
    });
  }, [socket, dispatch]);

  return (
    <SocketContext.Provider value={{ socket, online }}>
      {children}
    </SocketContext.Provider>
  );
};
