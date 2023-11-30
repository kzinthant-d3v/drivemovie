import React, { useState } from 'react'
import DriveList from '../components/DriveList';

function Movies() {
  const driveId = '0ADqpawmQtjtnUk9PVA';
  const [folderIds, setFolderIds] = useState([driveId]);
  const currentFolder = folderIds[folderIds.length - 1];

  const goNextFolder = (newFolderId: string) => setFolderIds(prev => [...prev, newFolderId]);
  const goPrevious = () => setFolderIds(prev => {
    if (prev.length > 1) prev.pop();
    return prev
  })

  return (
    <div>
      <DriveList
        goNexFolder={goNextFolder}
        goPrevious={goPrevious}
        driveId={driveId} folderId={currentFolder} />

    </div>
  )
}

export default Movies