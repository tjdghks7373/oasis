"use client";

import { useEffect, useState } from 'react';
import { useParams } from "next/navigation";
import { Box } from '@mui/material';
import { styled } from 'styled-components';

const BASE_URL = "https://api.themoviedb.org/3";
const currentUrl = "https://image.tmdb.org/t/p/w1920_and_h800_multi_faces";

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

const formatRuntime = (minutes) => {
    if (!minutes) return "정보 없음";
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return hours > 0 ? `${hours}시간 ${mins}분` : `${mins}분`;
};

const MovieDetail = () => {
    const { id } = useParams();
    const [movieDetails, setMovieDetails] = useState(null);

    useEffect(() => {  
        if (id) {  
            fetch(`${BASE_URL}/movie/${id}?api_key=${process.env.NEXT_PUBLIC_TMDB_API_KEY}&language=ko-KR`)
            .then((res) => res.json())
            .then((data) => {
                setMovieDetails({
                    ...data,
                    year: data.release_date ? data.release_date.split("-")[0] : "N/A",
                    genre : data.genres ? data.genres.map((g) => g.name).join("/") : "정보 없음",
                    country : data.origin_country ? data.origin_country.map((code) => countryMapping[code] || code).join(", ") : "정보 없음",
                    runtime : formatRuntime(data.runtime)
                });
            });
        }
    }, [id]);

    if (!movieDetails) return <div>Loading...</div>;  

    return (
        <StyledDetail>
            {movieDetails ? (
                <StyledBackImg bgimage={currentUrl + movieDetails.backdrop_path}>
                    <StyledMovieInfo>
                        <StyledMovieTitle>
                            {movieDetails.title}  
                        </StyledMovieTitle>
                        <StyledOgTile>
                            {movieDetails.original_title}
                        </StyledOgTile>
                        <StyledInfoTx>
                            {movieDetails.year} · {movieDetails.genre} · {movieDetails.country} · {movieDetails.runtime}
                        </StyledInfoTx>
                    </StyledMovieInfo>
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
        backgroundImage: props.bgimage ? `url(${props.bgimage})` : 'none',
        backgroundColor: props.bgimage ? '#333' : 'transparent',
    },
    }))`
    position : relative;
    width: 100%;
    height: 550px;
    background-size: cover;
    background-position: center;
`;

const StyledMovieInfo = styled(Box)`
    position:absolute;
    bottom:60px;
    left:0;
    right:0;
    width:1320px;
    margin:0 auto;
    color:#fff;
`;

const StyledMovieTitle = styled(Box)`
    color:#fff;
    font-size:36px;
    font-weight:700;
`; 

const StyledOgTile = styled(Box)`
    margin-top:16px;
`;

const StyledInfoTx = styled(Box)`
    margin-top:5px;
`;