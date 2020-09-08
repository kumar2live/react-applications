import React, { useState } from "react";
import { useConversations } from "../contexts/ConversationsContext";
import { ListGroup } from "react-bootstrap";

export default function Conversations() {
  const { conversations, selectedConversationIndex } = useConversations();

  return (
    <div>
      <ListGroup variant="flush">
        {conversations.map((c, index) => {
          return (
            <ListGroup.Item key={index} action active={c.selected} onClick={() => selectedConversationIndex(index)}>
              {c.recipients.map((r) => r.name).join(", ")}
            </ListGroup.Item>
          );
        })}
      </ListGroup>
    </div>
  );
}
