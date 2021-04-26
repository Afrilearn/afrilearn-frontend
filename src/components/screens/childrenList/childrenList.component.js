import React, { useEffect, useRef, useState } from "react";
import { ReactComponent as Unlink } from "../../../assets/img/unlink.svg";
import { ReactComponent as Delete } from "../../../assets/img/Delete.svg";
import { ReactComponent as Link } from "../../../assets/img/link.svg";
import Modal from "../../includes/modal/modal.component";
import UserForm from "./userForm.component";
import LinkAccount from "./linkAccount.component";
import Table from "../../includes/table/table.component"
import Footer from "../../includes/footer/footer.component";
import Alert from "../../includes/alert/alert.component"
import {
  getChildren,
  linkChildAccount,
  unlinkChildAccount,
  deleteChildAccount
} from "./../../../redux/actions/parentActions";
import { clearErrors } from "../../../redux/actions/errorActions";
import { clearSuccess } from "../../../redux/actions/successActions";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import './css/style.css';
// import { Children } from "react";

const Children = props => {
  const [currentActionUser, setCurrentActionUser] = useState({});
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [userForm, setUserForm] = useState({ type: 'Detail', show: false });
  const [usersAlert, setUsersAlert] = useState({
    show: false,
    message: "",
  });

  const EnrolledCourses = (props) => {
    const enrolledCourses = props.value;
    const courses = [];
    for (let i = 0; i < enrolledCourses.length; i++) {
      courses.push(enrolledCourses[i].courseId.name);
    }
    return courses.join(', ');
  }

  const headers = [
    { value: "fullName", text: "Name", align: "left" },
    { value: "enrolledCourses", text: "Classes", align: "left", wrapper: EnrolledCourses },
    { value: "email", text: "Email", align: "left" },
  ];

  const mounted = useRef();
  const { children, error, success, userId } = props;

  useEffect(() => {
    if (!mounted.current) {
      mounted.current = true;
      window.scrollTo(0, 0);
      props.getChildren();
    } else {
      if (error.id) {
        const message =
          typeof error.msg === "object" ? error.msg.join("<br/>") : error.msg;
        let alert_ = { type: "error", show: true, message };
        if (error.id === "LINK_CHILD_ACCOUNT_FAILURE") {
          setUsersAlert({ ...alert_ });
          setUserForm({ ...userForm, show: false });
          props.clearErrors();
        } else if (error.id === "UNLINK_CHILD_ACCOUNT_FAILURE") {
          const message =
            typeof error.msg === "object" ? error.msg.join("<br/>") : error.msg;
          setUsersAlert({ ...alert_ });
          props.clearErrors();
        } else if (error.id === "DELETE_CHILD_ACCOUNT_FAILURE") {
          const message =
            typeof error.msg === "object" ? error.msg.join("<br/>") : error.msg;
          setUsersAlert({ ...alert_ });
          props.clearErrors();
        }
        props.clearErrors();
      } else if (success.id) {
        let alert_ = { type: "success", show: true, message: success.msg };
        if (success.id === "LINK_CHILD_ACCOUNT_SUCCESS") {
          setUsersAlert({ ...alert_ });
          setUserForm({ ...userForm, show: false });
          props.clearSuccess();
        } else if (success.id === "UNLINK_CHILD_ACCOUNT_SUCCESS") {
          setUsersAlert({
            ...alert_,
          });
          props.clearSuccess();
        } else if (success.id === "DELETE_CHILD_ACCOUNT_SUCCESS") {
          setUsersAlert({
            ...alert_,
          });
          props.clearSuccess();
        }
        props.clearSuccess();
      }
    }
  })

  const unlinkAccount = () => {
    let message;
    if (selectedUsers.length < 1)
      message = 'No child is selected';
    else if (selectedUsers.length > 1)
      message = 'you can only unlink one account at a time'
    else {
      props.unlinkChildAccount({
        userId: selectedUsers[0].id,
        parentId: userId
      })
    }
    setUsersAlert({ type: "error", show: true, message });
  }

  const deleteAccount = () => {
    let message;
    if (selectedUsers.length < 1)
      message = 'No child is selected'
    else if (selectedUsers.length > 1)
      message = 'you can only delete one account at a time'
    else {
      props.deleteChildAccount({
        userId: selectedUsers[0].id,
        parentId: userId
      })
    }
    setUsersAlert({ type: "error", show: true, message });
  }

  const linkAccount = (email) => {
    if (!email) {
      setUsersAlert({ type: "error", show: true, message: 'Email is invalid' });
      setUserForm({...userForm, show:false});
    }
    else {
      props.linkChildAccount({
        email,
        parentId: userId
      })
    }
  }

  return (
    <span id="children">
      {userForm.type === 'Detail' && (
        <Modal
          id="child-detail-modal"
          show={userForm.show}
          onClose={() => {
            setUserForm({ ...userForm, show: false });
          }}
        >
          <UserForm
            user={currentActionUser}
          />
        </Modal>
      )}

      {userForm.type === 'Link' && (
        <Modal
          id="child-link-modal"
          show={userForm.show}
          onClose={() => {
            setUserForm({ ...userForm, show: false });
          }}
          removeCloseBtn
        >
          <LinkAccount
            user={currentActionUser}
            onCancel={() => {
              setUserForm({ ...userForm, show: false });
            }}
            onLinkAccount={linkAccount}
          />
        </Modal>
      )}


      <div id="childrenFirstSection" className="container-fluid relative">
        <div className="overlay"></div>
        <div className="row text-center">
          <h1 className="bold">My Child(ren)</h1>
        </div>
      </div>
      <div id="childrenSecondSection" className="container-fluid relative pt-1">
        <div className="d-flex justify-content-center">
          {usersAlert.show && (
            <Alert
              type={usersAlert.type}
              message={usersAlert.message}
              style={{ maxWidth: 500, flexGrow: 1 }}
              className="mt-3"
              onClose={() => {
                setUsersAlert({
                  show: false,
                  message: "",
                });
              }}
            />
          )}
        </div>
        <div
          className="d-flex justify-content-between pt-4 pb-4 flex-wrap"
          id='header-links'
        >
          <span onClick={unlinkAccount}>
            <Unlink style={{
              fill: '#AAA6A6',
              minWidth: '1.5em',
              maxWidth: '1.5em'
            }} />
            <span id='unlink'
              className='pointer ml-1 mr-2'>
              Unlink Account
            </span>
          </span>
          <span
            id='delete-icon'
            onClick={deleteAccount}
          >
            <Delete style={{
              minWidth: '1.5em',
              maxWidth: '1.5em'
            }} />
            <span id='delete'
              className='pointer ml-1 mr-2'>
              Delete
            </span>
          </span>
          <span onClick={() => { setUserForm({ type: 'Link', show: true }) }}>
            <Link style={{
              fill: '#AAA6A6',
              minWidth: '1.5em',
              maxWidth: '1.5em'
            }} />
            <span id='link' className='pointer ml-1'>
              Link Existing Account
              </span>
          </span>
        </div>
        <Table
          items={children}
          headers={headers}
          selectable
          action={<span>View</span>}
          onItemsSelected={(val) => {
            setSelectedUsers(val);
          }}
          onActionClicked={(item) => {
            setCurrentActionUser(item);
            setUserForm({ show: true, type: 'Detail' });
          }}
          actionName='More Details'
          actionAlignment='left'
        />
      </div>
      <Footer />
    </span>
  );
};

const mapStateToProps = (state) => ({
  children: state.parent.children,
  userId: state.auth.userId,
  error: state.error,
  success: state.success
});
export default connect(mapStateToProps,
  {
    getChildren,
    linkChildAccount,
    unlinkChildAccount,
    deleteChildAccount,
    clearErrors,
    clearSuccess,
  })(Children);