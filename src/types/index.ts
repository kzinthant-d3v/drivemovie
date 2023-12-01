export type MimeTypes =
  | "application/vnd.google-apps.folder"
  | "video/mp4";
  
export interface DriveFile   {
  name: string;
  mimeType: MimeTypes;
  id: string;
  teamDriveId: string;
};

export interface MovieFile  {
  searchName: string;
  movieId: string;
  originalTitle: string;
  title: string;
  overview: string;
  popularity : number;
  posterPath: string;
  releaseDate: string;
  voteAverage : number;
  voteCount: number;
}

export interface ItemPlaceholder extends Partial<DriveFile> {
  id: string;
  present?: boolean;
}

export type MovieDetail = {
  backDrop: string;
  genres: Array<string>;
  originalTitle: string;
  title: string;
  posterPath: string;
  releaseDate: string;
  time: number;
  languages: Array<string>;
  tagLine: string;
  vote: number;
  voteCount: number;
}