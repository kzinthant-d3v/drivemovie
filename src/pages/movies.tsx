import React, { useEffect, useState } from 'react'
import DriveList from '../components/DriveList';
import useAccessToken from '../hooks/useAccessToken';
import { PageProps, navigate } from 'gatsby';

function Movies({ location }: PageProps) {

  useAccessToken();
  const params = (new URL(location.href.toString())).searchParams;
  const searchParams = new URLSearchParams(params);

  const driveId = '0ADqpawmQtjtnUk9PVA';
  const [folderIds, setFolderIds] = useState([driveId, ...[...searchParams].map(p => p[1])]);
  const currentFolder = folderIds[folderIds.length - 1];

  const goNextFolder = (newFolderId: string) => {
    searchParams.append('f', newFolderId);
    navigate("?" + searchParams.toString());
    setFolderIds(prev => [...prev, newFolderId])
  };
  console.log('render')

  useEffect(() => {
    setFolderIds([driveId, ...[...searchParams].map(p => p[1])])
  }, [searchParams.toString()])

  return (
    <div>
      <DriveList
        goNextFolder={goNextFolder}
        driveId={driveId} folderId={currentFolder} />
    </div>
  )
}

export default Movies