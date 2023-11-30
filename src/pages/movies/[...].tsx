import { Router, RouteComponentProps } from '@reach/router';
import React from 'react'
import DriveList from '../../components/DriveList';

function Movies() {
  return (
    <Router basepath='/movies'>
      <RouterPage path="/:driveId/:folderId" pageComponent={<DriveList />} />
    </Router>
  )
}

const RouterPage = (
  props: { pageComponent: JSX.Element } & RouteComponentProps
) => props.pageComponent;

export default Movies;