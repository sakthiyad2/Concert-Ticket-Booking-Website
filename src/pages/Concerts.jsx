import { useMemo, useState } from "react";
import concerts from "../data/concerts";
import ConcertCard from "../components/ConcertCard";

const maxTicketPrice = Math.max(...concerts.map((concert) => concert.price));

function Concerts() {
  const [search, setSearch] = useState("");
  const [location, setLocation] = useState("All");
  const [sortBy, setSortBy] = useState("featured");
  const [maxPrice, setMaxPrice] = useState(maxTicketPrice);

  const filteredConcerts = useMemo(() => {
    const normalizedSearch = search.trim().toLowerCase();

    const matches = concerts.filter((concert) => {
      const matchesSearch =
        !normalizedSearch ||
        concert.title.toLowerCase().includes(normalizedSearch) ||
        concert.artist.toLowerCase().includes(normalizedSearch) ||
        concert.location.toLowerCase().includes(normalizedSearch);

      const matchesLocation = location === "All" || concert.location === location;
      const matchesPrice = concert.price <= maxPrice;

      return matchesSearch && matchesLocation && matchesPrice;
    });

    const sorted = [...matches];

    switch (sortBy) {
      case "price-low":
        sorted.sort((a, b) => a.price - b.price);
        break;
      case "price-high":
        sorted.sort((a, b) => b.price - a.price);
        break;
      case "date-asc":
        sorted.sort((a, b) => new Date(a.date) - new Date(b.date));
        break;
      default:
        sorted.sort((a, b) => a.id - b.id);
        break;
    }

    return sorted;
  }, [location, maxPrice, search, sortBy]);

  const locations = ["All", ...new Set(concerts.map((concert) => concert.location))];

  return (
    <main className="page">
      <div className="page-header">
        <p className="section-label">FIND YOUR NEXT EXPERIENCE</p>
        <h1>Upcoming Concerts</h1>
        <p>Explore live concerts from your favourite artists.</p>
      </div>

      <div className="filters-panel">
        <div className="filters">
          <input
            type="text"
            placeholder="Search concerts, artists or city..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />

          <select value={location} onChange={(e) => setLocation(e.target.value)}>
            {locations.map((city) => (
              <option key={city} value={city}>
                {city === "All" ? "All Locations" : city}
              </option>
            ))}
          </select>

          <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
            <option value="featured">Featured</option>
            <option value="price-low">Price: Low to High</option>
            <option value="price-high">Price: High to Low</option>
            <option value="date-asc">Date: Soonest</option>
          </select>
        </div>

        <div className="price-filter">
          <label htmlFor="priceRange">Max ticket price: ₹{maxPrice}</label>
          <input
            id="priceRange"
            type="range"
            min="500"
            max={maxTicketPrice}
            step="50"
            value={maxPrice}
            onChange={(e) => setMaxPrice(Number(e.target.value))}
          />
        </div>

        <div className="results-bar">
          <span>{filteredConcerts.length} concerts found</span>
          <span>{location === "All" ? "All cities" : location}</span>
        </div>
      </div>

      <div className="concert-grid">
        {filteredConcerts.length > 0 ? (
          filteredConcerts.map((concert) => (
            <ConcertCard key={concert.id} concert={concert} />
          ))
        ) : (
          <p className="no-results">No concerts match your filters. Try changing your search or price range.</p>
        )}
      </div>
    </main>
  );
}

export default Concerts;