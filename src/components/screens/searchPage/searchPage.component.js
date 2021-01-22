import React, { useEffect, useRef } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { inputChange } from "./../../../redux/actions/authActions";

import "./css/style.css";
import { Link } from "react-router-dom";

const SearchPage = (props) => {
  const { searchResults, searchText } = props;
  const mounted = useRef();
  useEffect(() => {
    if (!mounted.current) {
      // do componentDidMount logic
      mounted.current = true;
      window.scrollTo(0, 0);
      // props.inputChange("searchRedirect", false);
    } else {
      // do componentDidUpdate logic
    }
  });

  return (
    <div id="searchPage" className="bg-black">
      <div className="negative-margin"></div>
      {searchResults.length > 0 ? (
        <div class="card container mt-10 bg-black">
          <div class="card-body">
            <h1>Search Results for “ {searchText}”</h1>
            <small>
              {searchResults.length} topic {searchResults.length > 1 ? "s" : ""}
              found
            </small>
          </div>
          {searchResults.map((result) => (
            <Link to={`/classes/${result.courseId._id}`}>
              <div class="card-body ">
                <div class="card no-border" style={{ marginBottom: "5px" }}>
                  <div class="card-body row result m-0">
                    <div className="col-md-3 hide-later">
                      <img
                        src={result.subjectId.mainSubjectId.imageUrl}
                        width="200px"
                        height="100px"
                        class="img-left"
                        alt="..."
                      />
                    </div>

                    <div className="col-md-9">
                      <h5>{result.title}</h5>{" "}
                      <small>
                        {result.termId.name}: {result.courseId.name}
                      </small>
                      <p>{result.content.slice(0, 100)}...</p>
                    </div>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      ) : (
        <div className="card-body">
          <h5>No search result. start search</h5>
        </div>
      )}{" "}
    </div>
  );
};

SearchPage.propTypes = {
  inputChange: PropTypes.func.isRequired,
};
const mapStateToProps = (state) => ({
  searchResults: state.search.searchResults,
  searchText: state.search.searchText,
});
export default connect(mapStateToProps, { inputChange })(SearchPage);
