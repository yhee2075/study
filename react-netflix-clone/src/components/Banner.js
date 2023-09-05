import axios from '../api/axios';
import React, {useState, useEffect} from 'react';
import requests from '../api/requests';
import './Banner.css';
import {styled} from 'styled-components';

/**
 * TODO: useEffect 사용 방법
 useEffect(() => {
   first >> useEffect를 돌리기 위한 함수 입력
 
   return () => {
     second >> 다른 페이지로 넘어갈 때 반복되지 않도록 멈추게 하거나, 변경할 때 입력
   }
 }, [third]) >> 반복해서 돌리기 위한 변수 값 입력 / 반복하지 않을 경우 빈 칸
 * 
 */

export default function Banner() {
  const [movie, setmovie] = useState([]);
  const [isClicked, setisClicked] = useState(false);
  useEffect(() => {
    fetchData();
  }, []);

  // TODO: console.log 찍는 법
  // console.log('테스트');
  // console.log('오버뷰 => ', movie.production_companies[0].id);
  // console.log(`오버뷰 => ${movie.production_companies[0].id}`);

  /**
   * TODO: await =>
   * js는 함수가 실행된 후 종료까지 기다리지 않고 다음 함수 진행하는 경우 있음
   * 이 때 한 함수가 종료될 때까지 기다리게 하기 위해 await 사용
   * 함수 앞에 [async]가 입력되어야 제대로 작동
   */

  const fetchData = async () => {
    //현재 상영중인 영화(movie/now_playing) 정보를 가져오기(여러 영화)
    const request = await axios.get(requests.fetchNowPlaying);

    /** 여러 영화 중(request.data.results) 영화 하나의 ID를 랜덤(Math.floor(Math.random() * max);)으로 가져오기
     */

    //length => 최대값(최대 길이)
    const movieId = request.data.results[Math.floor(Math.random() * request.data.results.length)].id;

    // 특정 영화의 상세정보 가져오기 (비디오 정보 포함)
    // axios.get(`movie/${movieId}` => movie/

    //TODO: Q.새로고침 시 영화정보가 2개씩 찍힘
    console.log('영화 ID =>', movieId);

    const {data: movieDetail} = await axios.get(`movie/${movieId}`, {
      params: {append_to_response: 'videos'},
    });
    setmovie(movieDetail);
  };

  //return str?.length = > str?에서 ?=if
  const truncate = (str, n) => {
    // 문자가 n 보다 작을 경우, 처음부터 n-1번째 만큼 반환 후 '...' 출력하고 아니면 문자 그대로 출력
    return str?.length > n ? str.substr(0, n - 1) + '...' : str;
  };

  // TODO: Q. useClicked 초깃값 false의 !(반대) true ??
  if (!isClicked) {
    return (
      <header
        className="banner"
        style={{
          // 영화 이미지 파일명 불러오기
          backgroundImage: `url("https://image.tmdb.org/t/p/original/${movie.backdrop_path}")`,
          backgroundPosition: 'top center',
          backgroundSize: 'cover',
        }}
      >
        <div className="banner__contents">
          <h1 className="banne__title">{movie.title || movie.name || movie.original_name}</h1>
          <div className="banner__buttons">
            <button className="banner__button play" onClick={() => setisClicked(true)}>
              play
            </button>
            <button className="banner__button info">More Information</button>
          </div>

          <h1 className="banner__description">{truncate(movie.overview, 100)}</h1>
        </div>
        <div className="banner--fadeBottom" />
      </header>
    );
  } else {
    return (
      <Container>
        <HomeContainer>
          <Iframe
            width="640"
            height="360"
            src={`https://www.youtube.com/embed/${movie.videos.results[0].key}?controls=0&autoplay=1&loop=1&mute=1&playlist=${movie.videos.results[0].key}`}
            title="YouTube video player"
            frameborder="0"
            allow="autoplay; fullscreen"
            allowfullscreen
          ></Iframe>
        </HomeContainer>
      </Container>
    );
  }
}

// styled components 라이브러리 사용
const Iframe = styled.iframe`
  width: 100%;
  height: 100%;
  z-index: -1;
  border: none;

  &::after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
  }
`;

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  width: 100%;
  height: 100vh;
`;

const HomeContainer = styled.div`
  width: 100%;
  height: 100%;
`;
