import React from "react";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";

const RecommendationLoader = () => {
  return (
    <SkeletonTheme color="#202020" highlightColor="#444">
      <div className="row push10 bottomBorder">
        <div className="col-md-2">
          <span className="recommend">
            <Skeleton />
          </span>
        </div>
        <div className="col-md-6">
          <p>
            <Skeleton />
          </p>
          <p className="recommendT">
            <Skeleton />
          </p>
          <Skeleton />
        </div>
      </div>
    </SkeletonTheme>
  );
};

export default RecommendationLoader;
