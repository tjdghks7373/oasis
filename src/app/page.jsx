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
  "BE": "벨기엘",
  "FR": "프랑스",
  "GB": "영국",
  "IE": "아일랜드",
  "LU": "룩셈부르크",
  "DE": "독일",
  "CA": "캐나다",
};

// 현재 상영작 가져오기
const fetchNowPlayingMovies = async () => {
  const res = await fetch(`${BASE_URL}/movie/now_playing?api_key=${process.env.NEXT_PUBLIC_TMDB_API_KEY}&language=ko-KR&region=KR`);
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
      const moviesWithCountries = await Promise.all(
        moviesData.map(async (movie) => {
          const { country, releaseYear } = await fetchMovieDetails(movie.id);
          return { ...movie, country, releaseYear };
        })
      );
      setMovies(moviesWithCountries);
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
  
  return (
    <StyledMainContents>
      <Typography sx={{fontSize:20,fontWeight:700,paddingBottom:'12px'}} variant="h2">현재 상영작</Typography>
      <StyledSwiperWrap> 
        <Swiper spaceBetween={16} slidesPerView={5} slidesPerGroup={5} allowTouchMove={false} navigation={true} modules={[Navigation]}>
          {movies.map((movie, index) => (   
            <SwiperSlide key={movie.id}>
              <StyledPosterImg>
                <StyledNum>{index+1}</StyledNum>
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
    </StyledMainContents>
  );
}

const StyledMainContents = styled(Box)`
  width:1320px;
  margin:30px auto
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