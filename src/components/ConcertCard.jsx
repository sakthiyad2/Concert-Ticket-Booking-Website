import { Link } from 'react-router-dom';
import { useBooking } from '../context/BookingContext';

function ConcertCard({ concert }) {
  const { wishlist, toggleWishlist } = useBooking();
  const isSaved = wishlist.includes(concert.id);

  return (
    <article className="concert-card">
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

        <button
          type="button"
          className={`wishlist-btn ${isSaved ? 'saved' : ''}`}
          onClick={() => toggleWishlist(concert.id)}
          aria-pressed={isSaved}
          aria-label={isSaved ? `Remove ${concert.title} from wishlist` : `Add ${concert.title} to wishlist`}
        >
          {isSaved ? '♥ Added to Wishlist' : '♡ Add to Wishlist'}
        </button>
      </div>
    </article>
  );
}

export default ConcertCard;