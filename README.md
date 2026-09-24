# Concert Ticket Booking Website

A React + Vite concert ticket booking app where users can browse concerts, sign up or log in, add favorites to a wishlist, and book seats for upcoming events.

## Features

- User sign up and login flow
- Protected ticket booking
- Wishlist support for registered users only
- Concert listings and detail pages
- Seat selection and booking summary
- My bookings dashboard
- Responsive UI for desktop and mobile

## Tech Stack

- React
- Vite
- React Router
- LocalStorage-based user and booking persistence

## Getting Started

1. Install dependencies:
   ```bash
   npm install
   ```
2. Start the development server:
   ```bash
   npm run dev
   ```
3. Build for production:
   ```bash
   npm run build
   ```

## Project Structure

```bash
src/
  components/
  context/
  data/
  pages/
  App.jsx
  main.jsx
```

## Authentication Note

Only registered users can:
- book tickets
- add concerts to their wishlist
- view their own bookings

## GitHub

This project is configured to be pushed to GitHub using the existing remote.
