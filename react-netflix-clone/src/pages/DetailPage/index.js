import axios from '../../api/axios';
import {useParams} from 'react-router-dom';
import {useEffect, useState} from 'react';
import './DetailPage.css';

export default function DetailePage() {
  const {movieId} = useParams();

  const [movie, setMovie] = useState({});

  useEffect(() => {
    async function fetchData() {
      const request = await axios.get(`/movie/${movieId}`);
      setMovie(request.data);
      console.log(movie.title);
    }
    fetchData();
  }, [movieId]);

  if (!movie) return <div>...loading</div>;
  return (
    <section>
      {' '}
      <img
        className="modal__poster-img"
        src={`https://image.tmdb.org/t/p/original/${movie.backdrop_path}`}
        alt="poster"
      />
      <h2 className="title">{movie.title ? movie.title : movie.name}</h2>
      <p className="overview"> 평점 : {movie.vote_average}</p>
      <p className="overview">{movie.overview}</p>
    </section>
  );
}
