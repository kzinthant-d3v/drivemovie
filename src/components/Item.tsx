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

  // console.log(`item ${index} rendering`);
  return (
    <div id={`g${index}`} className="border border-black h-[390px]"
      onClick={() => {
        if (item.mimeType === 'application/vnd.google-apps.folder' && item.id)
          goNextFolder(item.id)
      }}
    >
      {
        isLoading ? <Loader /> :
          <div className="flex flex-col items-center">
            {isFolder ? <div className="w-[100px]"><img src="/assets/folderIcon.png" alt="folderIcon" />
              {item.name}
            </div>
              :
              isPosterPath ? <div className="w-[200px] h-full"
                onClick={() => window.location.href = `/detail/?movieId=${moviesMeta[item.id]?.movieId ?? 'noId'}&videoId=${item.id}`}
              >
                <img src={moviesMeta[item.id]?.posterPath} alt="poster" />
                <h1>{item.name}</h1>
                <h1>{moviesMeta[item.id]?.originalTitle}</h1>
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
