import React, { useEffect, useState } from 'react';
import './css/style.css';

const UserForm = props => {
    const { user } = props;

    return (
        <div className="child-detail">
            <h3 style={{ marginBottom: 30, marginTop: 30 }} className='font4'>
                Link Existing Account
                    </h3>
            <p style={{color:'#AAA6A6'}}>Enter email of an existing student account to send linking request</p>
            <label style={{color:'#26AA76'}} className='mb-4'>EMAIL</label>
            <input type='text' name='email'
            style={{
                width:'100%', 
                borderRadius:'8px', 
                border: '1px solid rgba(86, 103, 137, 0.26)',
                padding: '8px 8px'
            }}
            className='mb-3'
            />
            <div className='d-flex justify-content-between mt-3 mb-3'>
                <button id='cancel' style={{width: '45%'}} onClick={() => props.onCancel()}>Cancel</button>
                <button id='send-request' style={{width: '45%'}}>Send Request</button>
            </div>
        </div>
    )
}

export default UserForm;