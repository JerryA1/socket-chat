import React, { useContext, useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
// pages
import ChatPage from "../pages/ChatPage";
// routes
import AuthRouter from "./AuthRouter";
import PublicRoute from "./PublicRoute";
import PrivateRoute from "./PrivateRoute";
// context
import { AuthContext } from "../auth/AuthContext";

// ----------------------------------------------------------------------

const AppRouter = () => {
  const { auth, verifyToken } = useContext(AuthContext);

  useEffect(() => {
    verifyToken();
  }, [verifyToken]);

  if (auth.checking) {
    return <h1>Wait a moment please...</h1>;
  }

  return (
    <Router>
      <div>
        <Routes>
          {/* <Route path="/auth/*" element={<AuthRouter />} /> */}
          <Route
            path="/auth/*"
            element={
              <PublicRoute>
                <AuthRouter />
              </PublicRoute>
            }
          />
          {/* <Route path="/" element={<ChatPage />} /> */}
          <Route
            path="/"
            element={
              <PrivateRoute>
                <ChatPage />
              </PrivateRoute>
            }
          />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </div>
    </Router>
  );
};

export default AppRouter;
