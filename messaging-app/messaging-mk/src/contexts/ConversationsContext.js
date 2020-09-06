import React, { useContext, useState } from "react";
import useLocalStorage from "../custom-hooks/useLocalStorage";
import { useContacts } from "./ContactsContext";

const ConversationsContext = React.createContext();

export function useConversations() {
  return useContext(ConversationsContext);
}

export function ConversationsProvider({ children }) {
  const [conversations, setConversations] = useLocalStorage(
    "conversations",
    []
  );

  const [selectedConversationIndex, setSelectedConversationIndex] = useState(0);

  const { contacts } = useContacts();

  const createConversations = (recipients) => {
    setConversations((prev) => {
      return [...prev, { recipients, messages: [] }];
    });
  };

  const formattedConversations = conversations.map((cn, index) => {
    const recipients = cn.recipients.map((r) => {
      const contact = contacts.find((c) => c.id === r);

      const name = (contact && contact.name) || r;
      return { id: r, name };
    });

    const selected = index === selectedConversationIndex;
    return { ...cn, recipients, selected };
  });

  const value = {
    conversations: formattedConversations,
    selectedConversation: formattedConversations[selectedConversationIndex],
    selectedConversationIndex: setSelectedConversationIndex,
    createConversations,
  };

  return (
    <ConversationsContext.Provider value={value}>
      {children}
    </ConversationsContext.Provider>
  );
}
