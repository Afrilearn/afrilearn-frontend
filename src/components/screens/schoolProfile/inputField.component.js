import React, {useEffect} from 'react';
import './css/style.css';

const InputField = (props) => {
    useEffect(() => {
        if(props.showLabel) {
            document.getElementById(props.labelId).innerHTML = props.labelName
        }
    })
    
    const handleOnInput = () => {
        if(props.labelId) document.getElementById(props.labelId).innerHTML = props.labelName
        if(props.placeholderId) document.getElementById(props.placeholderId).classList.add('removePlaceholder');
    }
    return (
        <div className='pb-5'>
            <label id={props.labelId}></label>
            <input type='text'
                id={props.placeholderId}
                placeholder={props.placeholder}
                onFocus={handleOnInput}
                onChange={props.onChange}
                value={props.value}
            >
            </input>
        </div>
    )
}

export default InputField;