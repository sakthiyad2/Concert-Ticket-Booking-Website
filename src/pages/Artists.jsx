import artists from "../data/artists";
import ArtistCard from "../components/ArtistCard";

function Artist() {
  return (
    <main className="page">
      <div className="page-header">
        <p className="section-label">THE ARTISTS</p>

        <h1>Popular Artists</h1>

        <p>
          Discover artists and performers from the Tamil music scene.
        </p>
      </div>

      <div className="artist-grid large">
        {artists.map((artist) => (
          <ArtistCard
            key={artist.id}
            artist={artist}
          />
        ))}
      </div>
    </main>
  );
}

export default Artist;