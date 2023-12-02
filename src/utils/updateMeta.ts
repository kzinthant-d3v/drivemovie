import {MovieFile} from '../types';
import {getMovieInfo} from './getMovieInfo';
import { filenameParse } from '@ctrl/video-filename-parser';


const trimWords = [
  /\(([^\)]+)\)/g,
  /\{([^\)]+)\}/g,
  /\[([^\)]+)\]/g,
  /\d/g,
  /\sP\s/g,
  /\sp\s/g,
  /\sB\s/g,
  /\sR\s/g,
  "Copy of",
  'Blurary',
  'Bluray',
  /\smp\s?/g,
  /\smp\s?/g,
  /\smb\s/g,
  'BluRay',
  'Blu-Ray',
  /\sCH\s/g,
  'Webrip',
  'Amzn',
  'Fhdrip',
  'WEB-DL',
  'WEBDL',
  'PP',
  'DC',
  'small',
  '_p',
  'Episode',
  'Complete',
  'Ep',
  'The Series',

];
const transformName = (name: string) => {
  const removeDots = name.split('.').join(' ');

  let trimedName = removeDots;

  trimWords.forEach((trim) => {
    trimedName = trimedName.replaceAll(trim, ' ');
  });

  return trimedName.replace(/\s+/g, ' ');
};

export const updateMeta = async (name: string) => {
  const videoData = await getMovieInfo(transformName(filenameParse(name).title));

  if(videoData.results.length === 0 ) return {
   posterPath: '/assets/mplaceholder.svg' 
  } as MovieFile;
  const result = videoData.results[0];
  
  return {
  searchName: name,
  movieId: result.id,
  originalTitle: result.original_title,
  title: result.title,
  overview: result.overview,
  popularity : result.popularity,
  posterPath: 'https://image.tmdb.org/t/p/original'+ result.poster_path,
  releaseDate: result.release_date,
  voteAverage : result.vote_average,
  voteCount: result.vote_count
  }
};
