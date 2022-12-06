import { Button, Modal, TextField, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { useState } from "react";

interface Props {
  open: boolean;
  name: string;
  handleClose: () => void;
  handleCreate: () => void;
  onChangeName: (val: string) => void;
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

export default function CreateModal({
  open,
  name,
  handleClose,
  handleCreate,
  onChangeName,
}: Props) {
  const [error, setError] = useState<string | null>(null);

  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={styles.modal}>
        <Typography id="modal-modal-title" variant="h6" component="h2">
          New Chat
        </Typography>
        <TextField
          id="modal-modal-description"
          sx={{ mt: 2 }}
          value={name}
          onChange={(e) => {
            onChangeName(e.target.value);
          }}
          placeholder="Your friend's name"
          fullWidth
        />
        {!!error && <Typography color="error">{error}</Typography>}
        <Button
          variant="outlined"
          style={styles.doneButton}
          sx={{ marginTop: 2 }}
          onClick={() => {
            if (name.length) {
              handleCreate();
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
