import { PAGE_SIZE, filesApi } from "../constants";
import { DriveFile, MimeTypes, MovieFile } from "../types";

type Params = {
  driveId: string;
  folderId: string;
  pageToken?: string;
};

type DriveList = {
  nextPageToken: string;
  files: Array<DriveFile>;
};

const listDriveFolderAndVideo = async ({ driveId, folderId, pageToken = "" }: Params) => {
  const response = await fetch(
    filesApi +
      "?" +
      new URLSearchParams({
        corpora: "drive",
        driveId,
        includeItemsFromAllDrives: "true",
        pageSize: PAGE_SIZE.toString(),
        pageToken,
        supportsAllDrives: "true",
        q: `'${folderId}' in parents and (mimeType = 'application/vnd.google-apps.folder' or mimeType = 'video/mp4')`,
      })
  );
  return (await response.json()) as DriveList;
};

export default listDriveFolderAndVideo;
