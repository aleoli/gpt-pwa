import { Drawer, IconButton, List, ListItemButton, ListItemIcon, ListItemText, Toolbar } from "@mui/material";
import React from "react";
import ChatIcon from '@mui/icons-material/Chat';
import ImageIcon from '@mui/icons-material/Image';
import SettingsIcon from '@mui/icons-material/Settings';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import { useNavigate } from "react-router-dom";

export interface LeftMenuContextProps {
  open: boolean;
  setOpen: (open: boolean) => void;
}

export const LeftMenuContext = React.createContext<LeftMenuContextProps | null>(null);

function LeftMenu() {
  const leftMenuCtx = React.useContext(LeftMenuContext);

  const navigate = useNavigate();

  return (
    <Drawer
      anchor="left"
      open={leftMenuCtx?.open}
      onClose={() => {leftMenuCtx?.setOpen(false)}}
    >
      <Toolbar>
        <IconButton
          size="large"
          edge="start"
          color="inherit"
          aria-label="close menu"
          onClick={() => {leftMenuCtx?.setOpen(false)}}
          sx={{ mr: 2 }}
        >
          <ArrowBackIosIcon />
        </IconButton>
      </Toolbar>
      <List
        sx={{ width: '100%', minWidth: 270, bgcolor: 'background.paper' }}
        component="nav"
      >
        <ListItemButton alignItems="flex-start" onClick={() => {
          navigate(process.env.PUBLIC_URL + '/');
          leftMenuCtx?.setOpen(false);
        }}>
          <ListItemIcon>
            <ChatIcon />
          </ListItemIcon>
          <ListItemText primary="Chat" />
        </ListItemButton>
        <ListItemButton alignItems="flex-start" onClick={() => {
          navigate(process.env.PUBLIC_URL + '/image');
          leftMenuCtx?.setOpen(false);
        }}>
          <ListItemIcon>
            <ImageIcon />
          </ListItemIcon>
          <ListItemText primary="Image Generation" />
        </ListItemButton>
        <ListItemButton alignItems="flex-start" onClick={() => {
          navigate(process.env.PUBLIC_URL + '/settings');
          leftMenuCtx?.setOpen(false);
        }}>
          <ListItemIcon>
            <SettingsIcon />
          </ListItemIcon>
          <ListItemText primary="Settings" />
        </ListItemButton>
      </List>
    </Drawer>
  );
}

export default LeftMenu;
