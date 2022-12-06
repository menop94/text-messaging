import React, { useEffect, useState } from "react";

import { LocalStorageKey } from "../constants/localStorage";

export type MessagePartType = "IMAGE" | "TEXT";

export type MessagePart = {
  type: MessagePartType;
  value: string;
};

export type Message = {
  sender: string;
  message: MessagePart[];
};

export type Conversation = {
  name: string;
  messages: Message[];
  type: "GROUP" | "DM";
  members?: string[];
};

export interface ConversationsInterface {
  conversations: Conversation[];
  username: string;
  clearStorage: () => void;
  setUsername: (name: string) => void;
  addMessageToConversation: (name: string, message: Message) => void;
  createConversation: (name: string, members?: string[]) => void;
}

const defaultState: ConversationsInterface = {
  conversations: [],
  username: "",
  clearStorage: () => {},
  setUsername: (...params) => {},
  addMessageToConversation: (...params) => {},
  createConversation: (...params) => {},
};

export const ConversationContext = React.createContext(defaultState);

const ConversationContextProvider = ({ children }: any) => {
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [username, setUsername] = useState("");

  useEffect(() => {
    const storageUserId = localStorage.getItem(LocalStorageKey.USER_ID);
    const storageConversation = localStorage.getItem(
      LocalStorageKey.CONVERSATIONS
    );

    if (storageUserId) {
      setUsername(storageUserId);
    }

    if (storageConversation) {
      setConversations(JSON.parse(storageConversation));
    }
  }, []);

  const addMessageToConversation = (name: string, messageData: Message) => {
    const newConversations = new Map(
      conversations.map((conv) => [conv.name, conv])
    );

    if (!newConversations.has(name)) {
      alert("Conversation does not exist");
    } else {
      const conversationMessages = [
        ...(newConversations.get(name)?.messages || []),
      ];

      conversationMessages.push(messageData);

      if (messageData.message[0].type === "TEXT") {
        if (newConversations.get(name)?.type === "GROUP") {
          newConversations.get(name)?.members?.forEach((chatMember) => {
            conversationMessages.push({
              message: [
                {
                  type: "TEXT",
                  value: `${messageData.message[0].value} ❤️`,
                },
              ],
              sender: chatMember,
            });
          });
        } else {
          conversationMessages.push({
            message: [
              {
                type: "TEXT",
                value: `${messageData.message[0].value} ❤️`,
              },
            ],
            sender: name,
          });
        }
      }
      if (newConversations.get(name)?.type === "GROUP") {
        newConversations.set(name, {
          messages: conversationMessages,
          name: name,
          type: "GROUP",
          members: newConversations.get(name)?.members,
        });
      } else {
        newConversations.set(name, {
          messages: conversationMessages,
          name: name,
          type: "DM",
        });
      }

      setConversations(Array.from(newConversations).map(([, conv]) => conv));

      return Array.from(newConversations).map(([, conv]) => conv);
    }
  };

  const createConversation = (name: string, members?: string[]) => {
    const newConversations = new Map(
      conversations.map((conv) => [conv.name, conv])
    );

    if (!newConversations.has(name)) {
      if (!members) {
        newConversations.set(name, {
          messages: [],
          name: name,
          type: "DM",
        });
      } else {
        newConversations.set(name, {
          messages: [],
          name: name,
          type: "GROUP",
          members: members,
        });
      }
    }

    setConversations(Array.from(newConversations).map(([, conv]) => conv));

    return Array.from(newConversations).map(([, conv]) => conv);
  };

  const state: ConversationsInterface = {
    conversations,
    username,
    setUsername: (newUsername) => {
      localStorage.setItem(LocalStorageKey.USER_ID, newUsername);

      setUsername(newUsername);
    },
    addMessageToConversation: (name, message) => {
      const newConversations = addMessageToConversation(name, message);

      try {
        localStorage.setItem(
          LocalStorageKey.CONVERSATIONS,
          JSON.stringify(newConversations)
        );
      } catch (e) {
        alert("Could not save message, local storage is full.");
      }
    },
    createConversation: (name, members) => {
      const newConversations = createConversation(name, members);

      localStorage.setItem(
        LocalStorageKey.CONVERSATIONS,
        JSON.stringify(newConversations)
      );
    },
    clearStorage: () => {
      window.localStorage.clear();
      setUsername("");
      setConversations([]);
    },
  };

  return (
    <ConversationContext.Provider value={state}>
      {children}
    </ConversationContext.Provider>
  );
};

export default ConversationContextProvider;
