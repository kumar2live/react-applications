import React, { useState } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import { useContacts } from "../contexts/ContactsContext";
import { useConversations } from "../contexts/ConversationsContext";

export default function NewConversationsModal({ closeModal }) {
  const { contacts } = useContacts();
  const { createConversations } = useConversations();
  const [selectedContactIds, setSelectedContactIds] = useState([]);

  const handleCheckChange = (cid) => {
    setSelectedContactIds((prev) => {
      if (prev.includes(cid)) {
        return prev.filter((p) => cid !== p);
      } else {
        return [...prev, cid];
      }
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    createConversations(selectedContactIds);    
    closeModal();
  };

  return (
    <>
      <Modal.Header closeButton>Create Conversation</Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit}>
          {contacts.map((c) => {
            return (
              <Form.Group controlId={c.id} key={c.id}>
                <Form.Check
                  type="checkbox"
                  value={selectedContactIds.includes(c.id)}
                  label={c.name}
                  onChange={() => handleCheckChange(c.id)}
                ></Form.Check>
              </Form.Group>
            );
          })}

          <Button type="submit">Create</Button>
        </Form>
      </Modal.Body>
    </>
  );
}
