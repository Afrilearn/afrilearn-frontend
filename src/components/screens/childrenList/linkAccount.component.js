import React, { useEffect, useState } from 'react';
import { connect } from "react-redux";
import { inputChange } from "../../../redux/actions/parentActions"
import './css/style.css';

const UserForm = props => {
    const { linkEmail } = props;

    const handleInput = (e) => {
        props.inputChange(e.target.name, e.target.value);
    };

    return (
        <div className="child-detail">
            <h3 style={{ marginBottom: 30, marginTop: 30 }} className='font2'>
                Link Existing Account
                    </h3>
            <p style={{ color: '#AAA6A6' }}>Enter email of an existing student account to send linking request</p>
            <label style={{ color: '#84BB29' }} className='mb-4'>EMAIL</label>
            <input
                type='text'
                name='linkEmail'
                value={linkEmail}
                onChange={handleInput}
                style={{
                    width: '100%',
                    borderRadius: '8px',
                    border: '1px solid rgba(86, 103, 137, 0.26)',
                    padding: '8px 16px'
                }}
                className='mb-3'
            />
            <div className='d-flex justify-content-between mt-3 mb-3'>
                <button id='cancel' style={{ width: '48%' }} 
                onClick={() => props.onCancel()}>
                    Cancel
                </button>
                <button id='send-request' style={{ width: '48%' }} 
                onClick={() => props.onLinkAccount(linkEmail)}
                >
                    Send Request
                </button>
            </div>
        </div>
    )
}
const mapStateToProps = (state) => ({
    linkEmail: state.parent.linkEmail
})

export default connect(mapStateToProps, { inputChange })(UserForm);