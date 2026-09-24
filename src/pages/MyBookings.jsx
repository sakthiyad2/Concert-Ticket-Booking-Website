import { Link } from "react-router-dom";
import { useBooking } from "../context/BookingContext";

function MyBookings() {
  const { bookings, currentUser } = useBooking();

  const userName = currentUser?.name || 'Guest';

  return (
    <main className="page">
      <div className="page-header">
        <p className="section-label">YOUR TICKETS</p>
        <h1>{userName}'s Bookings</h1>
      </div>

      {bookings.length === 0 ? (
        <div className="empty-bookings">
          <h2>No bookings yet</h2>
          <p>{userName}, explore concerts and book your first experience.</p>

          <Link to="/concerts" className="primary-btn">
            Explore Concerts
          </Link>
        </div>
      ) : (
        <div className="bookings-list">
          {bookings.map((booking) => (
            <div className="booking-card" key={booking.id}>
              <div>
                <p className="section-label">{booking.artist}</p>

                <h2>{booking.concert}</h2>

                <p>{booking.date}</p>
                <p>{booking.location}</p>

                <p>
                  Seats: <strong>{booking.seats.join(", ")}</strong>
                </p>
              </div>

              <div className="booking-price">
                <p>Booking ID</p>
                <strong>CON{booking.id}</strong>

                <h3>₹{booking.total}</h3>
              </div>
            </div>
          ))}
        </div>
      )}
    </main>
  );
}

export default MyBookings;