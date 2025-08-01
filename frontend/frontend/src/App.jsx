import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { useState } from "react";
import Home from "./pages/Home";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Login from "./auth/Login";
import Signup from "./auth/Signup";
import Prices from "./pages/Prices";
import FilesDashboard from "./pages/FilesDashboard";
import FilePreview from "./components/FilePreview";
import EmptyFilesState from "./components/EmptyFilesState";
import { AuthProvider } from "./auth/AuthProvider";
import PrivateRoute from "./auth/PrivateRoute";
import ConfirmEmail from './pages/ConfirmEmail';

function AppContent() {
  const location = useLocation();
  const hideLayout = ["/login", "/signup", "/confirm"].includes(location.pathname);

  return (
    <>
      {!hideLayout && <Navbar />}

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/confirm" element={<ConfirmEmail />} />
        <Route path="/pricing" element={<Prices />} />
        <Route
          path="/dashboard"
          element={
            <PrivateRoute>
              <FilesDashboard />
            </PrivateRoute>
          }
        />
      </Routes>

      {!hideLayout && <Footer />}
    </>
  );
}

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <AppContent />
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
