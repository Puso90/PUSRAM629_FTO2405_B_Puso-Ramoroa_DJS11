import React from "react";
import Podcasts from "../components/Podcast_page";
import Footer from "../components/footer";
import Header from "../components/header";
import SortButtons from "../components/SortButtons";

export default function PodcastList() {

    return (
        <div>
            <Header />
            <SortButtons />
            <Podcasts />
            <Footer />
        </div>
    )
}