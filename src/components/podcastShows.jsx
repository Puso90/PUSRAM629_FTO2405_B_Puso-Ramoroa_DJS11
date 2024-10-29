import React, { useEffect, useState } from 'react'; // React and hooks for state and lifecycle management
import Slider from 'react-slick'; // Slick carousel for episode display
import Audio from './Audio'; // Audio component to handle audio playback
import '../components/Style/podcastShowsStyle.css';

// Import Slick carousel CSS for styling
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

// PodcastShows component displays episodes for a specific podcast, allowing season selection and episode playback
const PodcastShows = ({ id }) => {
    const [podcastShows, setPodcastShows] = useState(null); // Stores podcast details, including seasons and episodes
    const [loading, setLoading] = useState(true); // Tracks loading state
    const [error, setError] = useState(null); // Tracks error state if fetching data fails
    const [selectedSeason, setSelectedSeason] = useState(null); // Tracks selected season for filtering episodes
  
    // Fetch podcast data by ID when component mounts or when `id` changes
    useEffect(() => {
        const fetchPodcastShows = async () => {
            try {
                const response = await fetch(`https://podcast-api.netlify.app/id/${id}`);
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const data = await response.json(); // Parse JSON data
                setPodcastShows(data); // Store podcast data
                setSelectedSeason(data.seasons[0]?.id); // Set default season to the first one, if available
                console.log(data); // Log data for debugging
            } catch (error) {
                setError(error); // Store any fetch error
            } finally {
                setLoading(false); // Set loading to false after fetch completes
            }
        };
  
        if (id) {
            fetchPodcastShows(); // Fetch data only if `id` is provided
        }
    }, [id]); // Runs effect when `id` changes
  
    if (loading) {
        return <div className='loading'>Loading...</div>; // Show loading spinner/message while fetching
    }
  
    if (error) {
        return <div>Error: {error.message}</div>; // Display error if fetch failed
    }

    if (!podcastShows || !podcastShows.seasons) {
        return <p>No seasons or episodes available</p>; // Message for podcasts without seasons or episodes
    }

    // Carousel settings for responsive display of episodes
    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 3, // Shows 3 episodes per slide on large screens
        slidesToScroll: 1,
        adaptiveHeight: true,
        responsive: [
            {
                breakpoint: 1024,
                settings: { slidesToShow: 3, slidesToScroll: 1, infinite: true },
            },
            {
                breakpoint: 768,
                settings: { slidesToShow: 2, slidesToScroll: 1, infinite: true },
            },
            {
                breakpoint: 480,
                settings: { slidesToShow: 1, slidesToScroll: 1 },
            }
        ]
    };

    // Updates selected season when a user picks a different season from the dropdown
    const handleSeasonChange = (event) => {
        setSelectedSeason(event.target.value); // Update selectedSeason with dropdown selection
    };

    // Finds the data for the currently selected season
    const selectedSeasonData = podcastShows.seasons.find(season => season.id === selectedSeason);

    // Helper function to truncate long episode descriptions
    const truncateDescription = (description, maxLength) => {
        if (!description) return '';
        return description.length > maxLength ? `${description.slice(0, maxLength)}...` : description;
    };

    return (
        <div className="podcast-show-container">
            {/* Dropdown for selecting season */}
            <div className="season-selector">
                <label htmlFor="seasonDropdown">Seasons:</label>
                <select id="seasonDropdown" value={selectedSeason} onChange={handleSeasonChange}>
                    {podcastShows.seasons.map((season, seasonIndex) => (
                        <option key={season.id} value={season.id}>
                            Season {seasonIndex + 1} {/* Displays season number dynamically */}
                        </option>
                    ))}
                </select>
            </div>
            
            {/* Display episodes for the selected season */}
            {selectedSeasonData && (
                <div className="season-container">
                    <h2 className="season-heading">Season {podcastShows.seasons.indexOf(selectedSeasonData) + 1}</h2>
                    
                    {/* Slick slider to display episodes in the selected season */}
                    <Slider {...settings}>
                        {selectedSeasonData.episodes.map((episode) => {
                            // Set audio URL or use a placeholder if missing
                            const audioUrl = episode.audioUrl || "https://podcast-api.netlify.app/placeholder-audio.mp3"; 
                            console.log(audioUrl);  // Log the audio URL for debugging
                            
                            return (
                                <div className="episode-block" key={episode.id}>
                                    <h5 className="episode-title">{episode.title}</h5>
                                    <img className="episode-image" src={podcastShows.image} alt="Season" /> {/* Display episode image */}
                                    <p className="episode-description">{truncateDescription(episode.description, 100)}</p> {/* Display truncated description */}
                                    <Audio audioUrl={audioUrl} /> {/* Pass audio URL to Audio component for playback */}
                                </div>
                            );
                        })}
                    </Slider>
                </div>
            )}
        </div>
    );
};

export default PodcastShows;







/* Installed Carousel 
npm install react-slick slick-carousel
*/