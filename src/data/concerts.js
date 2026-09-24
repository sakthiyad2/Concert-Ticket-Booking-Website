const concerts = [
  {
    id: 1,
    title: 'A.R. Rahman Live in Chennai',
    artist: 'A.R. Rahman',
    date: '25 October 2026',
    location: 'Chennai',
    venue: 'YMCA Grounds',
    price: 999,
    image: `${import.meta.env.BASE_URL}images/concerts/concert1.jpg`,
    description: 'Experience an unforgettable evening of music with A.R. Rahman and his live orchestra.'
  },
  {
    id: 2,
    title: 'Anirudh Live',
    artist: 'Anirudh Ravichander',
    date: '8 November 2026',
    location: 'Bengaluru',
    venue: 'Palace Grounds',
    price: 1499,
    image: `${import.meta.env.BASE_URL}images/concerts/concert2.jpg`,
    description: "Get ready for an energetic night featuring Anirudh's biggest chart-topping hits."
  },
  {
    id: 3,
    title: 'Harris Jayaraj Musical Night',
    artist: 'Harris Jayaraj',
    date: '21 November 2026',
    location: 'Chennai',
    venue: 'Island Grounds',
    price: 799,
    image: `${import.meta.env.BASE_URL}images/concerts/concert3.jpg`,
    description: 'Enjoy the timeless melodies of Harris Jayaraj performed live with talented musicians.'
  },
  {
    id: 4,
    title: 'Ilaiyaraaja Symphony',
    artist: 'Ilaiyaraaja',
    date: '5 December 2026',
    location: 'Coimbatore',
    venue: 'Codissia Grounds',
    price: 1299,
    image: `${import.meta.env.BASE_URL}images/concerts/concert4.jpg`,
    description: 'A grand symphony celebrating the legendary music of Ilaiyaraaja.'
  },
  {
    id: 5,
    title: 'Tamil Music Fest',
    artist: 'Tamil Music Stars',
    date: '20 December 2026',
    location: 'Chennai',
    venue: 'Adyar Convention Centre',
    price: 699,
    image: `${import.meta.env.BASE_URL}images/concerts/concert5.jpg`,
    description: 'A spectacular evening bringing together some of the most popular voices in Tamil music.'
  }
];

export default concerts;