import { BrowserRouter, Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

import Home from "./pages/Home";
import Cars from "./pages/Cars";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Login from "./pages/Login";
import CarDetails from "./pages/CarDetails";
import Reservation from "./pages/Reservation";
import AdminCars from "./pages/AdminCars";
import AdminDashboard from "./pages/AdminDashboard";
import ClientDashboard from "./pages/ClientDashboard";

import "./App.css";

function App() {
  return (
    <BrowserRouter>
      <Navbar />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/cars" element={<Cars />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/login" element={<Login />} />
<Route path="/admin/dashboard" element={<AdminDashboard />} />
        <Route path="/cars/:id" element={<CarDetails />} />
        <Route path="/reservation" element={<Reservation />} />

        {/* Administration */}
        <Route path="/admin/cars" element={<AdminCars />} />
        <Route
  path="/client/dashboard"
  element={<ClientDashboard />}
/>
      </Routes>

      <Footer />
    </BrowserRouter>
  );
}

export default App;