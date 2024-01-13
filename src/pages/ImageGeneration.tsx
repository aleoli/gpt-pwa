import React from "react";
import WriteBar from "../components/WriteBar";
import { imageGeneration } from "../hooks/useOpenAI";
import Message from "../classes/message";
import MessageList from "../components/MessageList";
import Loading from "../components/Loading";
import { ErrorDialogContext } from "../components/ErrorDialog";
import { TopBarContext } from "../components/TopBar";

function ImageGeneration() {
  const errorDialogCtx = React.useContext(ErrorDialogContext);
  const topBarCtx = React.useContext(TopBarContext);

  const [ messageID, setMessageID ] = React.useState<number>(0);
  const [ messages, setMessages ] = React.useState<Message[]>([]);
  const [ loading, setLoading ] = React.useState<boolean>(false);

  const clear = () => {
    setMessages([]);
  };

  if (topBarCtx) {
    topBarCtx.onClearButtonClick = clear;
  }

  const onWrite = (text: string) => {
    const msg = new Message(messageID + 1, text, 'user', new Date());
    setMessageID(messageID + 1);
    let msgs = [...messages, msg];
    setMessages(msgs);
    setLoading(true);

    imageGeneration(text).then((response) => {
      if (response === null) return;
      const msgResp = new Message(messageID + 2, '', 'bot', new Date());
      msgResp.image = response;
      setMessageID(messageID + 2);
      msgs = [...msgs, msgResp];
      setMessages(msgs);
    }).catch((error) => {
      console.error(error);
      errorDialogCtx?.setContent(error.message ?? error);
      errorDialogCtx?.setOpen(true);
    }).finally(() => {
      setLoading(false);
    });
  }

  return (
    <React.Fragment>
      <MessageList messages={ messages } />
      { loading && <Loading /> }
      <WriteBar onWrite={ onWrite } />
    </React.Fragment>
  );
}

export default ImageGeneration;
