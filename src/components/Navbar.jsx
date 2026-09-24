import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { useBooking } from '../context/BookingContext';

function Navbar() {
  const { currentUser: user, logoutUser } = useBooking();
  const [menuOpen, setMenuOpen] = useState(false);

  function handleLogout() {
    logoutUser();
    setMenuOpen(false);
  }

  const initials = user?.name ? user.name.split(' ').map((part) => part[0]).slice(0, 2).join('').toUpperCase() : 'U';

  return (
    <nav className="navbar">
      <div className="logo">CONCERTLY</div>

      <div className="nav-links">
        <NavLink to="/" end>Home</NavLink>
        <NavLink to="/concerts">Concerts</NavLink>
        <NavLink to="/artists">Artists</NavLink>
        <NavLink to="/wishlist">Wishlist</NavLink>
        <NavLink to="/my-bookings">My Bookings</NavLink>

        {user ? (
          <div className="user-menu-wrap">
            <button type="button" className="user-menu-trigger" onClick={() => setMenuOpen((open) => !open)}>
              <span className="user-avatar">{initials}</span>
              <span>{user.name.split(' ')[0]}</span>
            </button>

            {menuOpen && (
              <div className="user-dropdown">
                <div className="user-dropdown-header">
                  <span className="user-avatar large">{initials}</span>
                  <div>
                    <strong>{user.name}</strong>
                    <small>{user.email}</small>
                  </div>
                </div>

                <div className="user-dropdown-body">
                  <div className="user-detail-row">
                    <span>Account</span>
                    <strong>Active</strong>
                  </div>
                  <div className="user-detail-row">
                    <span>Bookings</span>
                    <strong>Saved</strong>
                  </div>
                </div>

                <div className="user-dropdown-actions">
                  <NavLink to="/my-bookings" onClick={() => setMenuOpen(false)}>View bookings</NavLink>
                  <button type="button" onClick={handleLogout}>Sign out</button>
                </div>
              </div>
            )}
          </div>
        ) : (
          <NavLink to="/auth">Sign In</NavLink>
        )}
      </div>
    </nav>
  );
}

export default Navbar;