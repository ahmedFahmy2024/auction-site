import React from 'react';

const ChatMessage = React.memo(
  ({ message, timePassed, selectedChat }) => {
    const isOwner = message.user_id === selectedChat;
    return (
      <div className={`chat-msg ${isOwner ? "owner" : "user"}`}>
        <div className="chat-msg-profile">
          <img className="chat-msg-img" src={message.user_profile_image} alt="" />
          <div className="chat-msg-date">{timePassed(message.created_at)}</div>
        </div>
        <div className="chat-msg-content">
          <div className="chat-msg-text">{message.message}</div>
        </div>
      </div>
    );
  },
  (prevProps, nextProps) => {
    // Custom comparison logic
    return (
      prevProps.message.id === nextProps.message.id &&
      prevProps.message.message === nextProps.message.message &&
      prevProps.message.user_profile_image === nextProps.message.user_profile_image &&
      prevProps.timePassed === nextProps.timePassed &&
      prevProps.selectedChat === nextProps.selectedChat
    );
  }
);

export default ChatMessage;
