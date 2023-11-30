import React from "react";
import "./plyr.css";
import Plyr from "plyr-react";

const plyrProps = {
  source: {
    type: "video",
    title: "test",
    sources: [
      {
        src: `${googleUrl}/files/1Yd71AGSJNFpcrVTINlBVvb696zyJRpqY?alt=media`,
        type: "video/mp4" as const,
      },
    ],
  },
};

function Video() {
  return (
    <div>
      <Plyr {...plyrProps} />
    </div>
  );
}

export default Video;
