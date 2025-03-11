"use client";

import { useEffect, useState } from 'react';
import { useParams } from "next/navigation";

const BASE_URL = "https://api.themoviedb.org/3";

const MovieDetail = () => {
    const { id } = useParams();
    const [movieDetails, setMovieDetails] = useState(null);

    useEffect(() => {
        if (id) {
            fetch(`${BASE_URL}/movie/${id}?api_key=${process.env.NEXT_PUBLIC_TMDB_API_KEY}&language=ko-KR`)
                .then((res) => res.json())
                .then((data) => setMovieDetails(data));
        }
    }, [id]);

    if (!movieDetails) return <div>Loading...</div>;

    return (
        <div>{movieDetails ? movieDetails.title : "Loading..."}</div>
    );
};

export default MovieDetail;
