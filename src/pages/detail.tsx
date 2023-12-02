import React, { useEffect, useState } from 'react'
import { MovieDetail } from '../types';
import { getMovieDetail } from '../utils/getMovieDetail';
import { PageProps } from 'gatsby';

const Video = React.lazy(() => import("../components/Video"))

function Detail({ location }: PageProps) {
  const isSSR = typeof window === 'undefined';
  const params = new URLSearchParams(location.search);

  const movieId = params.get('movieId') ?? '';
  const videoId = params.get('videoId')
  const [movieDetail, setMovieDetail] = useState<MovieDetail>();


  useEffect(() => {
    (async () => {
      setMovieDetail(await getMovieDetail(movieId));
    })();
  }, []);

  if (movieId === 'noId') return <div>
    {!isSSR && <React.Suspense fallback={<div />}><Video id={videoId ?? ''} /></React.Suspense>}
  </div>

  if (!movieDetail) return null

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
        {!isSSR && <React.Suspense fallback={<div />}><Video id={videoId ?? ''} /></React.Suspense>}
      </div>
    </div>)
}

export default Detail