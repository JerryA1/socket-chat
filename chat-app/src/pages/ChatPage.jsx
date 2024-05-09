import React, { useContext } from "react";
import "../css/chat.css";
// components
import InboxPeople from "../components/InboxPeople";
import Messages from "../components/Messages";
import ChatSelect from "../components/ChatSelect";
// context
import { ChatContext } from "../context/chat/ChatContext";

// ----------------------------------------------------------------------

const ChatPage = () => {
  const { chatState } = useContext(ChatContext);

  return (
    <div className="messaging">
      <div className="inbox_msg">
        <InboxPeople />

        {chatState.activeChat ? <Messages /> : <ChatSelect />}
      </div>
    </div>
  );
};

export default ChatPage;
