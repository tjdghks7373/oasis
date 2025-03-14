"use client";

import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import { useEffect, useState } from "react";
import { Box, Typography } from '@mui/material';
import { styled } from 'styled-components';
import Image from 'next/image';
import Link from 'next/link';
import 'swiper/css';
import 'swiper/css/navigation';


const BASE_URL = "https://api.themoviedb.org/3";

const countryMapping = {
  "US": "미국",
  "GB": "영국",
  "KR": "한국",
  "JP": "일본",
  "BE": "벨기에",
  "FR": "프랑스",
  "IE": "아일랜드",
  "LU": "룩셈부르크",
  "DE": "독일",
  "CA": "캐나다",
  "AU": "호주",
  "CN": "중국",
  "IN": "인도",
  "IT": "이탈리아",
  "ES": "스페인",
  "NL": "네덜란드",
  "SE": "스웨덴",
  "CH": "스위스",
  "BR": "브라질",
  "RU": "러시아",
  "MX": "멕시코",
  "SG": "싱가포르",
  "NZ": "뉴질랜드",
  "ZA": "남아프리카공화국",
  "TH": "태국",
  "MY": "말레이시아",
  "LV": "라트비아",
};

// 현재 상영작 가져오기
const fetchNowPlayingMovies = async () => {
  const res = await fetch(`${BASE_URL}/movie/now_playing?api_key=${process.env.NEXT_PUBLIC_TMDB_API_KEY}&language=ko-KR&region=KR`);
  const data = await res.json();
  return data.results;
};

const fetchUpcomingMovies = async () => {
  const res = await fetch(`${BASE_URL}/movie/upcoming?api_key=${process.env.NEXT_PUBLIC_TMDB_API_KEY}&language=ko-KR&region=KR`);
  const data = await res.json();
  return data.results;
};

const fetchPopularMovies = async () => {
  const res = await fetch(`${BASE_URL}/movie/popular?api_key=${process.env.NEXT_PUBLIC_TMDB_API_KEY}&language=ko-KR&region=KR`);
  const data = await res.json();
  return data.results;
};

// 특정 영화의 상세 정보 (제작 국가 포함) 가져오기
const fetchMovieDetails = async (movieId) => {
  const res = await fetch(`${BASE_URL}/movie/${movieId}?api_key=${process.env.NEXT_PUBLIC_TMDB_API_KEY}&language=ko-KR`);
  const data = await res.json();

  const originalCountry = data.production_countries.length > 0 ? data.production_countries[0].iso_3166_1 : "정보 없음";

  return {
    country: countryMapping[originalCountry] || originalCountry,
    releaseYear: data.release_date ? data.release_date.split("-")[0] : "미정",
  };
};

export default function Home() {
  const currentUrl = "https://image.tmdb.org/t/p/w500";
  const [movies, setMovies] = useState([]);
  const [genres, setGenres] = useState([]);

  // 해당 영화 장르 가져오기
  const fetchGenres = async () => {
    const res = await fetch(`${BASE_URL}/genre/movie/list?api_key=${process.env.NEXT_PUBLIC_TMDB_API_KEY}&language=ko-KR`);
    const data = await res.json();
    setGenres(data.genres);
  };

  useEffect(() => {
    const fetchData = async () => {
      const moviesData = await fetchNowPlayingMovies();
      const upcomingMoviesData = await fetchUpcomingMovies();
      const popularMoviesData = await fetchPopularMovies();
  
      // 모든 카테고리의 영화 정보를 받아온 후 중복을 제거
      const allMoviesData = [
        ...moviesData.map((movie) => ({ ...movie, type: 'nowPlaying' })),
        ...upcomingMoviesData.map((movie) => ({ ...movie, type: 'upcoming' })),
        ...popularMoviesData.map((movie) => ({ ...movie, type: 'popular' }))
      ];
  
      // 중복 영화 제거 (id 기준으로)
      const uniqueMovies = Array.from(
        new Map(allMoviesData.map((movie) => [movie.id, movie])).values()
      );
  
      // 영화의 상세 정보 추가
      const moviesWithDetails = await Promise.all(
        uniqueMovies.map(async (movie) => {
          const { country, releaseYear } = await fetchMovieDetails(movie.id);
          return { ...movie, country, releaseYear };
        })
      );
  
      // 상태 업데이트
      setMovies(moviesWithDetails);
    };
  
    fetchData();
    fetchGenres();
  }, []);

  const getGenreNames = (genreIds) => {
    return genreIds
      .map((id) => {
        const genre = genres.find((genre) => genre.id === id);
        return genre ? genre.name : null;
      })
      .filter(Boolean)  // null 값 제거
      .join(", ");
  };

  const nowPlayingMovies = movies.filter((movie) => movie.type === 'nowPlaying');
  const upcomingMovies = movies.filter((movie) => movie.type === 'upcoming');
  const popularMovies = movies.filter((movie) => movie.type === 'popular');

  return (
    <StyledMainContents>
      <StyledPopular>
        <Typography sx={{ fontSize: 20, fontWeight: 700, paddingBottom: '12px' }} variant="h2">인기 영화</Typography>
        <StyledSwiperWrap>
          <Swiper spaceBetween={16} slidesPerView={5} slidesPerGroup={5} allowTouchMove={false} navigation={true} modules={[Navigation]}>
            {popularMovies.map((movie, index) => (
              <SwiperSlide key={`${movie.id}-${movie.releaseYear}`}>
                <StyledPosterImg>
                  <StyledNum>{index + 1}</StyledNum>
                  <Link href={`/movie/${movie.id}`}>
                    <Image
                      src={currentUrl + movie.poster_path}
                      width={250}
                      height={356}
                      alt={movie.title}
                    />
                  </Link>
                </StyledPosterImg>
                <StyledMovieArea>
                  <StyledMovieTitle>
                    {movie.title}
                  </StyledMovieTitle>
                  <StyledMovieInfo>
                    {movie.releaseYear}・ {movie.country}
                  </StyledMovieInfo>
                  <StyledMovieInfo>
                    {movie.vote_average > 0 && `평점 : ${(movie.vote_average / 2).toFixed(1)}`}
                  </StyledMovieInfo>
                  <StyledMovieInfo>
                    장르 : {getGenreNames(movie.genre_ids)}
                  </StyledMovieInfo>
                </StyledMovieArea>
              </SwiperSlide>
            ))}
          </Swiper>
        </StyledSwiperWrap>
      </StyledPopular>      
      <StyledNowMovie>
        <Typography sx={{ fontSize: 20, fontWeight: 700, paddingBottom: '12px' }} variant="h2">현재 상영작</Typography>
        <StyledSwiperWrap>
          <Swiper spaceBetween={16} slidesPerView={5} slidesPerGroup={5} allowTouchMove={false} navigation={true} modules={[Navigation]}>
            {nowPlayingMovies.map((movie, index) => (
              <SwiperSlide key={`${movie.id}-${movie.releaseYear}`}>
                <StyledPosterImg>
                  <StyledNum>{index + 1}</StyledNum>
                  <Link href={`/movie/${movie.id}`}>
                    <Image
                      src={currentUrl + movie.poster_path}
                      width={250}
                      height={356}
                      alt={movie.title}
                    />
                  </Link>
                </StyledPosterImg>
                <StyledMovieArea>
                  <StyledMovieTitle>
                    {movie.title}
                  </StyledMovieTitle>
                  <StyledMovieInfo>
                    {movie.releaseYear}・ {movie.country}
                  </StyledMovieInfo>
                  <StyledMovieInfo>
                    {movie.vote_average > 0 && `평점 : ${(movie.vote_average / 2).toFixed(1)}`}
                  </StyledMovieInfo>
                  <StyledMovieInfo>
                    장르 : {getGenreNames(movie.genre_ids)}
                  </StyledMovieInfo>
                </StyledMovieArea>
              </SwiperSlide>
            ))}
          </Swiper>
        </StyledSwiperWrap>
      </StyledNowMovie>
      <StyledUpcoming>
        <Typography sx={{ fontSize: 20, fontWeight: 700, paddingBottom: '12px' }} variant="h2">공개 예정작</Typography>
        <StyledSwiperWrap>
          <Swiper spaceBetween={16} slidesPerView={5} slidesPerGroup={5} allowTouchMove={false} navigation={true} modules={[Navigation]}>
            {upcomingMovies.map((movie, index) => (
              <SwiperSlide key={`${movie.id}-${movie.releaseYear}`}>
                <StyledPosterImg>
                  <StyledNum>{index + 1}</StyledNum>
                  <Link href={`/movie/${movie.id}`}>
                    <Image
                      src={currentUrl + movie.poster_path}
                      width={250}
                      height={356}
                      alt={movie.title}
                    />
                  </Link>
                </StyledPosterImg>
                <StyledMovieArea>
                  <StyledMovieTitle>
                    {movie.title}
                  </StyledMovieTitle>
                  <StyledMovieInfo>
                    {movie.releaseYear}・ {movie.country}
                  </StyledMovieInfo>
                  <StyledMovieInfo>
                    {movie.vote_average > 0 && `평점 : ${(movie.vote_average / 2).toFixed(1)}`}
                  </StyledMovieInfo>
                  <StyledMovieInfo>
                    장르 : {getGenreNames(movie.genre_ids)}
                  </StyledMovieInfo>
                </StyledMovieArea>
              </SwiperSlide>
            ))}
          </Swiper>
        </StyledSwiperWrap>
      </StyledUpcoming>
    </StyledMainContents>
  );
}

const StyledMainContents = styled(Box)`
  width:1320px;
  margin:30px auto
`;

const StyledNowMovie = styled(Box)`
  margin-top:60px;
`;

const StyledPopular = styled(Box)`
  margin-top:60px;
`;

const StyledUpcoming = styled(Box)`
  margin-top:60px;
`;

const StyledSwiperWrap = styled(Box)`
  .swiper-button-disabled {display:none;}
  .swiper .swiper-button-prev,
  .swiper .swiper-button-next {
    width: 34px;
    height: 34px;
    top: 50%;
    background-color:#fff;
    font-weight:700;
    color:#292a3266;
    border-radius:50%;
    box-shadow:0 0 4px #0003;
  }
  .swiper .swiper-button-prev:after{
    font-size:14px;
    padding-right:3px;
  }
  .swiper .swiper-button-next:after {
    font-size:14px;
    padding-left:3px;
  }
`;

const StyledPosterImg = styled(Box)`
  position:relative;  
  overflow:hidden;
  width:100%;
  border-radius:5px;
`;

const StyledNum = styled(Box)`
  position:absolute;
  top:6px;
  left:6px;
  width:28px;
  height:28px;
  background-color:#000;
  color:#fff;
  text-align:center;
  border-radius:4px;
  line-height:24px;
`;

const StyledMovieArea = styled(Box)`
  display:block;
  margin-top:5px;
`;

const StyledMovieTitle = styled(Box)`
  display:block;
  font-size:16px;
  margin-bottom:3px;
  color:#292a32;
  line-height:22px;
`;

const StyledMovieInfo = styled(Box)`
  display:block;
  font-size:14px;
  color:#7e7e7e;
  margin-bottom:5px;
  line-height:20px;
`;