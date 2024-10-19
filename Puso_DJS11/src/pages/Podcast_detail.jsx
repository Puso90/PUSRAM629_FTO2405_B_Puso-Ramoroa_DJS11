import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom'; // Import useParams to get the ID from the URL
import Header from "/components/header";
import Footer from "/components/footer";
import PodcastShows from "/components/PodcastShows";
import Slider from 'react-slick';
import Audio from '/components/Audio';

const PodcastDetail = () => {
    const { id } = useParams(); // Get the podcast ID from the URL parameters
    const [podcast, setPodcast] = useState({}); // Initialize state for the podcast details
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchPodcast = async () => {
          try {
            // Fetch the podcast details using the ID
            const response = await fetch(`https://podcast-api.netlify.app/id/${id}`);
            if (!response.ok) {
              throw new Error('Network response was not ok');
            }
            const data = await response.json();
            setPodcast(data); // Set the fetched podcast data in state
          } catch (error) {
            setError(error); // Set error state if fetch fails
          } finally {
            setLoading(false); // Set loading to false after fetch attempt
          }
        };
        console.log(fetchPodcast())
        fetchPodcast(); // Call the fetch function
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
                <h1>{podcast.title}</h1> {/* Display podcast title */}
                <img src={podcast.image} style={{ width: '300px', height: '300px' }} alt='Podcast' /> {/* Display podcast image */}
                <p>{podcast.description}</p> {/* Display podcast description */}
                <PodcastShows id={id} /> {/* Pass podcast ID to PodcastShows component */}
            </div>
            <Footer /> {/* Render footer */}
        </>
    );
}; 

export default PodcastDetail;

