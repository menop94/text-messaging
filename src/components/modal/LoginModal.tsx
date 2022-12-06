import { Button, Modal, TextField, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { useContext, useState } from "react";

import { ConversationContext } from "../../context/ConversationContext";

interface Props {
  open: boolean;
  handleClose: () => void;
}

const styles = {
  modal: {
    position: "absolute" as "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "background.paper",
    border: "1px solid #000",
    borderRadius: 4,
    boxShadow: 24,
    background: "white",
    p: 4,
  },
  doneButton: {
    marginLeft: "auto",
    display: "block",
  },
};

export default function LoginModal({ open, handleClose }: Props) {
  const { username, setUsername } = useContext(ConversationContext);
  const [newUsername, setNewUsername] = useState(username);
  const [error, setError] = useState<string | null>(null);

  return (
    <Modal open={open} onClose={handleClose}>
      <Box sx={styles.modal}>
        <Typography variant="h6" component="h2">
          What's your name?
        </Typography>
        <TextField
          sx={{ mt: 2 }}
          value={newUsername}
          onChange={(e) => {
            setNewUsername(e.target.value);
          }}
          placeholder="Type your  name"
          fullWidth
        />
        {!!error && <Typography color="error">{error}</Typography>}
        <Button
          variant="outlined"
          style={styles.doneButton}
          sx={{ marginTop: 2 }}
          onClick={() => {
            if (newUsername.length) {
              setUsername(newUsername);
              handleClose();
            } else {
              setError("Name is required");
            }
          }}
        >
          Done
        </Button>
      </Box>
    </Modal>
  );
}
