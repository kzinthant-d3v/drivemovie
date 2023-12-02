import React from "react";
import { ItemPlaceholder, MimeTypes, MovieFile } from "../types";

type ItemProps = {
  item: ItemPlaceholder;
  moviesMeta: Record<string, MovieFile>;
  index: number;
  goNextFolder: (folderId: string) => void;
};

const icons: Record<MimeTypes, string> = {
  "application/vnd.google-apps.folder": "Folder Icon",
  "video/mp4": "Video Icon",
};

const Loader = () => {
  return <div className="animate-pulse">
    <div className="h-[390px] bg-indigo-500">
      Loading
    </div>
  </div>
}
function Item({ item, moviesMeta, index, goNextFolder }: ItemProps) {
  const isLoading = item.present;
  const isFolder = item.mimeType === 'application/vnd.google-apps.folder';
  const isPosterPath = Boolean(moviesMeta[item.id] && moviesMeta[item.id].posterPath);

  const movieInfo = moviesMeta[item.id];

  // console.log(`item ${index} rendering`);
  return (
    <div id={`g${index}`} className="border border-black h-[600px]"
      onClick={() => {
        if (item.mimeType === 'application/vnd.google-apps.folder' && item.id)
          goNextFolder(item.id)
      }}
    >
      {
        isLoading ? <Loader /> :
          <div className="flex  flex-col items-center">
            {isFolder ? <div className="w-[100px]"><img src="/assets/folderIcon.png" alt="folderIcon" />
              {item.name}
            </div>
              :
              isPosterPath ? <div className="w-full h-[300px]"
                onClick={() => window.location.href = `/detail/?movieId=${movieInfo?.movieId ?? 'noId'}&videoId=${item.id}`}
              >
                <div className="w-[200px]">
                  <img src={movieInfo?.posterPath} alt="poster" />
                </div>
                <h1>Drive Name: {item.name}</h1>
                <h1>Movie Name: {movieInfo?.originalTitle}</h1>
                <h1>Popularity: {movieInfo?.popularity}</h1>
                <h1>Release Date: {movieInfo?.releaseDate}</h1>
                <h1>Vote Average: {movieInfo?.voteAverage}</h1>
                <h1>Vote Count: {movieInfo?.voteCount}</h1>

                <h1 className="text-[10px]">Overview: {movieInfo?.overview}</h1>
              </div> : <div>
                Still loading
              </div>
            }

          </div>
      }
    </div>
  );
}

export default React.memo(Item);
