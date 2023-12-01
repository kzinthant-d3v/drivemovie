import React, { useState } from 'react'
import DriveList from '../components/DriveList';
import useAccessToken from '../hooks/useAccessToken';

function Movies() {
  if (typeof document === 'undefined') return null;

  useAccessToken();
  const params = (new URL(document.location.toString())).searchParams;
  const searchParams = new URLSearchParams(params);


  const driveId = '0ADqpawmQtjtnUk9PVA';
  const [folderIds, setFolderIds] = useState([driveId, ...[...searchParams].map(p => p[1])]);
  const currentFolder = folderIds[folderIds.length - 1];

  const goNextFolder = (newFolderId: string) => {
    searchParams.append('f', newFolderId);
    (window as any).location.search = searchParams;
    setFolderIds(prev => [...prev, newFolderId])
  };

  return (
    <div>
      <DriveList
        goNextFolder={goNextFolder}
        driveId={driveId} folderId={currentFolder} />
    </div>
  )
}

export default Movies