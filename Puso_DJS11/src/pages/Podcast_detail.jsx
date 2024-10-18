import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom'; // Import useParams to get the ID from the URL
import Header from "/components/header";
import Footer from "/components/footer";

const PodcastDetail = () => {
    const { id } = useParams(); // Get the podcast ID from the URL parameters
    const [podcasts, setpodcasts] = useState({}); // Initialize state for a single post
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchpodcasts = async () => {
          try {
            // Fetch the podcast details using the ID
            const response = await fetch(`https://podcast-api.netlify.app/id/${id}`);
            if (!response.ok) {
              throw new Error('Network response was not ok');
            }
            const data = await response.json();
            setpodcasts(data); // Set the fetched podcast data in state
            console.log(data); // Log the fetched data for debugging
          } catch (error) {
            setError(error); // Set error state if fetch fails
          } finally {
            setLoading(false); // Set loading to false after fetch attempt
          }
        };
        
        fetchpodcasts(); // Call the fetch function
      }, [id]); // Dependency array includes id to refetch when it changes

    // Show loading state while fetching data
    if (loading) {
        return <div className='loading'>Loading...</div>;
    }
    
    // Show error message if there was a problem fetching data
    if (error) {
        return <div>Error: {error.message}</div>;
    }

    return ( 
        <>
            <Header /> {/* Render header */}
            <div>
                <h1>{podcasts.title}</h1> {/* Display podcast title */}
                <img src={podcasts.image} style={{ width: '300px', height: '300px' }} alt='Podcast' /> {/* Display podcast image */}
                <p>{podcasts.description}</p> {/* Display podcast description */}
                <audio controls>
                    <source src={podcasts.audioUrl} type="audio/mpeg" /> {/* Audio source */}
                    Your browser does not support the audio element.
                </audio>
            </div>
            <Footer /> {/* Render footer */}
        </>
    );
}; 

export default PodcastDetail;
