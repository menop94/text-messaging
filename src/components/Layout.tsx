import { AppBar, Box, Button, Toolbar, Typography } from "@mui/material";
import { useContext, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import { ConversationContext } from "../context/ConversationContext";
import Chat from "../pages/Chat";
import { capitalizeName } from "../utils/string";
import LoginModal from "./modal/LoginModal";

export default function Layout() {
  const { name } = useParams();

  const navigate = useNavigate();

  const { username, clearStorage } = useContext(ConversationContext);

  const [showLogin, setShowLogin] = useState(false);

  return (
    <>
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static">
          <Toolbar>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              {name ? capitalizeName(name) : "Chat"}
            </Typography>
            <Button
              onClick={() => {
                clearStorage();
                navigate('/')
                setShowLogin(true);
              }}
            >
              <Typography color="white" marginRight={5}>Clear Storage</Typography>
            </Button>
            {username.length ? (
              <Typography>{`Hello, ${username}!`}</Typography>
            ) : (
              <Button
                color="inherit"
                onClick={() => {
                  setShowLogin(true);
                }}
              >
                Login
              </Button>
            )}
          </Toolbar>
          <LoginModal
            open={showLogin}
            handleClose={() => {
              setShowLogin(false);
            }}
          />
        </AppBar>
      </Box>
      <Chat />
    </>
  );
}
