import React, { useContext } from "react";
// components
import SidebarChatItem from "./SidebarChatItem";
// context
import { ChatContext } from "../context/chat/ChatContext";
import { AuthContext } from "../auth/AuthContext";

// ----------------------------------------------------------------------

const SideBar = () => {
  const { chatState } = useContext(ChatContext);
  const { auth } = useContext(AuthContext);

  return (
    <div className="inbox_chat">
      {chatState.users
        .filter((user) => user.uid !== auth.uid)
        .map((_user) => (
          <SidebarChatItem key={_user.uid} user={_user} />
        ))}

      {/* <!-- Espacio extra para scroll --> */}
      <div className="extra_space"></div>
    </div>
  );
};

export default SideBar;
