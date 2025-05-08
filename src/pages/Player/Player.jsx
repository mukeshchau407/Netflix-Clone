import React, { useState, useEffect } from "react";
import "./Player.css"; // We'll create this CSS file next

const Player = ({ movieId, onClose }) => {
  const [videoData, setVideoData] = useState({
    key: null,
    title: "",
    backdrop: "",
    overview: "",
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isMuted, setIsMuted] = useState(true);

  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization: `Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJlOWQzY2JjZjVkNjlhYjc4ZjI4Y2Y1MTc1NjUwMmYzZSIsIm5iZiI6MTc0MjQ2OTU5Ni4yNTgsInN1YiI6IjY3ZGJmOWRjMTg2ZWNhNTdiMmU3YWFjNCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.fAXMY3DZrpiLA8iFcYQqOkeEbK84Kbe4kSp83udF7d8`,
    },
  };

  useEffect(() => {
    if (!movieId) return;

    setLoading(true);
    setError(null);

    // First fetch movie details
    fetch(
      `https://api.themoviedb.org/3/movie/${movieId}?language=en-US`,
      options
    )
      .then((res) => res.json())
      .then((movieDetails) => {
        // Then fetch videos
        fetch(
          `https://api.themoviedb.org/3/movie/${movieId}/videos?language=en-US`,
          options
        )
          .then((res) => res.json())
          .then((videoData) => {
            const trailer = videoData.results?.find(
              (video) => video.type === "Trailer" || video.type === "Teaser"
            );

            setVideoData({
              key: trailer?.key || null,
              title: movieDetails.title || movieDetails.original_title,
              backdrop: movieDetails.backdrop_path,
              overview: movieDetails.overview,
            });
            setLoading(false);
          });
      })
      .catch((err) => {
        console.error("Fetch error:", err);
        setError("Failed to load video. Please try again later.");
        setLoading(false);
      });
  }, [movieId]);

  const toggleMute = () => {
    setIsMuted(!isMuted);
  };

  return (
    <div className="popup-overlay" onClick={onClose}>
      <div className="popup-content" onClick={(e) => e.stopPropagation()}>
        {/* <div className="popup-header">
          <button className="popup-close" onClick={onClose}>
            &times;
          </button>
        </div> */}

        <div className="video-container">
          {loading ? (
            <div className="loading-state">
              <div className="spinner"></div>
            </div>
          ) : error ? (
            <div className="error-state">
              <p>{error}</p>
            </div>
          ) : videoData.key ? (
            <div className="iframe-container">
              <iframe
                src={`https://www.youtube.com/embed/${
                  videoData.key
                }?autoplay=1&mute=${isMuted ? 1 : 0}`}
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            </div>
          ) : (
            <div className="no-trailer">
              <img
                src={`https://image.tmdb.org/t/p/w1280${videoData.backdrop}`}
                alt={videoData.title}
                className="backdrop"
              />
              <div className="no-trailer-overlay">
                <p>No trailer available</p>
                <p className="movie-overview">{videoData.overview}</p>
              </div>
            </div>
          )}
        </div>
        <div className="popup-footer">
          <button className="button play-button">▶ Play</button>
          <button className="button add-button">+ My List</button>
        </div>
      </div>
    </div>
  );
};

export default Player;
