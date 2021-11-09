import API from "../../assets/js/api";
import { returnErrors } from "./errorActions";

import {
  GET_USER_STORIES_SUCCESS,
  GET_USER_STORIES_FAILURE,
  SUBMIT_AGENT_ENTRY_SUCCESS,
  SUBMIT_AGENT_ENTRY_FAILURE,
  USER_STORY_INPUT_CHANGE,
} from "./types";

export const getUserStories = () => async (dispatch) => {
  try {
    document.body.classList.add("loading-indicator");
    const result = await API.getUserStories();
    dispatch({
      type: GET_USER_STORIES_SUCCESS,
      payload: result.data.data.customerStories,
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
        "GET_USER_STORIES_FAILURE"
      )
    );
    dispatch({
      type: GET_USER_STORIES_FAILURE,
    });
  }
};
export const submitAgentEntry = (data) => async (dispatch) => {
  try {
    dispatch({
      type: USER_STORY_INPUT_CHANGE,
      payload: {
        name: "agentStoryLoading",
        value: true,
      },
    });
    await API.submitEntry(data);
    dispatch({
      type: SUBMIT_AGENT_ENTRY_SUCCESS,
    });
    dispatch({
      type: USER_STORY_INPUT_CHANGE,
      payload: {
        name: "agentStoryLoading",
        value: false,
      },
    });
    dispatch({
      type: USER_STORY_INPUT_CHANGE,
      payload: {
        name: "agentStoryStatus",
        value: "success",
      },
    });
  } catch (err) {
    dispatch({
      type: USER_STORY_INPUT_CHANGE,
      payload: {
        name: "agentStoryLoading",
        value: false,
      },
    });
    dispatch({
      type: USER_STORY_INPUT_CHANGE,
      payload: {
        name: "agentStoryStatus",
        value: "failed",
      },
    });
    dispatch(
      returnErrors(
        err.response.data.errors
          ? err.response.data.errors
          : err.response.data.error,
        err.response.data.status,
        "SUBMIT_AGENT_ENTRY_FAILURE"
      )
    );
    dispatch({
      type: SUBMIT_AGENT_ENTRY_FAILURE,
    });
  }
};
