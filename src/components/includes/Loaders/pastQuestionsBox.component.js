import React from "react";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";

const PastQuestionsLoader = () => {
  return (
    <SkeletonTheme color="#202020" highlightColor="#444">
      <div className="row jj">
        <div className="col-md-3">
          <span>
            <Skeleton height={100} />
          </span>
        </div>
        <div className="col-md-3">
          <Skeleton height={100} />
        </div>
        <div className="col-md-3">
          <Skeleton height={100} />
        </div>
        <div className="col-md-3">
          <Skeleton height={100} />
        </div>
      </div>
    </SkeletonTheme>
  );
};

export default PastQuestionsLoader;
