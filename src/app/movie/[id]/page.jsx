"use client";

import { useEffect, useState } from 'react';
import { useParams } from "next/navigation";
import { Box } from '@mui/material';
import { styled } from 'styled-components';
import Image from 'next/image';

const BASE_URL = "https://api.themoviedb.org/3";
const currentUrl = "https://image.tmdb.org/t/p/w1920_and_h800_multi_faces";

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
        <StyledDetail>
            {movieDetails ? (
                <StyledBackImg bgimage={currentUrl + movieDetails.backdrop_path}>
                    1212
                </StyledBackImg>
            ) : (
                <p>Loading...</p>
            )}
        </StyledDetail>
    );
};

export default MovieDetail;

const StyledDetail = styled(Box)`

`;

const StyledBackImg = styled.div.attrs(props => ({
    style: {
        backgroundImage: `url(${props.bgimage})`,
    },
    }))`
    width: 100%;
    height: 100%;
    background-size: cover;
    background-position: center;
`;