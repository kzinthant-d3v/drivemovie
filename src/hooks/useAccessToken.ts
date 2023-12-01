import React from 'react'
import { getToken } from '../utils/getToken';
import localforage from 'localforage';

function useAccessToken() {
  React.useEffect(() => {
    if ("serviceWorker" in navigator) {
      navigator.serviceWorker.register("/sw.js");
    }
  }, []);

  React.useEffect(() => {
    const getSetToken = async () => {
      const accessToken = await getToken();
      console.log(accessToken);
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
}

export default useAccessToken