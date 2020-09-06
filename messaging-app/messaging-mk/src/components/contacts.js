import React, { useState } from "react";
import { useContacts } from "../contexts/ContactsContext";
import { ListGroup } from "react-bootstrap";

export default function Contacts() {
  const { contacts } = useContacts();

  return (
    <div>
      <ListGroup variant="flush">
        {contacts.map((c) => {
          return <ListGroup.Item key={c.id}>{c.name}</ListGroup.Item>;
        })}
      </ListGroup>
    </div>
  );
}
