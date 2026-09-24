import { useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import Seat from '../components/Seat';
import { useBooking } from '../context/BookingContext';
import concerts from '../data/concerts';

const bookedSeats = ['A2', 'A5', 'B3', 'C4', 'D2'];

function PaymentQr() {
  return (
    <img
      src={`${import.meta.env.BASE_URL}images/payment.jpeg`}
      alt="UPI QR code payment"
      className="qr-code"
    />
  );
}

function Booking() {
  const { id } = useParams();
  const { currentUser, selectedSeats, confirmBooking } = useBooking();
  const [confirmed, setConfirmed] = useState(false);
  const [ticket, setTicket] = useState(null);

  const concert = concerts.find((item) => item.id === Number(id));

  if (!concert) {
    return (
      <main className="page">
        <h1>Concert Not Found</h1>
      </main>
    );
  }

  if (!currentUser) {
    return (
      <main className="page">
        <div className="empty-bookings">
          <h2>Login required</h2>
          <p>You must create an account or sign in before booking tickets.</p>
          <Link to="/auth" className="primary-btn">Go to Sign In</Link>
        </div>
      </main>
    );
  }

  function handleBooking() {
    if (selectedSeats.length === 0) {
      alert('Please select at least one seat.');
      return;
    }

    const booking = confirmBooking(concert);

    if (!booking) {
      return;
    }

    setTicket({ ...booking, venue: concert.venue || concert.location });
    setConfirmed(true);
  }

  const total = selectedSeats.length * concert.price;

  if (confirmed && ticket) {
    const handleDownload = () => {
      const text = `CONCERTLY\nDIGITAL TICKET\n\n${concert.title}\n${concert.date}\n${concert.venue || concert.location}\n\nSeats: ${ticket.seats.join(' • ')}\nBooking ID: CON${ticket.id}\nTotal: ₹${ticket.total}`;
      const blob = new Blob([text], { type: 'text/plain' });
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `ticket-${ticket.id}.txt`;
      link.click();
      URL.revokeObjectURL(url);
    };

    return (
      <main className="confirmation">
        <div className="confirmation-box ticket-box">
          <div className="ticket-header">
            <span>CONCERTLY</span>
            <strong>Digital Ticket</strong>
          </div>

          <h2>{concert.title}</h2>
          <p>{concert.date}</p>
          <p>{concert.venue || concert.location}</p>

          <div className="ticket-meta">
            <div>
              <small>Seats</small>
              <strong>{ticket.seats.join(' • ')}</strong>
            </div>
            <div>
              <small>Booking ID</small>
              <strong>CON{ticket.id}</strong>
            </div>
          </div>

          <div className="ticket-total">
            <span>Total</span>
            <strong>₹{ticket.total}</strong>
          </div>

          <button type="button" className="primary-btn" onClick={handleDownload}>Download Ticket</button>
          <Link to="/my-bookings" className="secondary-link">View My Bookings</Link>
        </div>
      </main>
    );
  }

  return (
    <main className="booking-page">
      <div className="booking-header">
        <p className="section-label">{concert.artist}</p>
        <h1>Select Your Seats</h1>
        <p>{concert.title} • {concert.date}</p>
      </div>

      <div className="booking-layout">
        <div className="seat-section">
          <div className="stage">STAGE</div>

          <div className="seat-area">
            <div className="seat-row">
              {['A1', 'A2', 'A3', 'A4', 'A5', 'A6'].map((seat) => (
                <Seat key={seat} number={seat} booked={bookedSeats.includes(seat)} />
              ))}
            </div>

            <div className="seat-row">
              {['B1', 'B2', 'B3', 'B4', 'B5', 'B6'].map((seat) => (
                <Seat key={seat} number={seat} booked={bookedSeats.includes(seat)} />
              ))}
            </div>

            <div className="seat-row">
              {['C1', 'C2', 'C3', 'C4', 'C5', 'C6'].map((seat) => (
                <Seat key={seat} number={seat} booked={bookedSeats.includes(seat)} />
              ))}
            </div>

            <div className="seat-row">
              {['D1', 'D2', 'D3', 'D4', 'D5', 'D6'].map((seat) => (
                <Seat key={seat} number={seat} booked={bookedSeats.includes(seat)} />
              ))}
            </div>
          </div>

          <div className="seat-legend">
            <span><i className="available"></i> Available</span>
            <span><i className="occupied"></i> Booked</span>
            <span><i className="selected-seat"></i> Selected</span>
          </div>
        </div>

        <div className="booking-summary">
          <h2>Booking Summary</h2>

          <p>{concert.title}</p>
          <p>{concert.location}</p>
          <p>{concert.date}</p>

          <hr />

          <p>Selected Seats: {selectedSeats.length > 0 ? selectedSeats.join(', ') : 'None'}</p>

          <div className="total">
            <span>Total</span>
            <strong>₹{total}</strong>
          </div>

          <div className="payment-card">
            <div className="payment-header">
              <span>Secure Payment</span>
              <strong>UPI QR</strong>
            </div>

            <div className="payment-body">
              <div className="qr-box">
                <PaymentQr />
              </div>

              <div className="payment-details">
                <p>Scan this QR code to pay</p>
                <strong>concertly@upi</strong>
                <small>Amount: ₹{selectedSeats.length > 0 ? total : 0}</small>
              </div>
            </div>
          </div>

          <button type="button" className="primary-btn full-btn" onClick={handleBooking}>Confirm Booking</button>
        </div>
      </div>
    </main>
  );
}

export default Booking;