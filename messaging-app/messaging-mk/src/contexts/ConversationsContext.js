import React, { useContext, useState, useEffect, useCallback } from "react";
import useLocalStorage from "../custom-hooks/useLocalStorage";
import { useContacts } from "./ContactsContext";
import { useSocket } from "./SocketProvider";

const ConversationsContext = React.createContext();

export function useConversations() {
  return useContext(ConversationsContext);
}

export function ConversationsProvider({ id, children }) {
  const [conversations, setConversations] = useLocalStorage(
    "conversations",
    []
  );

  const [selectedConversationIndex, setSelectedConversationIndex] = useState(0);

  const { contacts } = useContacts();

  const socket = useSocket();

  const createConversations = (recipients) => {
    setConversations((prev) => {
      return [...prev, { recipients, messages: [] }];
    });
  };

  const addMsgToConversation = useCallback(
    ({ recipients, text, sender }) => {
      setConversations((prev) => {
        let madeChange = false;
        const newMessage = { sender, text };

        const newConversations = prev.map((c) => {
          if (arrayEquality(c.recipients, recipients)) {
            madeChange = true;
            return {
              ...c,
              messages: [...c.messages, newMessage],
            };
          }

          return c;
        });

        if (madeChange) {
          return newConversations;
        } else {
          return [...prev, { recipients, messages: [newMessage] }];
        }
      });
    },
    [setConversations]
  );

  useEffect(() => {
    if (socket == null) return;

    socket.on("receive-message", addMsgToConversation);

    return () => socket.off("receive-message");
  }, [socket, addMsgToConversation]);

  const sendMessage = (recipients, text) => {
    socket.emit("send-message", { recipients, text });
    addMsgToConversation({ recipients, text, sender: id });
  };

  const formattedConversations = conversations.map((cn, index) => {
    const recipients = cn.recipients.map((r) => {
      const contact = contacts.find((c) => c.id === r);

      const name = (contact && contact.name) || r;
      return { id: r, name };
    });

    const messages = cn.messages.map((m) => {
      const contact = contacts.find((c) => c.id === m.sender);

      const name = (contact && contact.name) || m.sender;
      const fromMe = id === m.sender;

      return { ...m, senderName: name, fromMe };
    });

    const selected = index === selectedConversationIndex;
    return { ...cn, messages, recipients, selected };
  });

  const value = {
    conversations: formattedConversations,
    selectedConversation: formattedConversations[selectedConversationIndex],
    selectedConversationIndex: setSelectedConversationIndex,
    sendMessage,
    createConversations,
  };

  return (
    <ConversationsContext.Provider value={value}>
      {children}
    </ConversationsContext.Provider>
  );
}

const arrayEquality = (a, b) => {
  if (a.length !== b.length) return false;

  a.sort();
  b.sort();

  return a.every((e, i) => e === b[i]);
};
