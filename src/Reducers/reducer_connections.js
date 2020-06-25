import { userConstants } from "../constants";

export function ConnectionsReducer(state = {}, action) {
  switch (action.type) {
    case userConstants.MAKE_CONNECTION_REQUEST:
      return action.payload;
    case userConstants.GET_ALL_CONNECTIONS:
      return action.payload;
    case userConstants.CONNECTION_RESPONSE:
      return action.payload;
    case userConstants.SEARCH_PEOPLE:
      return action.payload;
    default:
      return state;
  }
}
