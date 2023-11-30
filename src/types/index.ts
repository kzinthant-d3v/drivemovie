export type MimeTypes =
  | "application/vnd.google-apps.folder"
  | "application/vnd.google-apps.video";

export type DriveFile = {
  name: string;
  mimeType: MimeTypes;
  id: string;
  teamDriveId: string;
};
