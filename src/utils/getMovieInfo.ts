type MovieResult = {
  id: string;
  backdrop_path: string;  
  original_title: string;
  overview: string;
  popularity: number;
  poster_path: string;
  release_date: string;
  title: string;
  vote_average: number;
  vote_count: number;
}

type MovieInfo = {
  results: Array<MovieResult>;
}

export const getMovieInfo = async (keyword: string) => {
  const key = process.env.GATSBY_MOVIE_DB_KEY;
  const response =  await fetch(`https://api.themoviedb.org/3/search/movie?query=${keyword}&api_key=${key}`);
return await response.json() as MovieInfo;
};