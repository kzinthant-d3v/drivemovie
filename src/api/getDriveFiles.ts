import { PAGE_SIZE, filesApi } from "../constants";
import { DriveFile, MimeTypes } from "../types";

type Params = {
  driveId: string;
  folderId: string;
};

type DriveList = {
  files: Array<DriveFile>;
};

const listDriveFolderAndVideo = async ({ driveId, folderId }: Params) => {
  const response = await fetch(
    filesApi +
      "?" +
      new URLSearchParams({
        corpora: "drive",
        driveId,
        includeItemsFromAllDrives: "true",
        pageSize: PAGE_SIZE.toString(),
        supportsAllDrives: "true",
        q: `'${folderId}' in parents and (mimeType = 'application/vnd.google-apps.folder' or mimeType = 'video/mp4')`,
      })
  );
  return (await response.json()) as DriveList;
};

export default listDriveFolderAndVideo;
