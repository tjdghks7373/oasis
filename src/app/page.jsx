"use client";

import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import { useEffect, useState } from "react";
import { Box, Typography } from '@mui/material';
import { styled } from 'styled-components';
import Image from 'next/image';

export default function Home() {
  const [movies, setMovies] = useState([]);
  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const res = await fetch(
          `https://api.themoviedb.org/3/movie/popular?api_key=${process.env.NEXT_PUBLIC_TMDB_API_KEY}&language=ko-KR&page=1`
        );
        const data = await res.json();
        setMovies(data.results);
        console.log(data.results)
      } catch (error) {
        console.error("영화 데이터 가져오기 오류:", error);
      }
    };
    fetchMovies();
  }, []);
  return (
    <StyledMainContents>
      <Typography sx={{fontSize:20,fontWeight:700,paddingBottom:'12px'}} variant="h2">인기 영화</Typography>
      <Swiper spaceBetween={16} slidesPerView={5} pagination={{ clickable: false }} navigation={true}>
        {movies.map((movie, index) => (
          <SwiperSlide key={movie.id}>
            <StyledPosterImg>
              <StyledNum>{index+1}</StyledNum>
              <Image
                src={"https://image.tmdb.org/t/p/w500" + movie.poster_path}
                width={250}
                height={356}
                alt={movie.title}
              />
            </StyledPosterImg>
          </SwiperSlide>
        ))}
      </Swiper>
    </StyledMainContents>
  );
}

const StyledMainContents = styled(Box)`
  width:1320px;
  margin:30px auto
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
  
`;