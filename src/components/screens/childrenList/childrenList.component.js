import React, { useEffect, useRef, useState } from "react";
import { ReactComponent as Unlink } from "../../../assets/img/unlink.svg";
import { ReactComponent as Delete } from "../../../assets/img/Delete.svg";
import { ReactComponent as Link } from "../../../assets/img/link.svg";
import Modal from "../../includes/modal/modal.component";
import UserForm from "./userForm.component";
import LinkAccount from "./linkAccount.component";
import Table from "../../includes/table/table.component"
import Footer from "../../includes/footer/footer.component";
import { getRoles } from "./../../../redux/actions/authActions";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import './css/style.css';

const About = props => {
  const [currentActionUser, setCurrentActionUser] = useState({});
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [userForm, setUserForm] = useState({ type: 'Detail', show: false });
  const headers = [
    { value: "name", text: "Name", align: "left" },
    { value: "classes", text: "Classes", align: "left" },
    { value: "email", text: "Email", align: "left" },
  ];
  const [items, setItems] = useState([
    {
      "name": "Johnson Adewunigbe",
      "classes": ['JSS1, JSS2'],
      "email": "johnsonA@gmail.com"
    },
    {
      "name": "Olatunbosun Adewunigbe",
      "classes": ['SS3'],
      "email": "olatunbosunA@gmail.com"
    },
  ]);
  const mounted = useRef();
  const {
    classes
  } = props;
  useEffect(() => {
    if (!mounted.current) {
      // do componentDidMount logic
      mounted.current = true;
      window.scrollTo(0, 0);
      if (!classes.length) {
        props.getRoles();
      }
    } else {
      // do componentDidUpdate logic          
    }
  })

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
        >
          <LinkAccount
            user={currentActionUser}
            onCancel={() => {
              setUserForm({ ...userForm, show: false });
            }}
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
        <div
          className="d-flex justify-content-between pt-4 pb-4 flex-wrap"
          id='header-links'
        >
          <span>
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
          <span id='delete-icon'>
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
          items={items}
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

About.propTypes = {
  getRoles: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  classes: state.auth.classes
});
export default connect(mapStateToProps, { getRoles })(About);