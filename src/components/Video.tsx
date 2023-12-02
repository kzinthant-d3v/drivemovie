import React, { useEffect } from "react";
import "./plyr.css";
import Plyr from "plyr-react";
import { driveUrl } from "../constants";

type VideoProps = {
  id: string;
  provider?: string;
}

function Video({ id, provider }: VideoProps) {
  const src = [];
  if (provider) {
    src.push({ src: id, provider })
  }
  else {
    src.push({
      src: `${driveUrl}/files/${id}?alt=media`,
      type: "video/mp4" as const,
    })
  }
  const plyrProps = {
    source: {
      type: "video",
      title: "test",
      sources: src,
    },
    options: {
      settings: ['quality', 'speed']
    }
  };

  return (
    <div>
      <Plyr {...plyrProps} />
    </div>
  );
}

export default Video;
