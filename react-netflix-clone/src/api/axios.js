import axios from 'axios';

const instance = axios.create({
  baseURL: 'https://api.themoviedb.org/3',
  params: {
    api_key: 'dc6c8d24cda583b4ccde487443bd705f',
    language: 'ko-KR',
  },
});

export default instance;
