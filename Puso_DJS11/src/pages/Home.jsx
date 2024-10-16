import React from "react";
import Podcasts from '/components/Podcast_page';
import Footer from "/components/footer";
import Header from "/components/header";


const Home = () => {

    return (
        <div>
            <Header />
            <Podcasts />
            <Footer />
        </div>
    )
}

export default Home