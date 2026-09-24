import { Link } from "react-router-dom";
import concerts from "../data/concerts";
import artists from "../data/artists";
import ConcertCard from "../components/ConcertCard";
import ArtistCard from "../components/ArtistCard";

function Home() {
  return (
    <main>
      <section className="hero">
        <div className="hero-content">
          <p className="hero-small">LIVE MUSIC • LIVE MOMENTS</p>

          <h1>
            EXPERIENCE
            <br />
            LIVE MUSIC
          </h1>

          <p>
            Discover unforgettable concerts and book your
            tickets for the artists you love.
          </p>

          <Link to="/concerts" className="primary-btn">
            Explore Concerts
          </Link>
        </div>
      </section>

      <section className="section">
        <div className="section-heading">
          <div>
            <p className="section-label">DON'T MISS OUT</p>
            <h2>Upcoming Concerts</h2>
          </div>

          <Link to="/concerts">View All</Link>
        </div>

        <div className="concert-grid">
          {concerts.map((concert) => (
            <ConcertCard key={concert.id} concert={concert} />
          ))}
        </div>
      </section>

      <section className="section artists-section">
        <div className="section-heading">
          <div>
            <p className="section-label">THE VOICES YOU LOVE</p>
            <h2>Popular Artists</h2>
          </div>

          <Link to="/artists">View All</Link>
        </div>

        <div className="artist-grid">
          {artists.slice(0, 6).map((artist) => (
            <ArtistCard key={artist.id} artist={artist} />
          ))}
        </div>
      </section>
    </main>
  );
}

export default Home;