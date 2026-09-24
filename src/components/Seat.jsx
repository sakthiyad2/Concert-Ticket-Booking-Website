import { useBooking } from "../context/BookingContext";

function Seat({ number, booked = false }) {
  const { selectedSeats, toggleSeat } = useBooking();

  const selected = selectedSeats.includes(number);

  return (
    <button
      className={`seat ${selected ? "selected" : ""} ${booked ? "booked" : ""}`}
      onClick={() => !booked && toggleSeat(number)}
      disabled={booked}
      title={booked ? "Booked seat" : selected ? "Selected seat" : "Available seat"}
    >
      {number}
    </button>
  );
}

export default Seat;