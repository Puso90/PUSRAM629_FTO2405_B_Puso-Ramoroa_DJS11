import React from "react";
import Home from "./pages/Home";
import PodcastDetail from "./pages/Podcast_detail";
import Favourites from "./components/Favourites_page";

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import PodcastList from "./pages/PodcastList";
import FavouritesPage from "./pages/FavouritesPage";

function App() {
  

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/podcast-list" element={<PodcastList />} />
        <Route path="/podcast/:id" element={<PodcastDetail />} />
        <Route path="/favourites" element={<FavouritesPage />} />
        
      </Routes>
    </Router>
  )
}

export default App


/* 
installed:
npm install react-icons

reference for search bar:
https://www.youtube.com/watch?v=sWVgMcz8Q44


*/
