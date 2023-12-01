import React, { useEffect, useState } from 'react'
import { MovieDetail } from '../types';
import { getMovieDetail } from '../utils/getMovieDetail';
import Video from '../components/Video';

function Detail() {
  const params = (new URL(document.location.toString())).searchParams;
  const movieId = params.get('movieId') ?? '';
  const videoId = params.get('videoId')
  const [movieDetail, setMovieDetail] = useState<MovieDetail>();

  useEffect(() => {
    (async () => {
      setMovieDetail(await getMovieDetail(movieId));
    })();
  }, []);

  if (!movieDetail) return null;
  const {
    backDrop,
    genres,
    originalTitle,
    title,
    posterPath,
    releaseDate,
    time,
    languages,
    tagLine,
    vote,
    voteCount
  } = movieDetail;

  return (
    <div className='relative'>
      <img src={backDrop} alt="poster" className='absolute' />
      <div className='w-[1000px]'>
        <Video id={videoId} />
      </div>
    </div>)
}

export default Detail