import React from "react";
import Podcasts from "./Podcast_page";
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