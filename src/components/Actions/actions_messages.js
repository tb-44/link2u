import WebService from "../services/WebService";
import AppActions from "../constants/AppActions";

export function fetchConversations() {
  return (dispatch) => {
    WebService.getInstance().getConversations(
      (response) => {
        console.log(response);
        if (response.success) {
          dispatch(fetchConversationSuccess(response));
        } else {
          dispatch(fetchConversationFailure(response.message));
        }
      },
      (error) => {
        console.log(error);
        dispatch(fetchConversationFailure(error));
      }
    );
  };
}

export function postMessage(messageDetails) {
  console.log(messageDetails);
  return (dispatch) => {
    WebService.getInstance().sendMessage(
      messageDetails,
      (response) => {
        console.log(response);
        if (response.success) {
          WebService.getInstance().getConversations(
            (response) => {
              console.log(response);
              if (response.success) {
                dispatch(fetchConversationSuccess(response));
              } else {
                dispatch(fetchConversationFailure(response.message));
              }
            },
            (error) => {
              console.log(error);
              dispatch(fetchConversationFailure(error));
            }
          );
        } else {
          // dispatch(fetchConversationFailure(response.message));
        }
      },
      (error) => {
        console.log(error);
        dispatch(fetchConversationFailure(error));
      }
    );
  };
}

const fetchConversationSuccess = (response) => ({
  type: AppActions.FETCH_CONVERSATIONS_SUCCESS,
  payload: response,
});

const fetchConversationFailure = (response) => ({
  type: AppActions.FETCH_CONVERSATIONS_FAILURE,
  payload: response,
});
