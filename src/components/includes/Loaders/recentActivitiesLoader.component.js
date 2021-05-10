import React from "react";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";

const RecentActivityLoader = () => {
  return (
    <SkeletonTheme color="#202020" highlightColor="#444">
      <div className="row push10 bottomBorder subjectList">
        <div className="col-md-4">
          <p className="green text-center text-md-start">
            <Skeleton />{" "}
          </p>
          <p className="text-center text-md-start">
            <Skeleton />
          </p>
        </div>
        <div className="col-md-4">
          <span>
            <Skeleton />
          </span>
        </div>
        <div className="col-md-4 center">
          <p>
            <Skeleton />{" "}
          </p>
        </div>
      </div>
    </SkeletonTheme>
  );
};

export default RecentActivityLoader;
