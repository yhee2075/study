import axios from '../../api/axios';
import {useParams} from 'react-router-dom';
import {useEffect, useState} from 'react';

export default function DetailePage() {
  const {movieId} = useParams();

  const [movie, setMovie] = useState({});

  useEffect(() => {
    async function fetchData() {
      const request = await axios.get(`/movie/${movieId}`);
      setMovie(request.data);
      console.log('request', request);
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
    </section>
  );
}
