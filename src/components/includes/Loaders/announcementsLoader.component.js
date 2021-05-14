import React from "react";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";

const AnnouncementsLoader = () => {
  return (
    <SkeletonTheme color="#202020" highlightColor="#444">
      <div className="chat-block">
        <Skeleton count={2} height={70} />
      </div>
    </SkeletonTheme>
  );
};

export default AnnouncementsLoader;
