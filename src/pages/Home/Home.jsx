import React, { useState, useEffect } from "react";
import "./Home.css";
import Navbar from "../../components/Navbar/Navbar";
import TitleCards from "../../components/TitleCards/TitleCards";
import Footer from "../../components/Footer/Footer";
import play_icon from "../../assets/play_icon.png";
import info_icon from "../../assets/info_icon.png";
import Player from "../../pages/Player/Player"; // Import your Player component

const Home = () => {
  const [featuredMovie, setFeaturedMovie] = useState(null);
  const [showPlayer, setShowPlayer] = useState(false);
  const [videoKey, setVideoKey] = useState(null);

  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJlOWQzY2JjZjVkNjlhYjc4ZjI4Y2Y1MTc1NjUwMmYzZSIsIm5iZiI6MTc0MjQ2OTU5Ni4yNTgsInN1YiI6IjY3ZGJmOWRjMTg2ZWNhNTdiMmU3YWFjNCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.fAXMY3DZrpiLA8iFcYQqOkeEbK84Kbe4kSp83udF7d8",
    },
  };

  useEffect(() => {
    fetch(
      "https://api.themoviedb.org/3/movie/now_playing?language=en-US&page=1",
      options
    )
      .then((res) => res.json())
      .then((data) => {
        const randomIndex = Math.floor(Math.random() * data.results.length);
        const movie = data.results[randomIndex];
        setFeaturedMovie(movie);

        // Fetch videos for this movie
        fetch(
          `https://api.themoviedb.org/3/movie/${movie.id}/videos?language=en-US`,
          options
        )
          .then((res) => res.json())
          .then((videoData) => {
            const trailer = videoData.results?.find(
              (video) => video.type === "Trailer" || video.type === "Teaser"
            );
            if (trailer) {
              setVideoKey(trailer.key);
            }
          });
      })
      .catch((err) => console.error(err));
  }, []);

  const handlePlayClick = () => {
    if (videoKey) {
      setShowPlayer(true);
    }
  };

  const closePlayer = () => {
    setShowPlayer(false);
  };

  return (
    <div className="home">
      <Navbar />
      {showPlayer && (
        <Player movieId={featuredMovie?.id} onClose={closePlayer} />
      )}

      <div className="hero">
        {featuredMovie && (
          <>
            <img
              src={`https://image.tmdb.org/t/p/original${featuredMovie.backdrop_path}`}
              alt={featuredMovie.title}
              className="banner-img"
            />
            <div className="hero-caption">
              <h1 className="hero-title">{featuredMovie.title}</h1>
              <p>
                {featuredMovie.overview?.length > 150
                  ? `${featuredMovie.overview.substring(0, 150)}...`
                  : featuredMovie.overview}
              </p>
              <div className="hero-btns">
                <button className="btn" onClick={handlePlayClick}>
                  <img src={play_icon} alt="Play" />
                  Play
                </button>
                <button className="btn dark-btn">
                  <img src={info_icon} alt="More Info" />
                  More Info
                </button>
              </div>
              <TitleCards />
            </div>
          </>
        )}
      </div>

      <div className="more-cards">
        <TitleCards title={"Blockbuster Movies"} category={"top_rated"} />
        <TitleCards title={"Only on Netflix"} category={"popular"} />
        <TitleCards title={"Upcoming"} category={"upcoming"} />
        <TitleCards title={"Top Pics for You"} category={"now_playing"} />
      </div>

      <Footer />
    </div>
  );
};

export default Home;
