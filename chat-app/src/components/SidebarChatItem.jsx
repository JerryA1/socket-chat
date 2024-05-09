import React, { useContext } from "react";
// context
import { ChatContext } from "../context/chat/ChatContext";
// types
import { types } from "../types/types";
// helpers
import { fetchWithToken } from "../helpers/fetch";
import { scroll2Bottom } from "../helpers/Scroll2Bottom";

// ----------------------------------------------------------------------

const SidebarChatItem = ({ user }) => {
  const { chatState, dispatch } = useContext(ChatContext);
  const { activeChat } = chatState;

  const onClick = async () => {
    dispatch({ type: types.activateChat, payload: user.uid });

    const resp = await fetchWithToken(`messages/${user.uid}`);

    dispatch({ type: types.loadMessages, payload: resp.meta.last30 });

    scroll2Bottom("messages");
  };

  return (
    <div
      className={`chat_list ${activeChat === user.uid && "active_chat"}`}
      onClick={onClick}
    >
      <div className="chat_people">
        <div className="chat_img">
          <img
            // src="https://ptetutorials.com/images/user-profile.png"
            src="https://p.kindpng.com/picc/s/78-786207_user-avatar-png-user-avatar-icon-png-transparent.png"
            alt="sunil"
          />
        </div>
        <div className="chat_ib">
          <h5>{user.name}</h5>
          {user.online ? (
            <span className="text-success">Online</span>
          ) : (
            <span className="text-danger">Offline</span>
          )}
        </div>
      </div>
    </div>
  );
};

export default SidebarChatItem;
