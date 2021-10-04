import API from "../../assets/js/api";
import { returnErrors } from "./errorActions";

import {
  PAYMENT_INPUT_CHANGE,
  GET_PAYMENT_PLANS_SUCCESS,
  GET_PAYMENT_PLANS_FAILURE,
  PAYMENT_VERIFICATION_SUCCESS,
  PAYMENT_VERIFICATION_FAILURE,
  GET_TEACHER_PAYMENT_PLANS_SUCCESS,
  GET_TEACHER_PAYMENT_PLANS_FAILURE,
} from "./types";

export const inputChange = (name, value) => async (dispatch) => {
  try {
    dispatch({
      type: PAYMENT_INPUT_CHANGE,
      payload: {
        name: name,
        value: value,
      },
    });
  } catch (error) {
    console.error(error);
  }
};
export const paymentPlans = () => async (dispatch, getState) => {
  try {
    document.body.classList.add("loading-indicator");
    const result = await API.getPaymentPlans();
    let plan = result.data.paymentPlans;
    dispatch({
      type: GET_PAYMENT_PLANS_SUCCESS,
      payload: plan,
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
        "GET_PAYMENT_PLANS_FAILURE"
      )
    );
    dispatch({
      type: GET_PAYMENT_PLANS_FAILURE,
    });
  }
};
export const getTeacherPaymentPlans = () => async (dispatch, getState) => {
  try {
    document.body.classList.add("loading-indicator");
    const result = await API.getTeacherPaymentPlans();
    let plan = result.data.paymentPlans;
    dispatch({
      type: GET_TEACHER_PAYMENT_PLANS_SUCCESS,
      payload: plan,
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
        "GET_TEACHER_PAYMENT_PLANS_FAILURE"
      )
    );
    dispatch({
      type: GET_TEACHER_PAYMENT_PLANS_FAILURE,
    });
  }
};
export const verifyPayStackPayment = (data) => async (dispatch) => {
  try {
    document.body.classList.add("loading-indicator");
    const result = await API.verifyPayStackPayment(data);

    dispatch({
      type: PAYMENT_VERIFICATION_SUCCESS,
      payload: result.data.data.verified,
    });
    document.body.classList.remove("loading-indicator");
    console.log(result.data.data.verified);
    if (result.data.data.verified === true) {
      dispatch(
        returnErrors(
          "Payment verified successfully",
          "200",
          "PAYMENT_VERIFICATION_SUCCESS"
        )
      );
    } else {
      dispatch(
        returnErrors(
          "Error verifying payment",
          "200",
          "PAYMENT_VERIFICATION_SUCCESS"
        )
      );
    }
  } catch (err) {
    document.body.classList.remove("loading-indicator");
    dispatch(
      returnErrors(
        err.response.data.errors
          ? err.response.data.errors
          : err.response.data.error,
        err.response.data.status,
        "PAYMENT_VERIFICATION_FAILURE"
      )
    );
    dispatch({
      type: PAYMENT_VERIFICATION_FAILURE,
    });
  }
};
