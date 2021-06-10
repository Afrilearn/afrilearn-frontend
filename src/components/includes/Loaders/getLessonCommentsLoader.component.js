import React from "react";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";

const GetLessonCommentsLoader = () => {
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
          <p className="green text-center text-md-start">
              <Skeleton />{" "}
          </p>
          <p className="text-center text-md-start">
            <Skeleton />
          </p>
        </div>
        <div className="col-md-4 center">
          <p className="green text-center text-md-start">
            <Skeleton />{" "}
          </p>
          <p className="text-center text-md-start">
            <Skeleton />
          </p>
        </div>
      </div>
    </SkeletonTheme>
  );
};

export default GetLessonCommentsLoader;
