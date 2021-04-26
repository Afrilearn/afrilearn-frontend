import {
    GET_CHILDREN_SUCCESS,
    LINK_CHILD_ACCOUNT_SUCCESS,
    UNLINK_CHILD_ACCOUNT_SUCCESS,
    DELETE_CHILD_ACCOUNT_SUCCESS,
    INPUT_CHANGE
} from "../actions/types";

const initialState = {
    children: [],
    linkEmail: ""
};

const parentReducer = (state = initialState, action) => {
    let arr;
    switch (action.type) {
        case INPUT_CHANGE:
            return {
                ...state,
                [action.payload.name]: action.payload.value,
            };
        case GET_CHILDREN_SUCCESS:
            return {
                ...state,
                children: action.payload.children
            };
        case UNLINK_CHILD_ACCOUNT_SUCCESS:
            arr = state.children.slice();
            arr = arr.filter((child) => child._id !== action.payload);
            return {
                ...state,
                children: arr,
            };
        case DELETE_CHILD_ACCOUNT_SUCCESS:
            arr = state.children.slice();
            arr = arr.filter((child) => child._id !== action.payload);
            return {
                ...state,
                children: arr,
            };
        case LINK_CHILD_ACCOUNT_SUCCESS:
            arr = state.children.slice();
            arr.push(action.payload.user);
            return {
                ...state,
                children: arr,
            }
        default:
            return state;
    }
};
export default parentReducer;
