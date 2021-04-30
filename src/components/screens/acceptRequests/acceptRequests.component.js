import React, { useEffect, useState } from "react";
import "./css/style.css";
import Footer from "../../includes/footer/footer.component";
import { Link } from "react-router-dom";
import queryString from "query-string";
import { useDispatch, useSelector } from "react-redux";
import { clearSuccess } from "../../../redux/actions/successActions";
import { clearErrors } from "../../../redux/actions/errorActions";
import {
  acceptAdminRequest,
  acceptTeacherRequest,
} from "../../../redux/actions/schoolActions";
import { accpetChildRequest } from "../../../redux/actions/parentActions";

const AcceptRequests = (props) => {
  const parsed = queryString.parse(props.location.search);
  const dispatch = useDispatch();
  const error = useSelector((state) => state.error);
  const success = useSelector((state) => state.success);

  const [good, setGood] = useState(true);
  useEffect(() => {
    dispatch(clearErrors());
    dispatch(clearSuccess());
    if (parsed.role === "admin") {
      const email = parsed.email;
      const schoolId = parsed.schoolId;
      const classId = parsed.classId;
      dispatch(acceptAdminRequest(email, schoolId, classId));
    } else if (parsed.role === "teacher") {
      const email = parsed.email;
      const schoolId = parsed.schoolId;
      const classId = parsed.classId;
      dispatch(acceptTeacherRequest(email, schoolId, classId));
    } else if (parsed.role === "child") {
      const email = parsed.email;
      const parentId = parsed.parentId;
      dispatch(accpetChildRequest(email, parentId));
    }
  }, [good]);

  return (
    <div>
      <div id="accept-request">
        <h1>{error.msg || success.msg || "Proccessing Request!"}</h1>
        <Link to="dashboard">
          <button>Go to Dashboard</button>
        </Link>
      </div>
      <Footer />
    </div>
  );
};

export default AcceptRequests;
