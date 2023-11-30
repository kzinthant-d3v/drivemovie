import React, { ReactNode } from "react";
import { DriveFile, MimeTypes } from "../types";
import { Link } from "gatsby";

type ItemProps = {
  item: DriveFile;
  index: number;
};

const icons: Record<MimeTypes, string> = {
  "application/vnd.google-apps.folder": "Folder Icon",
  "application/vnd.google-apps.video": "Video Icon",
};

function Item({ item, index }: ItemProps) {
  console.log(`item ${index} rendering`);
  const link =
    item.mimeType === "application/vnd.google-apps.folder"
      ? `/${item.teamDriveId}/${item.id}`
      : "";

  return (
    <Link to={link}>
      <div id={`g${index}`} className="border border-black h-[390px]">
        <span>{icons[item.mimeType]}</span>
        {item.name}
      </div>
    </Link>
  );
}

export default React.memo(Item);
