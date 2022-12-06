import { Fab, Grid } from "@mui/material";
import { Outlet, useNavigate } from "react-router-dom";
import { useContext, useState } from "react";
import AddIcon from "@mui/icons-material/Add";

import ConversationsList from "../components/ConversationsList";
import CreateModal from "../components/modal/CreateModal";
import { ConversationContext } from "../context/ConversationContext";

const styles = {
  fabContainer: {
    position: "fixed" as "fixed",
    right: 20,
    bottom: 20,
  },
};

export default function Chat() {
  const [modalOpen, setModalOpen] = useState(false);
  const [name, setName] = useState("");

  const { createConversation, username } = useContext(ConversationContext);

  const navigate = useNavigate();

  const handleCreate = () => {
    createConversation(name);

    setModalOpen(false);

    navigate(`/${name}`);
  };

  return (
    <Grid
      container
      spacing={2}
      maxWidth={1600}
      marginLeft="auto"
      marginRight="auto"
      marginTop={5}
      paddingRight={4}
      paddingLeft={4}
      height={"80vh"}
    >
      <CreateModal
        open={modalOpen}
        name={name}
        handleClose={() => {
          setModalOpen(false);
        }}
        handleCreate={handleCreate}
        onChangeName={(newName) => {
          setName(newName);
        }}
      />
      <Grid item xs={1} sm={3}>
        <ConversationsList />
      </Grid>
      <Grid item xs={11} sm={9}>
        <Outlet />
      </Grid>
      <div style={styles.fabContainer}>
        <Fab
          color="primary"
          aria-label="add"
          disabled={!username.length}
          onClick={() => {
            setModalOpen(true);
          }}
        >
          <AddIcon />
        </Fab>
      </div>
    </Grid>
  );
}
