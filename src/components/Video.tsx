import React from "react";
import "./plyr.css";
import Plyr from "plyr-react";
import { googleUrl } from "../constants";

type VideoProps = {
  id: string;
}

function Video({ id }: VideoProps) {
  const plyrProps = {
    source: {
      type: "video",
      title: "test",
      sources: [
        {
          src: `${googleUrl}/files/${id}?alt=media`,
          type: "video/mp4" as const,
        },
      ],
    },
  };

  return (
    <div>
      <Plyr {...plyrProps} />
    </div>
  );
}

export default Video;
