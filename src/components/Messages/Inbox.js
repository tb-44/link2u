import Navbar from "../NavBar/Navbar";
import React, { Component } from "react";
import "./Inbox.css";
import { connect } from "react-redux";
import { fetchConversations, postMessage } from "../../Actions/action_messages";
import { userConstants } from "../../constants";
import PostJobNav from "../PostJobs/PostJobNav";

class Inbox extends Component {
  state = {
    currentConversation: null,
    messageDraft: "",
  };
  componentWillMount() {
    this.props.fetchConversations();
  }

  componentWillReceiveProps(nextProps) {
    if (!this.state.currentConversation) {
      this.setState({ currentConversation: nextProps.conversations[0] });
    } else {
      nextProps.conversations.forEach((conversation) => {
        console.log(this.state.currentConversation);
        let user1 =
          this.state.currentConversation.user1.username ===
          conversation.user1.username;
        let user2 =
          this.state.currentConversation.user2.username ===
          conversation.user2.username;
        console.log(user1, user2);

        if (user1 && user2) {
          this.setState({
            currentConversation: conversation,
            messageDraft: "",
          });
        }
      });
    }
  }

  render() {
    let role = localStorage.getItem("role");
    return (
      <div className="user-inbox">
        {role && role === "R" ? <PostJobNav /> : <Navbar />}
        <div className="content">
          <div className="master">
            <div className="master-header">
              <h4 className="t-16 t-black t-normal">Messaging</h4>
            </div>
            <div className="master-content">{this.renderMessageList()}</div>
          </div>
          <div className="detail">{this.renderConversations()}</div>
        </div>
      </div>
    );
  }

  renderMessageList() {
    let conversations = [];
    let user = JSON.parse(localStorage.getItem(userConstants.USER_DETAILS));
    if (this.props.conversations && this.props.conversations.length > 0) {
      this.props.conversations.forEach((conversation) => {
        let sender =
          user.email === conversation.user1.username
            ? conversation.user2
            : conversation.user1;
        conversations.push(
          <div
            className="message"
            key={conversation._id}
            onClick={this.viewConversation.bind(this, conversation)}
          >
            <img alt="" src="/images/avatar.png" />
            <h5 className="t-14 t-black-light t-normal">
              {sender.firstname + " " + sender.lastname}
            </h5>
          </div>
        );
      });
      return conversations;
    } else {
      return (
        <div className="conversation content-ctr">
          <h4 className="t-14 t-black t-normal">No Messages Yet !</h4>
        </div>
      );
    }
  }

  viewConversation(conversation) {
    this.setState({ currentConversation: conversation });
  }

  renderConversations() {
    let headerName = "";
    let user = JSON.parse(localStorage.getItem(userConstants.USER_DETAILS));
    if (this.state.currentConversation) {
      let sender =
        user.email === this.state.currentConversation.user1.username
          ? this.state.currentConversation.user2
          : this.state.currentConversation.user1;
      headerName = sender.firstname + " " + sender.lastname;
      return (
        <div className="conversation">
          <div className="conversation-list">
            <div className="conversation-header">
              <img
                alt=""
                src="/images/avatar.png"
                style={{ width: "40px", height: "40px" }}
              />
              <h6 className="t-14 t-black-light t-normal">{headerName}</h6>
            </div>
            <div className="conversation-content">
              {this.renderMessage()}
              <div
                style={{ float: "left", clear: "both" }}
                ref={(el) => {
                  this.messagesEnd = el;
                }}
              ></div>
            </div>
          </div>
          <div className="input-message">
            <textarea
              rows="6"
              cols="40"
              required
              maxLength="10000"
              className="form-control"
              value={this.state.messageDraft}
              onChange={(event) => {
                this.setState({ messageDraft: event.target.value });
              }}
              name="message"
              placeholder="Enter Message"
            ></textarea>
            <button
              className="btn arteco-btn"
              onClick={this.sendMessage.bind(this)}
            >
              Send
            </button>
          </div>
        </div>
      );
    } else {
      return (
        <div className="conversation content-ctr">
          <h4 className="t-14 t-black t-normal">No Messages Yet !</h4>
        </div>
      );
    }
  }

  scrollToBottom = () => {
    if (this.messagesEnd) {
      this.messagesEnd.scrollIntoView({ behavior: "smooth" });
    }
  };

  componentDidUpdate() {
    this.scrollToBottom();
  }

  renderMessage() {
    let messages = [];
    let user = JSON.parse(localStorage.getItem(userConstants.USER_DETAILS));
    if (this.state.currentConversation) {
      this.state.currentConversation.messages.forEach((message) => {
        messages.push(
          <div key={message._id} className="message-container">
            <p
              className={
                user.email === message.from
                  ? "message-content from-bubble"
                  : "message-content to-bubble"
              }
            >
              {message.message}
            </p>
          </div>
        );
      });
    }
    return messages;
  }

  sendMessage() {
    if (this.state.messageDraft.trim().length > 0) {
      let user = JSON.parse(localStorage.getItem(userConstants.USER_DETAILS));
      let sender =
        user.email === this.state.currentConversation.user1.username
          ? this.state.currentConversation.user2
          : this.state.currentConversation.user1;
      let messageDetails = {
        receiver: {
          username: sender.username,
          firstname: sender.firstname,
          lastname: sender.lastname,
        },
        message: this.state.messageDraft,
      };
      this.props.postMessage(messageDetails);
    }
  }
}

function mapStateToProps(reduxState) {
  const { conversations } = reduxState.conversations;
  return { conversations };
}

export default connect(mapStateToProps, { fetchConversations, postMessage })(
  Inbox
);
