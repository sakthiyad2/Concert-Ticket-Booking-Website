import { Link } from 'react-router-dom';
import { useBooking } from '../context/BookingContext';
import concerts from '../data/concerts';

function Wishlist() {
  const { currentUser, wishlist } = useBooking();

  const savedConcerts = concerts.filter((concert) => wishlist.includes(concert.id));

  if (!currentUser) {
    return (
      <main className="page">
        <div className="empty-bookings">
          <h2>Login required</h2>
          <p>Create an account or sign in to save concerts to your wishlist.</p>
          <Link to="/auth" className="primary-btn">Go to Sign In</Link>
        </div>
      </main>
    );
  }

  return (
    <main className="page">
      <div className="page-header">
        <p className="section-label">FAVOURITES</p>
        <h1>Wishlist</h1>
      </div>

      {savedConcerts.length === 0 ? (
        <div className="empty-bookings">
          <h2>No saved concerts yet</h2>
          <p>Tap the heart on any event to save it for later.</p>
          <Link to="/concerts" className="primary-btn">Explore Concerts</Link>
        </div>
      ) : (
        <div className="concert-grid">
          {savedConcerts.map((concert) => (
            <article className="concert-card" key={concert.id}>
              <img src={concert.image} alt={concert.title} />
              <div className="concert-content">
                <p className="artist-name">{concert.artist}</p>
                <h3>{concert.title}</h3>
                <p>{concert.date}</p>
                <p>{concert.location}</p>
                <div className="card-bottom">
                  <strong>₹{concert.price}</strong>
                  <Link to={`/concert/${concert.id}`}>View details</Link>
                </div>
              </div>
            </article>
          ))}
        </div>
      )}
    </main>
  );
}

export default Wishlist;
