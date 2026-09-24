import { createContext, useContext, useEffect, useMemo, useState } from "react";

const BookingContext = createContext();
const BOOKINGS_KEY = "concertly-bookings";
const WISHLIST_KEY = "concertly-wishlist";
const USER_KEY = "concertly-user";
const ACCOUNTS_KEY = "concertly-accounts";

function readStorage(key, fallback) {
  if (typeof window === "undefined") return fallback;

  try {
    const stored = window.localStorage.getItem(key);
    return stored ? JSON.parse(stored) : fallback;
  } catch (error) {
    return fallback;
  }
}

function getLoggedInUser() {
  return readStorage(USER_KEY, null);
}

export function BookingProvider({ children }) {
  const [bookings, setBookings] = useState(() => readStorage(BOOKINGS_KEY, []));
  const [wishlist, setWishlist] = useState(() => readStorage(WISHLIST_KEY, []));
  const [currentUser, setCurrentUser] = useState(() => getLoggedInUser());
  const [selectedSeats, setSelectedSeats] = useState([]);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      window.localStorage.setItem(BOOKINGS_KEY, JSON.stringify(bookings));
    }
  }, [bookings]);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      window.localStorage.setItem(WISHLIST_KEY, JSON.stringify(wishlist));
    }
  }, [wishlist]);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const syncUser = () => setCurrentUser(getLoggedInUser());

    syncUser();
    window.addEventListener('storage', syncUser);

    return () => window.removeEventListener('storage', syncUser);
  }, []);

  function loginUser(user) {
    if (typeof window !== 'undefined') {
      const accounts = readStorage(ACCOUNTS_KEY, []);
      const nextAccounts = accounts.filter((account) => account.email !== user.email);
      nextAccounts.push(user);
      window.localStorage.setItem(ACCOUNTS_KEY, JSON.stringify(nextAccounts));
      window.localStorage.setItem(USER_KEY, JSON.stringify(user));
    }
    setCurrentUser(user);
  }

  function logoutUser() {
    if (typeof window !== 'undefined') {
      window.localStorage.removeItem(USER_KEY);
    }
    setCurrentUser(null);
  }

  function requireAuthenticatedUser() {
    const activeUser = getLoggedInUser();

    if (!activeUser?.email) {
      alert('Please sign in or create an account before booking tickets or saving concerts.');
      return null;
    }

    return activeUser;
  }

  function toggleSeat(seat) {
    setSelectedSeats((current) => {
      if (current.includes(seat)) {
        return current.filter((item) => item !== seat);
      }

      return [...current, seat];
    });
  }

  function toggleWishlist(concertId) {
    const activeUser = requireAuthenticatedUser();

    if (!activeUser) {
      return false;
    }

    setWishlist((current) =>
      current.includes(concertId)
        ? current.filter((id) => id !== concertId)
        : [...current, concertId]
    );

    return true;
  }

  function confirmBooking(concert) {
    const activeUser = requireAuthenticatedUser();

    if (!activeUser) {
      return null;
    }

    const newBooking = {
      id: Date.now(),
      userEmail: activeUser.email,
      userName: activeUser.name || 'Registered User',
      concertId: concert.id,
      concert: concert.title,
      artist: concert.artist,
      date: concert.date,
      location: concert.location,
      venue: concert.venue || concert.location,
      seats: [...selectedSeats],
      total: selectedSeats.length * concert.price,
      tickets: selectedSeats.length,
      createdAt: new Date().toISOString()
    };

    setBookings((current) => [newBooking, ...current]);
    setSelectedSeats([]);

    return newBooking;
  }

  const visibleBookings = useMemo(() => {
    if (!currentUser?.email) return [];
    return bookings.filter((booking) => booking.userEmail === currentUser.email);
  }, [bookings, currentUser]);

  const value = useMemo(
    () => ({
      bookings: visibleBookings,
      wishlist,
      selectedSeats,
      currentUser,
      loginUser,
      logoutUser,
      toggleSeat,
      toggleWishlist,
      confirmBooking
    }),
    [visibleBookings, wishlist, selectedSeats, currentUser]
  );

  return (
    <BookingContext.Provider value={value}>{children}</BookingContext.Provider>
  );
}

export function useBooking() {
  return useContext(BookingContext);
}