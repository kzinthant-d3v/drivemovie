import React, { useEffect, useState } from 'react'
import { MovieDetail } from '../types';
import { getMovieDetail } from '../utils/getMovieDetail';
import { PageProps } from 'gatsby';
import { getTrailer } from '../utils/getTrailer';

const Video = React.lazy(() => import("../components/Video"))

function Detail({ location }: PageProps) {
  const isSSR = typeof window === 'undefined';
  const params = new URLSearchParams(location.search);

  const movieId = params.get('movieId') ?? '';
  const videoId = params.get('videoId')
  const [movieDetail, setMovieDetail] = useState<MovieDetail>();
  const [trailer, setTrailer] = useState<string>();


  useEffect(() => {
    (async () => {
      if (movieId !== 'noId') {
        const movieInfo = await getMovieDetail(movieId)
        setMovieDetail(await getMovieDetail(movieId));
        if (movieInfo.title) {
          setTrailer(await getTrailer(movieInfo.title + " trailer"))
        }
      }
      else setMovieDetail({ title: 'No Title' } as MovieDetail);
    })();
  }, []);

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
      <h1 className='text-[24px]'>Trailer</h1>
      <img src={backDrop} alt="poster" className='absolute' />
      <div className='w-[1000px]'>
        {(!isSSR && trailer) && <React.Suspense fallback={<div />}><Video id={trailer ?? ''} provider='youtube' /></React.Suspense>}
        <h1>Movie</h1>
        {!isSSR && <React.Suspense fallback={<div />}><Video id={videoId ?? ''} /></React.Suspense>}
      </div>
    </div>)
}

export default Detail