import { Typography } from "@mui/material";
import { Fragment, useContext } from "react";
import { useParams } from "react-router-dom";
import {
  ConversationContext,
  Message,
} from "../../context/ConversationContext";

const styles = {
  image: {
    maxWidth: 300,
    maxHeight: 300,
  },
  message: {
    width: "fit-content",
    padding: 20,
    borderRadius: 10,
    marginBottom: 12,
    maxWidth: "70%",
  },
  messageReceived: {
    backgroundColor: "#447fdd44",
    borderTopLeftRadius: 0,
  },
  messageSent: {
    backgroundColor: "#44dd7f44",
    borderBottomRightRadius: 0,
    marginLeft: "auto",
  },
  sender: {
    textAlign: "right" as "right",
  },
};

export default function ConversationMessage({ entry }: { entry: Message }) {
  const { name } = useParams();

  const { conversations, username } = useContext(ConversationContext);

  return (
    <div
      style={
        entry.sender === username
          ? { ...styles.message, ...styles.messageSent }
          : { ...styles.message, ...styles.messageReceived }
      }
    >
      {entry.message.map(({ type, value }, index) => (
        <Fragment key={`${type}-${index}`}>
          {type === "TEXT" && <div>{value}</div>}
          {type === "IMAGE" && (
            <img src={value} alt="img" style={styles.image} />
          )}
        </Fragment>
      ))}
      {entry.sender !== username &&
        conversations.find((c) => c.name === name)?.type === "GROUP" && (
          <Typography style={styles.sender}>
            <i>{entry.sender}</i>
          </Typography>
        )}
    </div>
  );
}
