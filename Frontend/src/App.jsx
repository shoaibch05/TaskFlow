import Dashboard from "./components/Dashboard";
import People from "./components/People";
import { Login } from "./components/Login";
import { SignUp } from "./components/SignUp";
import { Route, Routes, Navigate } from "react-router-dom";
import { SearchProvider } from "./context/searchContext";
import ProtectedLayout from "./components/ProtectedLayout"; // <- NEW

function App() {
  return (
    <SearchProvider>
      <Routes>
        {/* Public Routes */}
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />

        {/* Protected Routes */}
        <Route element={<ProtectedLayout />}>
          <Route path="/" element={<Navigate to="/dashboard" replace />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/people" element={<People />} />
        </Route>
      </Routes>
    </SearchProvider>
  );
}

export default App;
