// src/pages/Player.jsx
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const Player = () => {
  const { id } = useParams(); // ✅ get movie ID from URL
  const [videoKey, setVideoKey] = useState(null);

  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: 'Bearer YOUR_ACCESS_TOKEN'
    }
  };

  useEffect(() => {
    fetch(`https://api.themoviedb.org/3/movie/${id}/videos?language=en-US`, options)
      .then(res => res.json())
      .then(data => {
        const trailer = data.results.find(video => video.type === 'Trailer' || video.type === 'Teaser');
        setVideoKey(trailer?.key || null);
      })
      .catch(err => console.error(err));
  }, [id]);

  return (
    <div className="player-page">
      {videoKey ? (
        <iframe
          title="movie-player"
          width="100%"
          height="600px"
          src={`https://www.youtube.com/embed/${videoKey}?autoplay=1`}
          frameBorder="0"
          allow="autoplay; encrypted-media"
          allowFullScreen
        ></iframe>
      ) : (
        <p>Loading video...</p>
      )}
    </div>
  );
};

export default Player;
