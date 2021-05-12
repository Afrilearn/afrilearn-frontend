import React from "react";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";

const SubjectLoader = () => {
  return (
    <SkeletonTheme color="#202020" highlightColor="#444">
      <div className="row push10">
        <div className="col-md-2">
          <span className="recommend">
            <Skeleton />
          </span>
        </div>
        <div className="col-md-2">
          <span className="recommend">
            <Skeleton />
          </span>
        </div>
        <div className="col-md-2">
          <span className="recommend">
            <Skeleton />
          </span>
        </div>
        <div className="col-md-2">
          <span className="recommend">
            <Skeleton />
          </span>
        </div>
        <div className="col-md-2">
          <span className="recommend">
            <Skeleton />
          </span>
        </div>
        <div className="col-md-2">
          <span className="recommend">
            <Skeleton />
          </span>
        </div>
      </div>
    </SkeletonTheme>
  );
};

export default SubjectLoader;
