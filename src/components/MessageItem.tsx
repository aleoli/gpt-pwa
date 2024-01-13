import React from "react";
import Message from "../classes/message";
import { Avatar, ListItem, ListItemAvatar, ListItemText, Typography } from "@mui/material";
import PersonIcon from '@mui/icons-material/Person';
import SmartToyIcon from '@mui/icons-material/SmartToy';
import { green, pink } from '@mui/material/colors';

export interface MessageProps {
  message: Message;
}

function MessageItem(props: MessageProps) {
  return (
    <ListItem alignItems="flex-start">
      <ListItemAvatar>
        <Avatar sx={{ bgcolor: props.message.author === 'user' ? pink[500] : green[500] }}>
          {props.message.author === 'user' && <PersonIcon />}
          {props.message.author === 'bot' && <SmartToyIcon />}
        </Avatar>
      </ListItemAvatar>
      { props.message.message && <ListItemText
        primary={ props.message.author }
        secondary={
          <React.Fragment>
            <Typography
              sx={{ display: 'inline' }}
              component="span"
              variant="body2"
              color="text.primary"
            >
              { props.message.message }
            </Typography>
             <br />{ props.message.date.toLocaleString() }
          </React.Fragment>
        }
      /> }
      { props.message.image && <ListItemText
        primary={ props.message.author }
        secondary={
          <React.Fragment>
            <img
              style={{
                width: '100%',
                height: 'auto',
                borderRadius: '5px',
                overflow: 'hidden',
              }}
              src={ props.message.image }
              alt="Generated"
            />
            <ListItemText
              secondaryTypographyProps={{ component: 'div' }}
              secondary={
                <React.Fragment>
                  { props.message.date.toLocaleString() }
                </React.Fragment>
              }
            />
          </React.Fragment>
        }
      /> }
    </ListItem>
  );
}

export default MessageItem;
