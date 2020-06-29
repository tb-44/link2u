import AxiosService from "./AxiosService";
import URI from "../constants/URI";

export default class WebService extends AxiosService {
  static getInstance() {
    if (WebService.instance == null) {
      WebService.instance = new WebService();
    }
    return this.instance;
  }

  /**
   * Get Conversations - Api call
   * Takes success and failure operations
   */
  getConversations(success, failure) {
    this.getCall(URI.GET_CONVERSATIONS, success, failure, true);
  }

  /**
   * Post Message - Api call
   * Takes success and failure operations
   */
  sendMessage(details, success, failure) {
    this.postCall(URI.SEND_MESSAGE, details, success, failure, true);
  }
}
