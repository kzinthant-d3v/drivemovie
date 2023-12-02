import React, { useEffect, useState } from 'react';
import listDriveFolderAndVideo from '../api/getDriveFiles';
import ItemList from './ItemList';
import { ItemPlaceholder, MovieFile } from '../types';
import { updateMeta } from '../utils/updateMeta';
import { navigate } from 'gatsby';

type FilesType = Awaited<ReturnType<typeof listDriveFolderAndVideo>>;

type DriveListProps = {
  goNextFolder: (folderId: string) => void;
  driveId: string;
  folderId: string;
  search?: string;
};

function DriveList({
  goNextFolder,
  driveId,
  folderId,
  search
}: DriveListProps) {
  const getPlaceHolders = () =>
    Array.from(Array(8).keys()).map((e) => ({
      id: e.toString() + new Date().getTime(),
      present: true,
    }));

  const [items, setItems] = useState<Array<FilesType['files'][0]>>([]);
  const [placeholders, setPlaceholders] =
    useState<Array<ItemPlaceholder>>(getPlaceHolders);

  const [moviesMeta, setMoviesMeta] = useState<Record<string, MovieFile>>({});

  const [nextPage, setNextPage] = useState<{ nextPageToken?: string }>({
    nextPageToken: undefined,
  });

  const getData = async ({ newPage = false }) => {
    try {
      const data = await listDriveFolderAndVideo({
        driveId,
        folderId,
        pageToken: newPage ? '' : nextPage.nextPageToken,
        search
      });
      if (data && data.files) {
        const { nextPageToken, files } = data;
        if (!nextPageToken) setPlaceholders([]);
        setNextPage({ nextPageToken });
        const updatedFiles = newPage ? files : [...items, ...files];
        setItems(updatedFiles);

        const videoOnly = files.filter((file) => file.mimeType === 'video/mp4');
        const videosMeta = await Promise.all(
          videoOnly.map((video) => {
            return Promise.all([video.id, updateMeta(video.name)]);
          })
        );
        setMoviesMeta((prev) => {
          return {
            ...prev,
            ...Object.fromEntries(videosMeta),
          };
        });
      }
    } catch (e) {}
  };

  if (placeholders.length > items.length && nextPage.nextPageToken) {
    getData({ newPage: false });
  }

  useEffect(() => {
    setItems([]);
    setPlaceholders(getPlaceHolders());
    getData({ newPage: true });
  }, [folderId]);

  const updateItems = () => {
    setPlaceholders((prev) => {
      if (nextPage.nextPageToken) {
        return [...prev, ...getPlaceHolders()];
      }
      return prev;
    });
  };


  return (
    <div>
      <ItemList
        placeholders={placeholders}
        moviesMeta={moviesMeta}
        items={items}
        updateItems={updateItems}
        goNextFolder={goNextFolder}
      />
    </div>
  );
}

export default DriveList;
