import React, { useEffect, useState } from 'react';
import Header from "/components/header";
import Footer from "/components/footer";
import { Link } from 'react-router-dom';

export default function Favourites() {
    const [likedPodcasts, setLikedPodcasts] = useState([]);

    useEffect(() => {
        const storedLikes = JSON.parse(localStorage.getItem('favorites')) || [];
        setLikedPodcasts(storedLikes);
    }, []);

    return (
        <>
            <Header />
            <h1>Favourites</h1>
            <ul>
                {likedPodcasts.length === 0 ? (
                    <p>No favourite podcasts found.</p>
                ) : (
                    likedPodcasts.map(podcastId => (
                        <li key={podcastId}>
                            <Link to={`/podcast/${podcastId}`}>
                                <h2>{podcastId}</h2> {/* You might want to replace this with actual podcast data */}
                            </Link>
                        </li>
                    ))
                )}
            </ul>
            <Footer />
        </>
    );
}
