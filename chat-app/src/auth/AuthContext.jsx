import React, { createContext, useCallback, useContext, useState } from "react";
// helpers
import { fetchWithoutToken, fetchWithToken } from "../helpers/fetch";
// context
import { ChatContext } from "../context/chat/ChatContext";
// types
import { types } from "../types/types";

// ----------------------------------------------------------------------

export const AuthContext = createContext();

const initialState = {
  uid: null,
  checking: true,
  logged: false,
  name: null,
  email: null,
};

export const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState(initialState);
  const { dispatch } = useContext(ChatContext);

  const login = async (email, password) => {
    const resp = await fetchWithoutToken("login", { email, password }, "POST");

    if (resp.status === "success") {
      localStorage.setItem("token", resp.meta.token);

      const { user } = resp.meta;
      setAuth({
        uid: user.uid,
        checking: false,
        logged: true,
        name: user.name,
        email: user.email,
      });

      console.log("authenticated!");
    }

    return resp.status;
  };

  const register = async (name, email, password) => {
    const resp = await fetchWithoutToken(
      "login/new",
      { name, email, password },
      "POST"
    );

    if (resp.status === "success") {
      localStorage.setItem("token", resp.meta.token);

      const { user } = resp.meta;
      setAuth({
        uid: user.uid,
        checking: false,
        logged: true,
        name: user.name,
        email: user.email,
      });

      console.log("authenticated!");

      return resp.status;
    }

    return resp.message;
  };

  const verifyToken = useCallback(async () => {
    const token = localStorage.getItem("token");

    if (!token) {
      setAuth({
        uid: null,
        checking: false,
        logged: false,
        name: null,
        email: null,
      });

      return false;
    }

    const resp = await fetchWithToken("login/renew");
    if (resp.status === "success") {
      localStorage.setItem("token", resp.meta.token);

      const { user } = resp.meta;
      setAuth({
        uid: user.uid,
        checking: false,
        logged: true,
        name: user.name,
        email: user.email,
      });

      console.log("authenticated!");

      return true;
    } else {
      setAuth({
        uid: null,
        checking: false,
        logged: false,
        name: null,
        email: null,
      });

      return false;
    }
  }, []);

  const logout = () => {
    localStorage.removeItem("token");

    dispatch({ type: types.closeSession });

    setAuth({
      checking: false,
      logged: false,
    });
  };

  return (
    <AuthContext.Provider
      value={{
        auth,
        login,
        register,
        verifyToken,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
