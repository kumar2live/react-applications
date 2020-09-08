import React from "react";
import Login from "./login";
import DashBoard from "./dashboard";
import useLocalStorage from "../custom-hooks/useLocalStorage";
import { ContactsProvider } from "../contexts/ContactsContext";
import { ConversationsProvider } from "../contexts/ConversationsContext";
import { SocketProvider } from "../contexts/SocketProvider";

function App() {
  const [id, setId] = useLocalStorage("id");

  const dashboard = (
    <SocketProvider id={id}>
      <ContactsProvider>
        <ConversationsProvider id={id}>
          <DashBoard id={id} />
        </ConversationsProvider>
      </ContactsProvider>
    </SocketProvider>
  );

  return <>{id ? dashboard : <Login onIdSubmit={setId} />}</>;
}

export default App;
