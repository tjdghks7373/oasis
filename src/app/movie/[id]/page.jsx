"use client";

import { useEffect, useState } from 'react';
import { useParams } from "next/navigation";
import { Box, Typography } from '@mui/material';
import { styled } from 'styled-components';
import Rating from '@/components/rating';
import Image from 'next/image';


const BASE_URL = "https://api.themoviedb.org/3";
const currentUrl = "https://image.tmdb.org/t/p/w1920_and_h800_multi_faces";
const posterUrl = "https://image.tmdb.org/t/p/w500";

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
                return fetch(`${BASE_URL}/movie/${id}/release_dates?api_key=${process.env.NEXT_PUBLIC_TMDB_API_KEY}`);   
            })
            .then((res) => res.json())
            .then((data) => {
                if (data.results) {
                    const krRating = data.results.find((item) => item.iso_3166_1 === "KR");  
                    if (krRating && krRating.release_dates.length > 0) {
                        setMovieDetails((prev) => ({
                            ...prev,
                            certification: krRating.release_dates[0].certification || "정보 없음",
                        }));
                    }
                }
            })
            .catch((error) => console.error("Error fetching data:", error));
        }
    }, [id]);

    if (!movieDetails) return <div>Loading...</div>;  

    return (
        <StyledDetail>
            {movieDetails ? (
                <StyledContentWrap>
                    <StyledBackImg bgimage={currentUrl + movieDetails.backdrop_path}>  
                        <StyledMovieInfo>
                            <StyledMovieTitle>
                                {movieDetails.title}  
                            </StyledMovieTitle>
                            <StyledOgTile>
                                {movieDetails.original_title}
                            </StyledOgTile>
                            <StyledInfoTx>
                                {movieDetails.year} · {movieDetails.genre} · {movieDetails.country}
                            </StyledInfoTx>
                            <StyledInfoTx>
                                {movieDetails.runtime} · {movieDetails.certification + "세"}
                            </StyledInfoTx>
                        </StyledMovieInfo>
                    </StyledBackImg>
                    <StyledDetailInfo>   
                        <StyledDetailLeft>
                            <StyledPosterBox>
                                <Image
                                    src={posterUrl + movieDetails.poster_path}
                                    width={280}
                                    height={400}
                                    alt={movieDetails.title}
                                />
                            </StyledPosterBox>
                        </StyledDetailLeft>  
                        <StyledDetailRIght>     
                            <StyledRatingBox>
                                <Rating />
                                <StyledAverage>
                                    <Typography sx={{ fontSize:36, color:"#5e5e64", textAlign:"center" }}>
                                        {movieDetails.vote_average > 0 && `${(movieDetails.vote_average / 2).toFixed(1)}`}
                                    </Typography>
                                    <Typography sx={{ fontSize:12, color:"#7e7e7e", textAlign:"center" }}>  
                                        {movieDetails.vote_count > 0 && `평균 별점 : (${movieDetails.vote_count}명)`}
                                    </Typography>
                                </StyledAverage>
                            </StyledRatingBox>
                        </StyledDetailRIght>
                    </StyledDetailInfo>
                </StyledContentWrap>
            ) : (
                <p>Loading...</p>
            )}
        </StyledDetail>
    );
};

export default MovieDetail;

const StyledDetail = styled(Box)`
    display:block;
`;

const StyledContentWrap = styled(Box)`   
    background-color:#f8f8f8;    
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

const StyledDetailInfo = styled(Box)`
    display:block;
    overflow:hidden;
    width:1320px;
    margin:0 auto;
    padding:30px 0 60px;
`;

const StyledDetailLeft = styled(Box)`
    display:block;
    float:left;
    width:280px;
`;  

const StyledDetailRIght = styled(Box)`
    display:block;
    float:left;
    margin-left:32px;
`;

const StyledRatingBox = styled(Box)`
    display:block;
    overflow:hidden;
    width:1008px;
    padding-bottom:10px;
    border-bottom:1px solid #d9d9d9;
`;

const StyledPosterBox = styled(Box)`
    overflow:hidden;
    border-radius:10px;
`; 

const StyledAverage = styled(Box)`
    float:left;  
`;