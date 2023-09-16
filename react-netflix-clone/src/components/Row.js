import React, {useEffect, useState} from 'react';
import axios from '../api/axios';
import './Row.css';
import MovieModal from './MovieModal';

// TODO: isLargeRow는 무슨 기준의 값?
export default function Row({title, id, fetchUrl, isLargeRow}) {
  const [movies, setMovies] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [movieSelected, setMovieSelected] = useState({});

  useEffect(() => {
    fetchMoiveData();
  }, []);

  const fetchMoiveData = async () => {
    const request = await axios.get(fetchUrl);
    setMovies(request.data.results);
  };

  //클릭한 영화의 정보 가져오기
  const handleClick = movie => {
    //클릭 시 ModalOpen값 true로 변경
    setModalOpen(true);
    setMovieSelected(movie);
  };
  return (
    <section className="row">
      <h2>{title}</h2>
      <div className="slider">
        <div className="slider__arrow-left">
          <span
            className="arrow"
            onClick={() => {
              document.getElementById(id).scrollLeft -= window.innerWidth - 80;
            }}
          >
            {/* {}없이 입력 시 오류 */}
            {'<'}
          </span>
        </div>
        <div id={id} className="row__posters">
          {movies.map(movie => (
            <img
              key={movie.id}
              // TODO: Q. className을 각각 다르게 하기 위해????
              className={`row__poster ${isLargeRow && 'row__posterLarge'}`}
              src={`https://image.tmdb.org/t/p/original/${isLargeRow ? movie.poster_path : movie.backdrop_path}`}
              alt={movie.name}
              onClick={() => handleClick(movie)}
            />
          ))}
        </div>
        <div className="slider__arrow-right">
          <span
            className="arrow"
            onClick={() => {
              // window.innerwidth => 화면에 표시되는 width값
              document.getElementById(id).scrollLeft += window.innerWidth - 80;
            }}
          >
            {'>'}
          </span>
        </div>
      </div>

      {modalOpen && <MovieModal {...movieSelected} setModalOpen={setModalOpen} />}
    </section>
  );
}
