import { PAGE_SIZE, filesApi } from "../constants";
import { DriveFile, MimeTypes, MovieFile } from "../types";

type Params = {
  driveId: string;
  folderId: string;
  pageToken?: string;
  search?: string;
};

type DriveList = {
  nextPageToken: string;
  files: Array<DriveFile>;
};

const listDriveFolderAndVideo = async ({ driveId, folderId, pageToken = "", search }: Params) => {
  let searchQuery = `'${folderId}' in parents and (mimeType = 'application/vnd.google-apps.folder' or mimeType = 'video/mp4')`;
  if(search) searchQuery = `mimeType = 'video/mp4' and name contains '${search}'`;
  
  const response = await fetch(
    filesApi +
      "?" +
      new URLSearchParams({
        // corpora: "drive",
        // driveId,
        // includeItemsFromAllDrives: "true",
        pageSize: PAGE_SIZE.toString(),
        pageToken,
        // supportsAllDrives: "true",
        q: searchQuery,
        fields : "nextPageToken, files(id, name, mimeType, size ,createdTime, modifiedTime, iconLink, thumbnailLink)"
      })
  ,{
    headers: {
      authorization: localStorage.getItem('accessToken') ?? ''
    }
  });
  return (await response.json()) as DriveList;
};

export default listDriveFolderAndVideo;
