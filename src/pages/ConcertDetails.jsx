import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useBooking } from '../context/BookingContext';
import concerts from '../data/concerts';

function getTimeLeft(targetDate) {
  const distance = new Date(targetDate).getTime() - new Date().getTime();

  if (distance <= 0) {
    return { days: 0, hours: 0, minutes: 0, seconds: 0 };
  }

  return {
    days: Math.floor(distance / (1000 * 60 * 60 * 24)),
    hours: Math.floor((distance / (1000 * 60 * 60)) % 24),
    minutes: Math.floor((distance / (1000 * 60)) % 60),
    seconds: Math.floor((distance / 1000) % 60)
  };
}

function ConcertDetails() {
  const { id } = useParams();
  const { currentUser, wishlist, toggleWishlist } = useBooking();
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });

  const concert = concerts.find((item) => item.id === Number(id));

  useEffect(() => {
    if (!concert) return;

    const eventDate = concert.date;
    const update = () => setTimeLeft(getTimeLeft(eventDate));

    update();
    const timer = setInterval(update, 1000);

    return () => clearInterval(timer);
  }, [concert]);

  if (!concert) {
    return (
      <main className="page">
        <h1>Concert Not Found</h1>
      </main>
    );
  }

  const saved = wishlist.includes(concert.id);

  return (
    <main className="details-page">
      <div className="details-shell">
        <div className="details-image">
          <img src={concert.image} alt={concert.title} />
        </div>

        <div className="details-content">
          <p className="section-label">{concert.artist}</p>

          <h1>{concert.title}</h1>

          <div className="event-info">
            <p>
              <strong>Date</strong>
              {concert.date}
            </p>

            <p>
              <strong>Location</strong>
              {concert.location}
            </p>

            <p>
              <strong>Starting From</strong>
              ₹{concert.price}
            </p>
          </div>

          <div className="countdown-box">
            <div className="count-item">
              <span>{timeLeft.days}</span>
              <small>Days</small>
            </div>
            <div className="count-item">
              <span>{timeLeft.hours}</span>
              <small>Hours</small>
            </div>
            <div className="count-item">
              <span>{timeLeft.minutes}</span>
              <small>Minutes</small>
            </div>
          </div>

          <div className="about-event">
            <h2>About the Concert</h2>
            <p>{concert.description}</p>
          </div>

          <div className="details-actions">
            <Link to={currentUser ? `/booking/${concert.id}` : '/auth'} className="primary-btn">
              {currentUser ? 'Book Tickets' : 'Sign in to Book'}
            </Link>
            <button
              type="button"
              className={`wishlist-btn ${saved ? 'saved' : ''}`}
              onClick={() => {
                if (!currentUser) {
                  alert('Please sign in or create an account to save concerts to your wishlist.');
                  return;
                }

                toggleWishlist(concert.id);
              }}
              disabled={!currentUser}
              aria-pressed={saved}
              aria-label={saved ? `Remove ${concert.title} from wishlist` : `Add ${concert.title} to wishlist`}
            >
              {currentUser ? (saved ? '♥ Added to Wishlist' : '♡ Add to Wishlist') : '🔒 Sign in to save'}
            </button>
          </div>
        </div>
      </div>
    </main>
  );
}

export default ConcertDetails;