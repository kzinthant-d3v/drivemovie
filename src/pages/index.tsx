import { HeadFC, PageProps, Script } from "gatsby";
import * as React from "react";
import localforage from "localforage";
import { getToken } from "../utils/getToken";
import listDriveFolderAndVideo from "../api/getDriveFiles";

const IndexPage: React.FC<PageProps> = () => {
  React.useEffect(() => {
    if ("serviceWorker" in navigator) {
      navigator.serviceWorker.register("/sw.js");
    }
  }, []);

  React.useEffect(() => {
    const getSetToken = async () => {
      const accessToken = await getToken();
      localforage.setItem("accessToken", accessToken);
    };

    (async () => await getSetToken())();

    const interval = setInterval(async () => {
      await getSetToken();
    }, 3000000);

    return () => {
      if (interval) clearInterval(interval);
    };
  }, []);

  const [items, setItems] = React.useState([]);

  const updateItems = () => {};

  return (
    <div>
      <h1>{process.env.GATSBY_REFRESH_TOKEN}</h1>
      {/* <ItemList items={items} updateItems={updateItems} /> */}
      <button
        onClick={() =>
          listDriveFolderAndVideo({
            driveId: "0ADqpawmQtjtnUk9PVA",
            folderId: "1JKFc1sU2tBE6hj7otLqRg8YRJ_V6grQ4",
          })
        }
      >
        Test
      </button>
    </div>
  );
};

export default IndexPage;

export const Head: HeadFC = () => {
  return <title>Movie App</title>;
};
