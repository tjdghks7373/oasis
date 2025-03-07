import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';

const BASE_URL = "https://api.themoviedb.org/3";

const MovieDetail = () => {
    const router = useRouter();
    const { id } = router.query;
    const [movieDetails, setMovieDetails] = useState(null);

    useEffect(() => {
        if (id) {
            // API를 통해 영화 디테일 정보 가져오기
            const fetchMovieDetails = async () => {
                const res = await fetch(`${BASE_URL}/movie/${id}?api_key=${process.env.NEXT_PUBLIC_TMDB_API_KEY}&language=ko-KR`);
                const data = await res.json();
                setMovieDetails(data);
            };

            fetchMovieDetails();
            console.log(id)
        }
    }, [id]);

    if (!movieDetails) return <div>Loading...</div>;

    return (
        <div>
            <h1>{movieDetails.title}</h1>
        </div>
    );
};

export default MovieDetail;
