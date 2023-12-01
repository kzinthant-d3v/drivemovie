import React, { useEffect, useState } from 'react'
import DriveList from '../components/DriveList';
import useAccessToken from '../hooks/useAccessToken';
import { PageProps, navigate } from 'gatsby';

function Movies({ location }: PageProps) {
  const query = location.search;
  const params = new URLSearchParams(query);
  useAccessToken();

  const driveId = '0ADqpawmQtjtnUk9PVA';
  const [folderIds, setFolderIds] = useState([driveId, ...[...params].map(p => p[1])]);
  const currentFolder = folderIds[folderIds.length - 1];

  const goNextFolder = (newFolderId: string) => {
    params.append('f', newFolderId);
    navigate('/movies?' + params.toString());
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