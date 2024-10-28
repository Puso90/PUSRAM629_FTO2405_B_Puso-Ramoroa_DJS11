import React, { useEffect, useState } from 'react';
import "./Style/Home_carousel.css";
import { Link } from 'react-router-dom';

const Carousel = () => {
  const [podcasts, setPodcasts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const fetchPodcasts = async () => {
      try {
        const response = await fetch('https://podcast-api.netlify.app');
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setPodcasts(data);
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    fetchPodcasts();
  }, []);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % podcasts.length);
    }, 3000); // Slide every 3 seconds

    return () => clearInterval(intervalId); // Clear interval on component unmount
  }, [podcasts.length]);

  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % podcasts.length);
  };

  const handlePrev = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + podcasts.length) % podcasts.length);
  };

  if (loading) {
    return <div className='loading'>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <div>
      <h1 className='heading'>Podcast</h1>
      <div className='carousel'>
        <button className='arrow left' onClick={handlePrev}>&lt;</button>
        <Link to={'/podcast-list'}>
          <ul className='list-container'>
            {podcasts.map((podcast, index) => (
              <li 
                className='list-style' 
                key={podcast.id} 
                style={{ display: index === currentIndex ? 'block' : 'none' }}
              >
                <h2>{podcast.title}</h2>
                <p>{podcast.body}</p>
                <img className='podcast-image' src={podcast.image} alt='podcast' />
              </li>
            ))}
          </ul>
        </Link>
        <button className='arrow right' onClick={handleNext}>&gt;</button>
      </div>
      {/* View More button below the carousel */}
      <Link to={'/podcast-list'}>
        <button className='view-more-button'>View More</button>
      </Link>
    </div>
  );
};

export default Carousel;
