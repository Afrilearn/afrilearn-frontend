import API from "../../assets/js/api";
import { returnErrors } from "./errorActions";
import { returnSuccess } from "./successActions"

import {
    GET_CHILDREN_SUCCESS,
    GET_CHILDREN_FAILURE,
    UNLINK_CHILD_ACCOUNT_SUCCESS,
    UNLINK_CHILD_ACCOUNT_FAILURE,
    LINK_CHILD_ACCOUNT_SUCCESS,
    LINK_CHILD_ACCOUNT_FAILURE,
    DELETE_CHILD_ACCOUNT_SUCCESS,
    DELETE_CHILD_ACCOUNT_FAILURE,
    INPUT_CHANGE
} from "./types";

const dispatchError = (dispatch, err, id) => {
    dispatch(
        returnErrors(
            err.response.data.errors
                ? err.response.data.errors
                : err.response.data.error,
            err.response.data.status,
            id
        )
    );
};
const dispatchSuccess = (dispatch, message, id) => {
    dispatch(returnSuccess(message, id));
};

export const inputChange = (name, value) => (dispatch) => {
    dispatch({ type: INPUT_CHANGE, payload: { name, value } });
};

export const getChildren = () => async (
    dispatch
) => {
    try {
        document.body.classList.add("loading-indicator");
        const result = await API.getChildren();

        dispatch({
            type: GET_CHILDREN_SUCCESS,
            payload: {
                children: result.data.data.children
            },
        });

        document.body.classList.remove("loading-indicator");
    } catch (err) {
        document.body.classList.remove("loading-indicator");
        dispatch(
            returnErrors(
                err.response.data.errors
                    ? err.response.data.errors
                    : err.response.data.error,
                err.response.data.status,
                "GET_CHILDREN_FAILURE"
            )
        );
        dispatch({
            type: GET_CHILDREN_FAILURE,
        });
    }
};

export const linkChildAccount = (data) => async (
    dispatch
) => {
    try {
        document.body.classList.add("loading-indicator");
        const result = await API.linkChildAccount(data);

        dispatch({
            type: LINK_CHILD_ACCOUNT_SUCCESS, payload: result.data.data,
        });
        dispatchSuccess(
            dispatch,
            'Child account linked successfully',
            LINK_CHILD_ACCOUNT_SUCCESS
        );
        document.body.classList.remove("loading-indicator");
    } catch (err) {
        document.body.classList.remove("loading-indicator");
        dispatchError(dispatch, err, LINK_CHILD_ACCOUNT_FAILURE);
    }
};

export const unlinkChildAccount = (data) => async (
    dispatch
) => {
    try {
        document.body.classList.add("loading-indicator");
        const result = await API.unlinkChildAccount(data);

        dispatch({
            type: UNLINK_CHILD_ACCOUNT_SUCCESS, payload: data.userId,
        });
        dispatchSuccess(
            dispatch,
            'Child account unlinked successfully',
            UNLINK_CHILD_ACCOUNT_SUCCESS
        );
        document.body.classList.remove("loading-indicator");
    } catch (err) {
        document.body.classList.remove("loading-indicator");
        dispatchError(dispatch, err, UNLINK_CHILD_ACCOUNT_FAILURE);
    }
};

export const deleteChildAccount = (data) => async (
    dispatch
) => {
    try {
        document.body.classList.add("loading-indicator");
        const result = await API.deleteChildAccount(data);

        dispatch({
            type: DELETE_CHILD_ACCOUNT_SUCCESS, payload: data.userId,
        });
        dispatchSuccess(
            dispatch,
            'Child account deleted successfully',
            DELETE_CHILD_ACCOUNT_SUCCESS
        );
        document.body.classList.remove("loading-indicator");
    } catch (err) {
        document.body.classList.remove("loading-indicator");
        dispatchError(dispatch, err, DELETE_CHILD_ACCOUNT_FAILURE);
    }
};

