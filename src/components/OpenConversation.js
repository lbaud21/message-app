import React, { useState, useCallback } from "react";
import { useConversations } from "../contexts/ConversationsProvider";
import "../styles/OpenConversation.css";

export default function OpenConversation({ username }) {
  const [text, setText] = useState("");
  const { addMessage } = useConversations();
  const { selectedConversationIndex } = useConversations();
  const { conversations } = useConversations();

  const lastMessageRef = useCallback((node) => {
    if (node) {
      node.scrollIntoView({ behavior: "smooth" });
    }
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    addMessage(selectedConversationIndex, text, username);
    setText("");
  };

  const handleChange = (e) => {
    setText(e.target.value);
  };

  return (
    <div className="conversation-container">
      <div className="messages-container">
        {conversations[selectedConversationIndex].messages.map(
          (message, index) => {
            const lastMessage =
              conversations[selectedConversationIndex].messages.length - 1 ===
              index;
            return (
              <div
                ref={lastMessage ? lastMessageRef : null}
                className="single-message-container"
                style={
                  message.sender === username
                    ? { alignSelf: "flex-end", backgroundColor: "lightblue" }
                    : { alignSelf: "flex-start", backgroundColor: "lightgreen" }
                }
              >
                <div className="message-text">{message.text}</div>
                <div className="message-sender">
                  {message.sender === username ? "you" : message.sender}
                </div>
              </div>
            );
          }
        )}
      </div>

      <form>
        <textarea
          value={text}
          onChange={handleChange}
          style={{ height: "100%", margin: "0" }}
        ></textarea>
        <button onClick={handleSubmit}>Send</button>
      </form>
    </div>
  );
}
