import { Routes, Route } from "react-router-dom";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import AddApplication from "./pages/AddApplication";
import Applications from "./pages/Applications";
import ApplicationDetails from "./pages/ApplicationDetails";
import LandingPage from "./pages/LandingPage";

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/register" element={<Register />} />
      <Route path="/login" element={<Login />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/applications/new" element={<AddApplication />} />
      <Route path="/applications" element={<Applications />} />
      <Route path="/applications/:id" element={<ApplicationDetails />} />
    </Routes>
  );
};

export default App;
