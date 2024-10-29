# 🎵 PODCAST APP | PORTFOLIO PIECE 💿
This Podcast App is a user-friendly platform for exploring, sorting, and listening to various podcasts by genres, with additional features for favoriting, viewing episode details, and resuming audio playback. Users can filter podcasts by genre, sort by alphabetical order, and store favorite shows locally.

<!-- omit in toc -->
**Features**
Podcast Discovery: 
- Browse podcasts with genre and alphabetical sorting.
Favorites: 
- Mark favorite podcasts, which persist in local storage.
Audio Player: 
- Listen to episodes directly in the app with progress tracking.
Playback History: 
- Resume from where you left off and view a history of listened episodes.
Season and Episode Selection: 
- Select seasons and episodes from a slick carousel.
Responsive Design: 
- Optimized for various screen sizes.

## 🤖 Prerequisites

Node.js and npm installed on your machine.
Basic knowledge of React and JavaScript.

Clone the repository:
- git clone https://github.com/Puso90/PUSRAM629_FTO2405_B_Puso-Ramoroa_DJS11

Navigate to the project directory:

- bash
- Copy code
- cd podcast-app

Install dependencies:
- npm install
- API Integration

This app uses a sample podcast API for retrieving podcast and genre information. Make sure your development environment has internet access to connect with the external API.

**Running the App**
Start the development server:

- npm start
This will launch the app at http://localhost:3000 where you can begin exploring the podcasts.


## 📦Data

**Usage Examples**

Sorting and Filtering Podcasts

Sort Buttons: 
- Use the sort buttons to sort podcasts alphabetically (A-Z, Z-A) or view only favorites.

Genre Filtering: 
- Click on genre buttons to filter the podcasts by genre.

## Listening to Episodes
Audio Player: 
- Click an episode to play. The audio player is persistent and tracks your progress.
History: 
- A history feature helps you resume from where you last left off or view recently played episodes.
Adding and Viewing Favorites

## Favoriting Podcasts: 
- Click on the heart icon to add a podcast to your favorites.
Viewing Favorites: 
- Favorites can be viewed under the "Favorites" filter or accessed on a dedicated favorites page.

## Season and Episode Navigation
Season Selection: 
- Use the dropdown menu to choose a season and view its episodes.

Episode Carousel: 
- Episodes of the selected season are displayed in a carousel for easy browsing.
Code Structure

### Key Components
Podcasts.js: 
- Displays the main list of podcasts with sorting and filtering features.

PodcastShows.js: 
- Displays the selected podcast's seasons and episodes, with an embedded audio player for each episode.

Audio.js: 
- A reusable audio player component with progress tracking.

SortButtons.js: 
- Manages sorting state for the podcast list (All, A-Z, Z-A, Favorites).

### State Management

React Hooks: 
- Used for managing component state (e.g., useState, useEffect for API calls).
Local Storage: 
- Stores favorited podcasts and listening progress.
Technical Details

### Endpoints

Data was called via a `fetch` request to the following three endpoints. 
| `https://podcast-api.netlify.app` | Returns an array of PREVIEW |
| `https://podcast-api.netlify.app/genre/<ID>` | Returns a GENRE object |
| `https://podcast-api.netlify.app/id/<ID>` | Returns a SHOW object with several SEASON and EPISODE objects directly embedded within |

### Contact

For questions, feel free to reach out at [juwishbrands@gmail.com].