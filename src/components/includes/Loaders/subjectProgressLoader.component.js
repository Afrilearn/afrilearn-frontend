import React from "react";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";

const SubjectProgress = () => {
  return (
    <SkeletonTheme color="#202020" highlightColor="#444">
      <div className="row">
        <div className="col-md-12">
          <span>
            <Skeleton count={5} />
          </span>
        </div>       
      </div>
    </SkeletonTheme>
  );
};

export default SubjectProgress;
