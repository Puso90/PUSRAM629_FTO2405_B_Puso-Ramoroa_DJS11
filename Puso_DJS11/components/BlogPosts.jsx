import React, { useEffect, useState } from 'react';
import "/src/index.css";

const Posts = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await fetch('https://podcast-api.netlify.app');
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setPosts(data);
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % posts.length);
  };

  const handlePrev = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + posts.length) % posts.length);
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
        
        <ul className='list-container'>
          {posts.map((post, index) => (
            <li 
              className='list-style' 
              key={post.id} 
              style={{display: index === currentIndex ? 'block' : 'none' }}
            >
              <h2>{post.title}</h2>
              <p>{post.body}</p>
              <img className='podcast-image' src={post.image} alt='podcast image' />
            </li>
          ))}
        </ul>

        <button className='arrow right' onClick={handleNext}>&gt;</button>
      </div>
    </div>
  );
};

export default Posts;