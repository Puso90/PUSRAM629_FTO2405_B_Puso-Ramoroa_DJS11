import React, { useEffect, useState } from 'react';
import Slider from 'react-slick';
import Audio from '../components/Audio'; // Import your Audio component
import '../components/Style/podcastShowsStyle.css';

// Import Slick CSS
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

const PodcastShows = ({ id }) => {
    const [podcastShows, setPodcastShows] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [selectedSeason, setSelectedSeason] = useState(null); // State for selected season
  
    useEffect(() => {
        const fetchPodcastShows = async () => {
            try {
                const response = await fetch(`https://podcast-api.netlify.app/id/${id}`);
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const data = await response.json();
                setPodcastShows(data);
                setSelectedSeason(data.seasons[0]?.id); // Default to first season
                console.log(data);
            } catch (error) {
                setError(error);
            } finally {
                setLoading(false);
            }
        };
  
        if (id) {
            fetchPodcastShows();
        }
    }, [id]);
  
    if (loading) {
        return <div className='loading'>Loading...</div>;
    }
  
    if (error) {
        return <div>Error: {error.message}</div>;
    }

    if (!podcastShows || !podcastShows.seasons) {
        return <p>No seasons or episodes available</p>;
    }

    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 3,
        slidesToScroll: 1,
        adaptiveHeight: true,
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 1,
                    infinite: true,
                }
            },
            {
                breakpoint: 768,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 1,
                    infinite: true,
                }
            },
            {
                breakpoint: 480,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                }
            }
        ]
    };

    const handleSeasonChange = (event) => {
        setSelectedSeason(event.target.value); // Change season when dropdown is selected
    };

    const selectedSeasonData = podcastShows.seasons.find(season => season.id === selectedSeason);

    // Function to truncate description
    const truncateDescription = (description, maxLength) => {
        if (!description) return '';
        return description.length > maxLength ? `${description.slice(0, maxLength)}...` : description;
    };

    return (
        <div className="podcast-show-container">
            <div className="season-selector">
                <label htmlFor="seasonDropdown">Seasons:</label>
                <select id="seasonDropdown" value={selectedSeason} onChange={handleSeasonChange}>
                    {podcastShows.seasons.map((season, seasonIndex) => (
                        <option key={season.id} value={season.id}>
                            Season {seasonIndex + 1}
                        </option>
                    ))}
                </select>
            </div>
            {selectedSeasonData && (
                <div className="season-container">
                    <h2 className="season-heading">Season {podcastShows.seasons.indexOf(selectedSeasonData) + 1}</h2>
                    <Slider {...settings}>
                        {selectedSeasonData.episodes.map((episode) => {
                            const audioUrl = episode.audioUrl || "https://podcast-api.netlify.app/placeholder-audio.mp3"; // Use placeholder if audioUrl is missing
                            console.log(audioUrl);  // Log the audio URL here
                            return (
                                <div className="episode-block" key={episode.id}>
                                    <h5 className="episode-title">{episode.title}</h5>
                                    <img className="episode-image" src={podcastShows.image} alt="Season" />
                                    <p className="episode-description">{truncateDescription(episode.description, 100)}</p> {/* Truncate to 100 characters */}
                                    <Audio audioUrl={audioUrl} /> {/* Pass the audio URL to Audio component */} 
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