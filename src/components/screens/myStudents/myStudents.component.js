import React from "react";
import "./css/style.css";
import user from "../../../assets/img/user.png";
import StudentListItem from "../../includes/studentListItem/studentListItem.component";

const MyStudents = () => {
  return (
    <React.Fragment>
      <div id="myStudentsSectionOne" className="container-fluid">
        <h1>JSS One Students</h1>
      </div>
      <div id="myStudentsSectiontwo">
        <div className="container-fluid list">
          <div className="row main-row">
            <div className="col-6 green-head">Students</div>
            <div className="col-6 text-right white-head">46 people</div>
          </div>
          <StudentListItem image={user} username="Alli Olatunbosun" />
          <StudentListItem image={user} username="Alli Olatunbosun" />
          <StudentListItem image={user} username="Alli Olatunbosun" />
          <StudentListItem image={user} username="Alli Olatunbosun" />
          <StudentListItem image={user} username="Alli Olatunbosun" />
          <StudentListItem image={user} username="Alli Olatunbosun" />
          <StudentListItem image={user} username="Alli Olatunbosun" />
          <StudentListItem image={user} username="Alli Olatunbosun" />
          <StudentListItem image={user} username="Alli Olatunbosun" />
          <StudentListItem image={user} username="Alli Olatunbosun" />
          <StudentListItem image={user} username="Alli Olatunbosun" />
          <StudentListItem image={user} username="Alli Olatunbosun" />
          <StudentListItem image={user} username="Alli Olatunbosun" />
        </div>
      </div>
    </React.Fragment>
  );
};

export default MyStudents;
