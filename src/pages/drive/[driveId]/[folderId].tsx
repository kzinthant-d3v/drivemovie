import { PageProps } from "gatsby";
import React, { useEffect, useState } from "react";
import listDriveFolderAndVideo from "../../../api/getDriveFiles";
import ItemList from "../../../components/ItemList";

type FilesType = Awaited<ReturnType<typeof listDriveFolderAndVideo>>;

function DriveList({ location: { pathname } }: PageProps) {
  const [_, driveId, folderId] = pathname.split("/").slice(1).slice(0, -1);
  const [items, setItems] = useState<Array<FilesType["files"][0]>>([]);

  useEffect(() => {
    setItems([]);
    const getData = async () => {
      try {
        const data = await listDriveFolderAndVideo({
          driveId,
          folderId,
        });
        if (data && data.files) {
          setItems(data.files);
        }
      } catch (e) {}
    };
    getData();
  }, [folderId]);

  const updateItems = () => {};

  return (
    <div>
      <ItemList items={items} updateItems={updateItems} />
    </div>
  );
}

export default DriveList;
