import React from "react";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";

const ClassWorksLoader = () => {
  return (
    <SkeletonTheme color="#202020" highlightColor="#444">
      <div className="class-item">
        <Skeleton count={2} height={70} />
      </div>
    </SkeletonTheme>
  );
};

export default ClassWorksLoader;
