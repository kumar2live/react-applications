import { useState, useEffect } from "react";

let globalState = {};
let listeners = [];
let actions = {};

export const useStore = (shouldListen = true) => {
  const [, setGlobalStateRef] = useState(globalState);

  const dispath = (actionIdentifier, payload) => {
    const newState = actions[actionIdentifier](globalState, payload);
    globalState = {...globalState, ...newState };

    for(const list of listeners) {
      list(globalState);
    }
  }

  useEffect(() => {
    if (shouldListen) {
      listeners.push(setGlobalStateRef);
    }

    return () => {
      if (shouldListen) {
        listeners = listeners.filter((li) => li !== setGlobalStateRef);
      }
    }
  }, [setGlobalStateRef, shouldListen])

  return [globalState, dispath];
}

export const initStore = (userActions, initialState) => {
  if (initialState) {
    globalState = {...globalState, ...initialState};
  }

  actions = {...actions, ...userActions };
}