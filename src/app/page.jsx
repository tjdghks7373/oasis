"use client";
import { useEffect, useState } from "react";

export default function Home() {
  const [movies, setMovies] = useState([]);
  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const res = await fetch(
          `https://api.themoviedb.org/3/movie/now_playing?api_key=${process.env.NEXT_PUBLIC_TMDB_API_KEY}&language=ko-KR&page=2`
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
    <div>메인
      <ul>
        {movies.map((movie) => (
          <li key={movie.id}>
            {movie.title}
            
          </li>
        ))}
      </ul>
    </div>
  );
}