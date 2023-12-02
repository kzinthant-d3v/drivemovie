import React, { useCallback, useEffect, useState } from 'react'
import DriveList from '../components/DriveList';
import useAccessToken from '../hooks/useAccessToken';
import { PageProps, navigate } from 'gatsby';

function Movies({ location }: PageProps) {
  const query = location.search;
  const params = new URLSearchParams(query);

  const search = params.get('search') ?? '';
  // const driveId = '0ADqpawmQtjtnUk9PVA';
  const driveId = 'root';

  useAccessToken();

  const [folderIds, setFolderIds] = useState([driveId, ...[...params].map(p => p[1])]);
  const currentFolder = folderIds[folderIds.length - 1];

  const goNextFolder = useCallback((newFolderId: string) => {
    params.append('f', newFolderId);
    navigate('/movies?' + params.toString());
    setFolderIds(prev => [...prev, newFolderId])
  }, []);

  const onSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const search = new FormData(e.target as HTMLFormElement);
    if (typeof window !== 'undefined') {
      window.location.href = `/movies?search=${search.get('search')}`;
    }
  }

  const goMovies = () => {
    if (typeof window !== 'undefined') {
      window.location.href = "/movies"
    }
  }

  return (
    <div>
      <button onClick={goMovies}>Go to Parent</button>
      <form onSubmit={onSearch}>
        <input placeholder='Search by name' name="search" />
        <button>Search</button>
      </form>
      <DriveList
        search={search}
        goNextFolder={goNextFolder}
        driveId={driveId} folderId={currentFolder} />
    </div>
  )
}

export default Movies