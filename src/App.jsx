import { Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

import Home from "./pages/Home";
import Concerts from "./pages/Concerts";
import ConcertDetails from "./pages/ConcertDetails";
import Booking from "./pages/Booking";
import MyBookings from "./pages/MyBookings";
import Artists from "./pages/Artists";
import Wishlist from "./pages/Wishlist";
import AuthPage from "./pages/Auth";
import NotFound from "./pages/NotFound";

function App() {
  return (
    <>
      <Navbar />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/concerts" element={<Concerts />} />
        <Route path="/concert/:id" element={<ConcertDetails />} />
        <Route path="/booking/:id" element={<Booking />} />
        <Route path="/artists" element={<Artists />} />
        <Route path="/wishlist" element={<Wishlist />} />
        <Route path="/my-bookings" element={<MyBookings />} />
        <Route path="/auth" element={<AuthPage />} />
        <Route path="*" element={<NotFound />} />
      </Routes>

      <Footer />
    </>
  );
}

export default App;