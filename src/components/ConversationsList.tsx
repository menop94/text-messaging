import {
  Divider,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Typography,
} from "@mui/material";
import { Box } from "@mui/system";
import { Fragment, useContext } from "react";
import { useNavigate, useParams } from "react-router-dom";

import { ConversationContext } from "../context/ConversationContext";

export default function ConversationsList() {
  const { conversations } = useContext(ConversationContext);

  const { name } = useParams();
  const navigate = useNavigate();

  return (
    <nav aria-label="secondary mailbox folders">
      <Box borderRadius={1} bgcolor="#dedede" height="80vh" overflow="auto">
        <Typography
          padding={2}
          fontSize={20}
          borderBottom={1}
          borderColor="#bebebe"
        >
          Your chats
        </Typography>
        <List>
          {conversations.map((c) => (
            <Fragment key={c.name}>
              <ListItem disablePadding>
                <ListItemButton
                  color="red"
                  selected={name === c.name}
                  onClick={() => {
                    if (c.type === "DM") {
                      navigate(`/${c.name}`);
                    } else {
                      navigate(`/group/${c.name}`);
                    }
                  }}
                >
                  <ListItemText primary={c.name} />
                </ListItemButton>
              </ListItem>
              <Divider />
            </Fragment>
          ))}
        </List>
      </Box>
    </nav>
  );
}
