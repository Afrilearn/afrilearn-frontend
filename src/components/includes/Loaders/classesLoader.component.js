import React from "react";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";

const ClassesLoader = () => {
  return (
    <SkeletonTheme color="#202020" highlightColor="#444">
      <div className="row bottomBorder push9 myClassroom">
        <div className="col-md-4">
          <span>
            <Skeleton count={2} />
          </span>
        </div>
        <div className="col-md-4">
          <Skeleton />
        </div>
        <div className="col-md-4 right ">
          <Skeleton />
        </div>
      </div>
    </SkeletonTheme>
  );
};

export default ClassesLoader;
