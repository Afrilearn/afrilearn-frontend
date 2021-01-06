import React, { useState } from "react";
import "./css/style.css";
import {
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
} from "reactstrap";
import { Link } from "react-router-dom";

const PastQuestionsSubjectBadge = (props) => {
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const toggle = () => setDropdownOpen((prevState) => !prevState);
  return (
    <div id="pastQuestionsSubjectBadge">
      <div className="item">
        <p>{props.title}</p>

        <Dropdown isOpen={dropdownOpen} toggle={toggle}>
          <DropdownToggle>
            <div className="itemRec">
              <img src={props.image} alt="main" height="80%" />
            </div>
          </DropdownToggle>
          <DropdownMenu>
            <DropdownItem header>Select Year</DropdownItem>
            <Link to="/category/english/instruction">
              <DropdownItem>1988</DropdownItem>
            </Link>
            <Link to="/category/english/instruction">
              <DropdownItem>1989</DropdownItem>
            </Link>
            <Link to="/category/english/instruction">
              <DropdownItem>1990</DropdownItem>
            </Link>
            <Link to="/category/english/instruction">
              <DropdownItem>1991</DropdownItem>
            </Link>
            <Link to="/category/english/instruction">
              <DropdownItem>1992</DropdownItem>
            </Link>
            <Link to="/category/english/instruction">
              <DropdownItem>1993</DropdownItem>
            </Link>
            <Link to="/category/english/instruction">
              <DropdownItem>1994</DropdownItem>
            </Link>
            <Link to="/category/english/instruction">
              <DropdownItem>1995</DropdownItem>
            </Link>
            <Link to="/category/english/instruction">
              <DropdownItem>1996</DropdownItem>
            </Link>
          </DropdownMenu>
        </Dropdown>
      </div>
    </div>
  );
};

export default PastQuestionsSubjectBadge;
