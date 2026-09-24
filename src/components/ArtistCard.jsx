function ArtistCard({ artist }) {
  return (
    <div className="artist-card">
      <img src={artist.image} alt={artist.name} />

      <div className="artist-content">
        <h3>{artist.name}</h3>
        <p>{artist.category}</p>
      </div>
    </div>
  );
}

export default ArtistCard;