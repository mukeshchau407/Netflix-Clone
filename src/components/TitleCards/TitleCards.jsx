import React, { useState, useRef, useEffect } from "react";
import "./TitleCards.css";
import Player from "../../pages/Player/Player";

const TitleCards = ({ title, category }) => {
  const [apiData, setApiData] = useState([]);
  const [selectedMovieId, setSelectedMovieId] = useState(null);
  const cardsRef = useRef();

  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization: `Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJlOWQzY2JjZjVkNjlhYjc4ZjI4Y2Y1MTc1NjUwMmYzZSIsIm5iZiI6MTc0MjQ2OTU5Ni4yNTgsInN1YiI6IjY3ZGJmOWRjMTg2ZWNhNTdiMmU3YWFjNCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.fAXMY3DZrpiLA8iFcYQqOkeEbK84Kbe4kSp83udF7d8`,
    },
  };

  const handleWheel = (event) => {
    event.preventDefault();
    cardsRef.current.scrollLeft += event.deltaY;
  };

  useEffect(() => {
    fetch(
      `https://api.themoviedb.org/3/movie/${
        category ? category : "now_playing"
      }?language=en-US&page=1`,
      options
    )
      .then((res) => res.json())
      .then((res) => setApiData(res.results))
      .catch((err) => console.error(err));

    const currentRef = cardsRef.current;
    currentRef.addEventListener("wheel", handleWheel);

    return () => {
      currentRef.removeEventListener("wheel", handleWheel);
    };
  }, [category]);

  const handleCardClick = (movieId) => {
    setSelectedMovieId(movieId);
  };

  const closePlayer = () => {
    setSelectedMovieId(null);
  };

  return (
    <div className="title-cards">
      {selectedMovieId && (
        <Player movieId={selectedMovieId} onClose={closePlayer} />
      )}

      <h2>{title ? title : "Popular on Netflix"}</h2>
      <div className="card-list" ref={cardsRef}>
        {apiData.map((card) => (
          <div
            className="card"
            key={card.id}
            onClick={() => handleCardClick(card.id)}
          >
            <img
              src={`https://image.tmdb.org/t/p/w500${card.backdrop_path}`}
              alt={card.original_title}
            />
            <p>{card.original_title}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TitleCards;
