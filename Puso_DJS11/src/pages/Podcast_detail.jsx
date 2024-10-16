import React, { useEffect, useState } from 'react';
import Header from "/components/header";
import Footer from "/components/footer";


const PodcastDetail = ({id}) => {
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchPosts = async () => {
          try {
            const response = await fetch('https://podcast-api.netlify.app/id/10716');
            if (!response.ok) {
              throw new Error('Network response was not ok');
            }
            const data = await response.json();
            setPosts(data);
            // Log the fetched data from the API
            console.log(data);
          } catch (error) {
            setError(error);
          } finally {
            setLoading(false);
          }
        };
        
        fetchPosts();
      }, []);

      if (loading) {
        return <div className='loading'>Loading...</div>;
      }
    
      if (error) {
        return <div>Error: {error.message}</div>;
      }

    return ( 
        <>
            <Header />
                <div>
                    <h1>{posts.title}</h1>
                    <img src={posts.image} style={{ width: '300px', height: '300px' }} />
                    <p>{posts.description}</p>
                    <audio controls>
                        <source src={posts.audioUrl} type="audio/mpeg" />
                        Your browser does not support the audio element.
                    </audio>
                </div>

            <Footer />
        </>
    )
} 

export default PodcastDetail



