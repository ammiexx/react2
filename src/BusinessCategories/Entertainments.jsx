import React from 'react';
import './Entertainments.css';

const musicItems = [
  {
    id: 1,
    company: 'Universal Music Group',
    photo: 'https://via.placeholder.com/150?text=Music+1',
    name: 'The Weeknd',
    title: 'Blinding Lights',
    description: 'A synth-pop hit that became a global anthem.',
    releaseDate: '2019-11-29',
    price: '$2.99',
    genre: 'Pop',
    duration: '3:22'
  },
  {
    id: 2,
    company: 'Sony Music',
    photo: 'https://via.placeholder.com/150?text=Music+2',
    name: 'Adele',
    title: 'Easy On Me',
    description: 'An emotional ballad from Adele’s fourth studio album.',
    releaseDate: '2021-10-15',
    price: '$2.99',
    genre: 'Soul',
    duration: '3:45'
  },
  {
    id: 3,
    company: 'Warner Music',
    photo: 'https://via.placeholder.com/150?text=Music+3',
    name: 'Ed Sheeran',
    title: 'Shivers',
    description: 'Upbeat love song with a catchy melody.',
    releaseDate: '2021-09-10',
    price: '$2.99',
    genre: 'Pop Rock',
    duration: '3:27'
  }
];

const movieItems = [
  {
    id: 1,
    company: 'Warner Bros',
    photo: 'https://via.placeholder.com/150?text=Movie+1',
    name: 'Christopher Nolan',
    title: 'Oppenheimer',
    description: 'A historical drama based on the life of J. Robert Oppenheimer.',
    releaseDate: '2023-07-21',
    price: '$12.99',
    genre: 'Biography, Drama',
    duration: '3h 0min'
  },
  {
    id: 2,
    company: 'Paramount Pictures',
    photo: 'https://via.placeholder.com/150?text=Movie+2',
    name: 'Tom Cruise',
    title: 'Top Gun: Maverick',
    description: 'After 30 years, Maverick is still pushing the envelope as a top Navy aviator.',
    releaseDate: '2022-05-27',
    price: '$14.99',
    genre: 'Action, Drama',
    duration: '2h 11min'
  },
  {
    id: 3,
    company: 'Marvel Studios',
    photo: 'https://via.placeholder.com/150?text=Movie+3',
    name: 'Taika Waititi',
    title: 'Thor: Love and Thunder',
    description: 'Thor must face Gorr the God Butcher, a galactic killer.',
    releaseDate: '2022-07-08',
    price: '$13.99',
    genre: 'Action, Fantasy',
    duration: '1h 59min'
  },
   {
    id: 4,
    company: 'Marvel Studios',
    photo: 'https://via.placeholder.com/150?text=Movie+3',
    name: 'Taika Waititi',
    title: 'Thor: Love and Thunder',
    description: 'Thor must face Gorr the God Butcher, a galactic killer.',
    releaseDate: '2022-07-08',
    price: '$13.99',
    genre: 'Action, Fantasy',
    duration: '1h 59min'
  },
  {
    id: 5,
    company: 'Paramount Pictures',
    photo: 'https://via.placeholder.com/150?text=Movie+2',
    name: 'Tom Cruise',
    title: 'Top Gun: Maverick',
    description: 'After 30 years, Maverick is still pushing the envelope as a top Navy aviator.',
    releaseDate: '2022-05-27',
    price: '$14.99',
    genre: 'Action, Drama',
    duration: '2h 11min'
  },
];

const Entertainments = () => {
  return (
    <div className="entertainments-container">
      {/* First Column for Music */}
      <div className="column music-column">
        {musicItems.slice(0, 2).map((music) => (
          <div className="card" key={music.id}>
            <img src={music.photo} alt={music.title} className="cover-photo" />
            <div className="info">
              <h4>{music.title}</h4>
              <p><strong>Artist:</strong> {music.name}</p>
              <p><strong>Company:</strong> {music.company}</p>
              <p>{music.description}</p>
              <p><strong>Release:</strong> {music.releaseDate}</p>
              <p><strong>Genre:</strong> {music.genre}</p>
              <p><strong>Duration:</strong> {music.duration}</p>
              <p><strong>Price:</strong> {music.price}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Second Column for Music */}
      <div className="column music-column">
        {musicItems.slice(2).map((music) => (
          <div className="card" key={music.id}>
            <img src={music.photo} alt={music.title} className="cover-photo" />
            <div className="info">
              <h4>{music.title}</h4>
              <p><strong>Artist:</strong> {music.name}</p>
              <p><strong>Company:</strong> {music.company}</p>
              <p>{music.description}</p>
              <p><strong>Release:</strong> {music.releaseDate}</p>
              <p><strong>Genre:</strong> {music.genre}</p>
              <p><strong>Duration:</strong> {music.duration}</p>
              <p><strong>Price:</strong> {music.price}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Third Column for Movies */}
      <div className="column movie-column">
        {movieItems.map((movie) => (
          <div className="card" key={movie.id}>
            <img src={movie.photo} alt={movie.title} className="cover-photo" />
            <div className="info">
              <h4>{movie.title}</h4>
              <p><strong>Director:</strong> {movie.name}</p>
              <p><strong>Company:</strong> {movie.company}</p>
              <p>{movie.description}</p>
              <p><strong>Release:</strong> {movie.releaseDate}</p>
              <p><strong>Genre:</strong> {movie.genre}</p>
              <p><strong>Duration:</strong> {movie.duration}</p>
              <p><strong>Price:</strong> {movie.price}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Entertainments;
