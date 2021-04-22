import React, { useEffect, useState } from 'react';
import './css/style.css';

const UserForm = props => {
    const [showCopied, setshowCopied] = useState(false);
    const { user } = props;

    const copyText = () => {
        navigator.clipboard.writeText('password')
        setshowCopied(!showCopied);
        setTimeout(() => { setshowCopied(showCopied) }, 700);
    }

    return (
        <div className="child-detail" style={{paddingLeft: '1rem'}}>
            <h3 style={{ marginBottom: 30, marginTop: 30 }} className='font4'>
                Other Details
                    </h3>
            <p><label>Email:</label>
                {user.email}
            </p>
            <p><label>Password:</label>
                                Pa1222222222sss34
                                <span style={{ position: 'relative', marginLeft: 40 }}>
                    <span
                        style={{
                            display: showCopied ? 'block' : 'none',
                            position: 'absolute',
                            top: '-37px',
                            left: '-8px',
                            padding: '4px 8px',
                            backgroundColor: 'white',
                            borderRadius: 8,
                            border: '1px solid #FF5B5B'
                        }}>
                        Copied!
                    </span>
                    <span id="copy-link" onClick={copyText}>
                        COPY
                    </span>
                </span>
            </p>
            <h5>JSS1</h5>
            <p><label>Subscription:</label>
                <span>Yearly</span>
            </p>
            <p><label>Expiration Date:</label>
                <span>April 16, 2022</span>
            </p>
            <h5>JSS2</h5>
            <p><label>Subscription:</label>
                <span style={{color: '#FF5B5B'}}>Not Subscribed</span>
            </p>
        </div>
    )
}

export default UserForm;