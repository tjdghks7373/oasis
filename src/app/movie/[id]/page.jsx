"use client";

import { useEffect, useState } from 'react';
import { useParams } from "next/navigation";
import { Box, Typography, ButtonGroup, Button } from '@mui/material';
import { styled } from 'styled-components';
import Rating from '@/components/rating';
import Image from 'next/image';
import AddIcon from '@mui/icons-material/Add';
import CreateIcon from '@mui/icons-material/Create';
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';


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

const CustomButton = styled(Button)({
    display:"inline-block",
    backgroundColor: "transparent",
    border: "none !important", 
    color: "#747474",
    "&:hover": {
        backgroundColor: "transparent !important",
        borderRight: "none !important",
    },
    "&:active": {
        backgroundColor: "transparent !important",
        borderRight: "none !important",
    },
    boxShadow: "none"
});  

const formatRuntime = (minutes) => {
    if (!minutes) return "정보 없음";
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return hours > 0 ? `${hours}시간 ${mins}분` : `${mins}분`;
};

const MovieDetail = () => {
    const { id } = useParams();
    const [movieDetails, setMovieDetails] = useState(null);
    const [castlist, setCastlist] = useState();

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
                return Promise.all([
                    fetch(`${BASE_URL}/movie/${id}/release_dates?api_key=${process.env.NEXT_PUBLIC_TMDB_API_KEY}`),
                    fetch(`${BASE_URL}/movie/${id}/credits?api_key=${process.env.NEXT_PUBLIC_TMDB_API_KEY}&language=ko-KR`)
                ]);
            })
            .then(([releaseDatesRes, creditsRes]) => Promise.all([releaseDatesRes.json(), creditsRes.json()]))   
            .then(([releaseDatesData, creditsData]) => {
                if (releaseDatesData.results) {
                    const krRating = releaseDatesData.results.find((item) => item.iso_3166_1 === "KR");  
                    if (krRating && krRating.release_dates.length > 0) {
                        setMovieDetails((prev) => ({
                            ...prev,
                            certification: krRating.release_dates[0].certification || "정보 없음",
                        }));
                    }
                }
    
                // ⭐ 출연진 정보 추가
                if (creditsData.cast) {
                    setMovieDetails((prev) => ({
                        ...prev,
                        cast: creditsData.cast.slice(0, 10) // 상위 10명만 저장
                    }));
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
                                        {movieDetails.vote_count > 0 && `평균 별점 : (${movieDetails.vote_count.toLocaleString()}명)`}
                                    </Typography>
                                </StyledAverage>
                                <ButtonGroup sx={{float:"right", display:"block"}}>
                                    <CustomButton disableRipple disableElevation color="inherit">
                                        <AddIcon sx={{ fontSize:40, color:"#7e7e7e", margin:"0 auto" }} />
                                        <Typography sx={{ display:"block", fontSize:12, color:"#5e5e64", textAlign:"center" }}>
                                            보고싶어요
                                        </Typography>
                                    </CustomButton>
                                    <CustomButton disableRipple disableElevation color="inherit">
                                        <CreateIcon sx={{ fontSize:40, color:"#7e7e7e", margin:"0 auto" }} />
                                        <Typography sx={{ display:"block", fontSize:12, color:"#5e5e64", textAlign:"center" }}>
                                            코멘트
                                        </Typography>
                                    </CustomButton>
                                    <CustomButton disableRipple disableElevation color="inherit">
                                        <RemoveRedEyeIcon sx={{ fontSize:40, color:"#7e7e7e", margin:"0 auto" }} />
                                        <Typography sx={{ display:"block", fontSize:12, color:"#5e5e64", textAlign:"center" }}>
                                            보는중
                                        </Typography>
                                    </CustomButton>
                                    <CustomButton disableRipple disableElevation color="inherit">
                                        <MoreHorizIcon sx={{ fontSize:40, color:"#7e7e7e", textAlign:"center" }} />
                                        <Typography sx={{ display:"block", fontSize:12, color:"#5e5e64", textAlign:"center" }}>
                                            더보기
                                        </Typography>
                                    </CustomButton>
                                </ButtonGroup>
                            </StyledRatingBox>
                            <StyledBannerBox>
                                <Image
                                    src={"/images/banner_img.png"}
                                    width={720}
                                    height={90}
                                    alt={"아노라 1000캐시백"}
                                />
                            </StyledBannerBox>
                            <StyledOverviewBox>
                                {movieDetails.overview}
                            </StyledOverviewBox>
                        </StyledDetailRIght>
                    </StyledDetailInfo>
                    <StyledCastInfo>
                        {movieDetails.cast && (
                            <div>
                                <h3>출연/제작</h3>
                                <ul>
                                    {movieDetails.cast.map((actor) => (
                                        <li key={actor.id}>
                                            <img src={`https://image.tmdb.org/t/p/w200${actor.profile_path}`} alt={actor.name} />
                                            <p>{actor.name} ({actor.character})</p>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        )}
                    </StyledCastInfo>
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
    width:1008px;
    margin-left:32px;
`;

const StyledRatingBox = styled(Box)`
    display:block;
    overflow:hidden;
    padding-bottom:10px;
    border-bottom:1px solid #d9d9d9;
`;

const StyledPosterBox = styled(Box)`
    overflow:hidden;
    border-radius:5px;
`; 

const StyledAverage = styled(Box)`
    float:left;  
`;

const StyledBannerBox = styled(Box)`
    margin-top:25px;
    width:100%;
    text-align:center;
    background-color:#BB2158;
    border-radius:5px;
`;

const StyledOverviewBox = styled(Box)`
    margin-top:20px;
    line-height:20px;
    font-size:14px;
    color:#7e7e7e;
`;

const StyledCastInfo = styled(Box)`
    background-color:#fff;
`;