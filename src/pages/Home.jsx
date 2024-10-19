import React from "react";
import Podcasts from '../pages/Podcast_page';
import Footer from "/components/footer";
import Header from "/components/header";
import SortButtons from "/components/SortButtons";


const Home = () => {

    return (
        <div>
            <Header />
            <SortButtons />
            <Podcasts />
            <Footer />
        </div>
    )
}

export default Home