import {MovieFile} from '../types';
import {getMovieInfo} from './getMovieInfo';

const trimWords = [
  /\sP\s/g,
  /\sp\s/g,
  'Blurary',
  'Bluray',
  /\smp\s?/g,
  /\smp\s?/g,
  /\smb\s/g,
  'BluRay',
  /\sCH\s/g,
  'Webrip',
  'Amzn',
  'Fhdrip',
  'WEB-DL',
  'PP',
  'DC',
  'small',
  '_p',
  'Episode',
  'Complete',
  'Ep'
];
const transformName = (name: string) => {
  const dotRemovedName = name.split('.').join(' ');
  const parenRemovedName = dotRemovedName.replace(/\(([^\)]+)\)/g, '');
  const curlRemovedName = parenRemovedName.replace(/\{([^\)]+)\}/g, '');
  const digitRemovedName = curlRemovedName.replace(/\d/g, '');

  let trimedName = digitRemovedName;

  trimWords.forEach((trim) => {
    trimedName = trimedName.replaceAll(trim, ' ');
  });

  return trimedName.replace(/\s+/g, ' ');
};

export const updateMeta = async (name: string) => {
  const videoData = await getMovieInfo(transformName(name));

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
