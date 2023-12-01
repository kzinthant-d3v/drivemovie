import {MovieDetail} from '../types';

export const getMovieDetail = async (movieId: string): Promise<MovieDetail> => {
  const key = process.env.GATSBY_MOVIE_DB_KEY;
  const response = await fetch(
    `https://api.themoviedb.org/3/movie/${movieId}?api_key=${key}`
  );
  const result = await response.json();
  return {
    backDrop: 'https://image.tmdb.org/t/p/original' + result.backdrop_path,
    genres: result.genres.map((g: {name: string}) => g.name),
    originalTitle: result.original_title,
    title: result.title,
    posterPath: 'https://image.tmdb.org/t/p/original' + result.poster_path,
    releaseDate: result.release_date,
    time: result.runtime,
    languages: result.spoken_languages.map((l: {name: any}) => l.name),
    tagLine: result.tagLine,
    vote: result.vote_average,
    voteCount: result.vote_count,
  };
};
