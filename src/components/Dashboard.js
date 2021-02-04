import React from "react";
import Navbar from "./Navbar";
import { useConversations } from "../contexts/ConversationsProvider";
import OpenConversation from "./OpenConversation";

export default function Dashboard({ username }) {
  const { selectedConversationIndex } = useConversations();

  return (
    <div
      className="dashboard-wrapper"
      style={{
        height: "100vh",
        width: "100vw",
        margin: "0",
        display: "flex",
        flexFlow: "row no-wrap",
      }}
    >
      <Navbar username={username} />
      {selectedConversationIndex !== null ? (
        <OpenConversation username={username} />
      ) : null}
    </div>
  );
}
