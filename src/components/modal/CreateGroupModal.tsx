import {
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Modal,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import { Box } from "@mui/system";
import { useContext, useState } from "react";
import { useParams } from "react-router-dom";
import { ConversationContext } from "../../context/ConversationContext";

interface Props {
  open: boolean;
  handleClose: () => void;
  handleCreate: (name: string, members: string[]) => void;
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
  form: {
    marginTop: 12,
  },
  doneButton: {
    marginLeft: "auto",
    display: "block",
  },
};

export default function CreateGroupModal({
  open,
  handleClose,
  handleCreate,
}: Props) {
  const { name } = useParams();
  const [error, setError] = useState<string | null>(null);
  const [groupName, setGroupName] = useState("");
  const [members, setMembers] = useState<string[]>(
    typeof name !== "undefined" ? [name] : []
  );

  const { conversations } = useContext(ConversationContext);

  return (
    <Modal open={open} onClose={handleClose}>
      <Box sx={styles.modal}>
        <Typography variant="h6" component="h2">
          New Chat
        </Typography>
        <TextField
          sx={{ mt: 2 }}
          value={groupName}
          onChange={(e) => {
            setGroupName(e.target.value);
          }}
          placeholder="Your group's name"
          fullWidth
        />
        {!!error && <Typography color="error">{error}</Typography>}
        <FormControl fullWidth style={styles.form}>
          <InputLabel>Members</InputLabel>
          <Select
            value={members}
            label="Age"
            onChange={(e) => {
              setMembers(e.target.value as string[]);
            }}
            multiple={true}
          >
            {conversations.map((conv) => (
              <MenuItem key={conv.name} value={conv.name}>
                {conv.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <Button
          variant="outlined"
          style={styles.doneButton}
          sx={{ marginTop: 2 }}
          onClick={() => {
            if (groupName.length) {
              handleCreate(groupName, members);
            } else {
              setError("Group name is required");
            }
          }}
        >
          Done
        </Button>
      </Box>
    </Modal>
  );
}
