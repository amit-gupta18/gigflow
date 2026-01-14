import { Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import ProtectedRoute from "./components/ProtectedRoute";
import Landing from "./pages/Landing";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import CreateGig from "./pages/Creategig";
import ViewGig from "./pages/Viewgig";

import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { fetchMe } from "./redux/authSlice";

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchMe());
  }, [dispatch]);

  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        {/* Public Routes */}
        <Route index element={<Landing />} />
        <Route path="login" element={<Login />} />
        <Route path="register" element={<Register />} />

        {/* Protected Routes */}
        <Route element={<ProtectedRoute />}>
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="create-gig" element={<CreateGig />} />
          <Route path="gig/:id" element={<ViewGig />} />
        </Route>
      </Route>
    </Routes>
  );
}

export default App;
