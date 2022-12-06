import { useContext, useEffect, useRef, useState } from "react";
import { Box, Button, Paper, TextField } from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import ClearIcon from "@mui/icons-material/Clear";
import PeopleIcon from "@mui/icons-material/People";
import { useNavigate, useParams } from "react-router-dom";

import {
  ConversationContext,
  MessagePart,
  MessagePartType,
} from "../context/ConversationContext";
import AddImage from "../components/AddImage";
import { getBase64 } from "../utils/file";
import CreateGroupModal from "../components/modal/CreateGroupModal";
import ConversationMessage from "../components/conversation/ConversationMessage";

const styles = {
  actionsContainer: { borderBottom: "1px solid #dedede" },
  container: {
    height: "80vh",
  },
  content: { maxHeight: "70vh", overflowY: "auto" as "auto" },
  groupButton: { paddingBottom: 4, minWidth: 0, borderRadius: "50%" },
  imagePreview: { maxWidth: 100, maxHeight: 100 },
  clearImagePreview: {
    height: 20,
    border: "none",
    background: "none",
    padding: 0,
    minWidth: 0,
  },
  messageInput: {
    marginRight: 20,
    borderBottom: "none",
    paddingBottom: 10,
  },
};

export type FileEventTarget = EventTarget & { files: FileList };

export default function Conversation({ group = false }) {
  const { name } = useParams();

  const navigate = useNavigate();

  const conversationRef = useRef<HTMLDivElement>(null);

  const {
    conversations,
    createConversation,
    username,
    addMessageToConversation,
  } = useContext(ConversationContext);

  const [messages, setMessages] = useState(
    conversations.find((c) => c.name === name)?.messages || []
  );

  const [text, setText] = useState("");
  const [base64Image, setBase64Image] = useState<string | null>(null);
  const [showCreateGroupModal, setShowCreateGroupModal] = useState(false);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  if (!name) {
    return null;
  }

  const scrollToBottom = () => {
    conversationRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.length) {
      try {
        const result = await getBase64(e.target.files[0]);

        setBase64Image(result);
      } catch (e) {
        console.log(e);
      }
    }
  };

  const handleSend = () => {
    let messageToSend = {
      sender: username,
      message: [] as MessagePart[],
    };

    if (text.length) {
      messageToSend.message.push({
        type: "TEXT" as MessagePartType,
        value: text,
      });
    }

    if (base64Image) {
      messageToSend.message.push({
        type: "IMAGE",
        value: base64Image,
      });
    }

    setMessages([
      ...(conversations.find((c) => c.name === name)?.messages || []),
      messageToSend,
    ]);

    addMessageToConversation(name, messageToSend);

    setText("");
    setBase64Image(null);
  };

  const handleCreateGroup = (groupName: string, members: string[]) => {
    createConversation(groupName, members);

    setShowCreateGroupModal(false);

    navigate(`/group/${groupName}`);
  };

  return (
    <Paper style={styles.container}>
      <Box
        display="flex"
        flexDirection="column"
        justifyContent="space-between"
        height="100%"
      >
        <Box margin={1} style={styles.content}>
          {conversations
            .find((c) => c.name === name)
            ?.messages?.map((entry, index) => (
              <ConversationMessage
                key={`${entry.sender}-${index}`}
                entry={entry}
              />
            ))}
        </Box>
        <div ref={conversationRef} />
        <Box
          marginBottom={1}
          marginLeft={1}
          marginRight={1}
          border={1}
          borderRadius={2}
          borderColor="#dedede"
          padding={2}
        >
          <div style={styles.actionsContainer}>
            <AddImage handleChange={handleImageChange} />
            <Button
              style={styles.groupButton}
              onClick={() => {
                setShowCreateGroupModal(true);
              }}
            >
              <PeopleIcon />
            </Button>
          </div>
          <Box
            display="flex"
            flexDirection="row"
            justifyContent="space-between"
            alignItems="center"
          >
            <TextField
              InputProps={{
                disableUnderline: true,
              }}
              fullWidth
              variant="standard"
              style={styles.messageInput}
              placeholder="Type your message"
              value={text}
              onChange={(e) => {
                setText(e.target.value);
              }}
            />
            <Button
              onClick={handleSend}
              disabled={!base64Image && !text.length}
            >
              <SendIcon />
            </Button>
          </Box>
          {base64Image && (
            <Box display="flex">
              <img src={`${base64Image}`} alt="" style={styles.imagePreview} />
              <Button
                style={styles.clearImagePreview}
                onClick={() => {
                  setBase64Image(null);
                }}
              >
                <ClearIcon fontSize="medium" />
              </Button>
            </Box>
          )}
        </Box>
      </Box>
      <CreateGroupModal
        open={showCreateGroupModal}
        handleClose={() => {
          setShowCreateGroupModal(false);
        }}
        handleCreate={handleCreateGroup}
      />
    </Paper>
  );
}
