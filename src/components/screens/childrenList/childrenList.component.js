import React, { useEffect, useRef, useState } from 'react'
import { ReactComponent as Unlink } from '../../../assets/img/unlink.svg'
import { ReactComponent as Delete } from '../../../assets/img/Delete.svg'
import { ReactComponent as Link } from '../../../assets/img/link.svg'
import Modal from '../../includes/modal/modal.component'
import UserForm from './userForm.component'
import LinkAccount from './linkAccount.component'
import Table from '../../includes/table/table.component'
import Footer from '../../includes/footer/footer.component'
import Swal from 'sweetalert2'
import 'animate.css'
import {
  getChildren,
  linkChildAccount,
  unlinkChildAccount,
  unlinkChildrenAccounts,
  deleteChildAccount,
  deleteChildrenAccounts
} from './../../../redux/actions/parentActions'
import { clearErrors } from '../../../redux/actions/errorActions'
import { clearSuccess } from '../../../redux/actions/successActions'
import { connect } from 'react-redux'
import './css/style.css'

const Children = props => {
  const [currentActionUser, setCurrentActionUser] = useState({})
  const [selectedUsers, setSelectedUsers] = useState([])
  const [userForm, setUserForm] = useState({ type: 'Detail', show: false })

  const EnrolledCourses = props => {
    const enrolledCourses = props.value
    const courses = []
    for (let i = 0; i < enrolledCourses.length; i++) {
      courses.push(enrolledCourses[i].courseId.name)
    }
    return courses.join(', ')
  }

  const headers = [
    { value: 'fullName', text: 'Name', align: 'left' },
    {
      value: 'enrolledCourses',
      text: 'Classes',
      align: 'left',
      wrapper: EnrolledCourses
    },
    { value: 'email', text: 'Email', align: 'left' }
  ]

  const mounted = useRef()
  const { children, error, success, userId } = props

  useEffect(() => {
    if (!mounted.current) {
      mounted.current = true
      window.scrollTo(0, 0)
      props.getChildren()
    } else {
      if (error.id) {
        const message =
          typeof error.msg === 'object' ? error.msg.join('<br/>') : error.msg
        if (error.id.includes('SUCCESS') && !error.id.includes('GET')) {
          if (message) {
            Swal.fire({
              html: message,
              icon: 'success',
              showClass: {
                popup: 'animate__animated animate__fadeInDown'
              },
              hideClass: {
                popup: 'animate__animated animate__fadeOutUp'
              },
              timer: 3500
            })
            props.clearErrors()
          }
        } else if (!error.id.includes('GET')) {
          if (message) {
            Swal.fire({
              html: message,
              showClass: {
                popup: 'animate__animated animate__fadeInDown'
              },
              hideClass: {
                popup: 'animate__animated animate__fadeOutUp'
              },
              timer: 3500
            })
            props.clearErrors()
          }
        }
        if (error.id === 'LINK_CHILD_ACCOUNT_SUCCESS')
          setUserForm({ ...userForm, show: false })
        props.clearErrors()
      }
    }
  })

  const unlinkAccount = () => {
    if (selectedUsers.length < 1) {
      Swal.fire({
        html: 'No child is selected',
        showClass: {
          popup: 'animate__animated animate__fadeInDown'
        },
        hideClass: {
          popup: 'animate__animated animate__fadeOutUp'
        },
        timer: 3500
      })
    }

    else {
      Swal.fire({
        title: 'Are you sure?',
        text: selectedUsers.length > 1 ?
          'Do you want to unlink these accounts?'
          : 'Do you want to unlink this account?',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Yes',
        cancelButtonText: 'Cancel',
        dangerMode: true,
      })
        .then((result) => {
          if (result.value) {
            const childrenIds = selectedUsers.map(user => user._id)
            selectedUsers.length > 1 ?
              props.unlinkChildrenAccounts({ childrenIds, parentId: userId })
              : props.unlinkChildAccount({ userId: selectedUsers[0].id, parentId: userId })
          } else if (result.dismiss === Swal.DismissReason.cancel) {
            Swal.close();
          }
        });
    }
  }

  const deleteAccount = () => {
    if (selectedUsers.length < 1) {
      Swal.fire({
        html: 'No child is selected',
        showClass: {
          popup: 'animate__animated animate__fadeInDown'
        },
        hideClass: {
          popup: 'animate__animated animate__fadeOutUp'
        },
        timer: 3500
      })
    }

    else {
      Swal.fire({
        title: 'Are you sure?',
        text: selectedUsers.length > 1 ?
          'Do you want to delete these accounts?'
          : 'Do you want to delete this account?',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Yes',
        cancelButtonText: 'Cancel',
        dangerMode: true,
      })
        .then((result) => {
          if (result.value) {
            const childrenIds = selectedUsers.map(user => user._id)
            selectedUsers.length > 1 ?
              props.deleteChildrenAccounts({ childrenIds, parentId: userId })
              : props.deleteChildAccount({
                userId: selectedUsers[0].id, parentId: userId
              })
          } else if (result.dismiss === Swal.DismissReason.cancel) {
            Swal.close();
          }
        });
    }
  }

  const linkAccount = email => {
    if (!email) {
      Swal.fire({
        html: 'Email is invalid',
        showClass: {
          popup: 'animate__animated animate__fadeInDown'
        },
        hideClass: {
          popup: 'animate__animated animate__fadeOutUp'
        },
        timer: 3500
      })
    } else {
      props.linkChildAccount({
        email,
        parentId: userId
      })
    }
  }

  return (
    <span id='children'>
      {userForm.type === 'Detail' && (
        <Modal
          id='child-detail-modal'
          show={userForm.show}
          onClose={() => {
            setUserForm({ ...userForm, show: false })
          }}
        >
          <UserForm user={currentActionUser} />
        </Modal>
      )}

      {userForm.type === 'Link' && (
        <Modal
          id='child-link-modal'
          show={userForm.show}
          onClose={() => {
            setUserForm({ ...userForm, show: false })
          }}
          removeCloseBtn
        >
          <LinkAccount
            user={currentActionUser}
            onCancel={() => {
              setUserForm({ ...userForm, show: false })
            }}
            onLinkAccount={linkAccount}
          />
        </Modal>
      )}

      <div id='childrenFirstSection' className='container-fluid relative'>
        <div className='overlay'></div>
        <div className='row text-center'>
          <h1 className='bold'>My Child(ren)</h1>
        </div>
      </div>
      <div id='childrenSecondSection' className='container-fluid relative pt-1'>
        <div
          className='d-flex justify-content-between pt-4 pb-4 flex-wrap'
          id='header-links'
        >
          <span onClick={unlinkAccount}>
            <Unlink
              style={{
                fill: '#AAA6A6',
                minWidth: '1.5em',
                maxWidth: '1.5em'
              }}
              className='pointer'
            />
            <span id='unlink' className='pointer ml-1 mr-2'>
              Unlink Account
            </span>
          </span>
          <span id='delete-icon' onClick={deleteAccount}>
            <Delete
              style={{
                minWidth: '1.5em',
                maxWidth: '1.5em'
              }}
              className='pointer'
            />
            <span id='delete' className='pointer ml-1 mr-2'>
              Delete
            </span>
          </span>
          <span
            onClick={() => {
              setUserForm({ type: 'Link', show: true })
            }}
          >
            <Link
              style={{
                fill: '#AAA6A6',
                minWidth: '1.5em',
                maxWidth: '1.5em'
              }}
              className='pointer'
            />
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
          onItemsSelected={val => {
            setSelectedUsers(val)
          }}
          onActionClicked={item => {
            setCurrentActionUser(item)
            setUserForm({ show: true, type: 'Detail' })
          }}
          actionName='More Details'
          actionAlignment='left'
        />
      </div>
      <Footer />
    </span>
  )
}

const mapStateToProps = state => ({
  children: state.parent.children,
  userId: state.auth.userId,
  error: state.error,
  success: state.success
})
export default connect(mapStateToProps, {
  getChildren,
  linkChildAccount,
  unlinkChildAccount,
  unlinkChildrenAccounts,
  deleteChildAccount,
  deleteChildrenAccounts,
  clearErrors,
  clearSuccess
})(Children)
