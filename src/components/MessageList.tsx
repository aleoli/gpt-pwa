import { List } from "@mui/material";
import React from "react";
import Message from "../classes/message";
import MessageItem from "./MessageItem";

export interface MessageListProps {
  messages: Message[];
}

function MessageList(props: MessageListProps) {
  return (
    <List sx={{ width: '100%', bgcolor: 'background.paper' }}>
      { props.messages.map((message) => (
        <MessageItem key={ message.id } message={ message } />
      )) }
    </List>
  );
}

export default MessageList;
