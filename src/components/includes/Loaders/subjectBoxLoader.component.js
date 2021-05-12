import React from "react";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";

const SubjectBoxLoader = () => {
  return (
    <SkeletonTheme color="#202020" highlightColor="#444">
      <div class="row g-2 my-3">
        <div className=" col-6 col-md-2">
          <Skeleton height={100} />
        </div>
        <div className=" col-6 col-md-2">
          <Skeleton height={100} />
        </div>
        <div className=" col-6 col-md-2">
          <Skeleton height={100} />
        </div>
        <div className=" col-6 col-md-2">
          <Skeleton height={100} />
        </div>
        <div className=" col-6 col-md-2">
          <Skeleton height={100} />
        </div>
        <div className=" col-6 col-md-2">
          <Skeleton height={100} />
        </div>
      </div>
    </SkeletonTheme>
  );
};

export default SubjectBoxLoader;
