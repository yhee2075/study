import React, {useEffect, useState} from 'react';
import axios from '../api/axios';
import MovieModal from './MovieModal';
import './Row.css';

// import Swiper core and required modules
import {Navigation, Pagination, Scrollbar, A11y} from 'swiper/modules';

import {Swiper, SwiperSlide} from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';

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
      <Swiper
        // install Swiper modules
        modules={[Navigation, Pagination, Scrollbar, A11y]}
        spaceBetween={10}
        loop={true} // loop 기능을 사용 여부
        breakpoints={{
          1378: {
            slidesPerView: 6, // 한번에 보이는 슬라이드 개수
            slidesPerGroup: 6, // 몇개씩 슬라이드 할지
          },
          998: {
            slidesPerView: 5,
            slidesPerGroup: 5,
          },
          625: {
            slidesPerView: 4,
            slidesPerGroup: 4,
          },
          0: {
            slidesPerView: 3,
            slidesPerGroup: 3,
          },
        }}
        //TODO: Q.pagination 누르기 전까지 navigation 반응 없음
        navigation // arrow 버튼 사용 유무
        pagination={{clickable: true}} // 페이지 버튼 보이게 할지
      >
        <div id={id} className="row__posters">
          {movies.map(movie => (
            <SwiperSlide>
              <img
                key={movie.id}
                // isLagreRow일 경우 className 'row__posterLarge' 추가
                className={`row__poster ${isLargeRow && 'row__posterLarge'}`}
                // isLagreRow일 경우 movie.poster_path, 아닐 경우 movie.backdrop_path 가져오기
                src={`https://image.tmdb.org/t/p/original/${isLargeRow ? movie.poster_path : movie.backdrop_path}`}
                alt={movie.name}
                onClick={() => handleClick(movie)}
              />
            </SwiperSlide>
          ))}
        </div>
      </Swiper>
      {modalOpen && <MovieModal {...movieSelected} setModalOpen={setModalOpen} />}
    </section>
  );
}
