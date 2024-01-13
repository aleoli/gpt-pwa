import React from "react";
import MessageList from "../components/MessageList";
import Message from "../classes/message";
import WriteBar from "../components/WriteBar";
import { completion } from "../hooks/useOpenAI";
import Loading from "../components/Loading";
import { ErrorDialogContext } from "../components/ErrorDialog";
import { TopBarContext } from "../components/TopBar";

function Chat() {
  const errorDialogCtx = React.useContext(ErrorDialogContext);
  const topBarCtx = React.useContext(TopBarContext);

  const [ messageID, setMessageID ] = React.useState<number>(0);
  const [ messages, setMessages ] = React.useState<Message[]>(JSON.parse(localStorage.getItem('messages') ?? '[]').map((message: any) => Message.fromJson(message)));
  const [ loading, setLoading ] = React.useState<boolean>(false);

  const clear = () => {
    setMessages([]);
    localStorage.removeItem('messages');
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

    completion(msgs).then((response) => {
      if (response === null) return;
      const msgResp = new Message(messageID + 2, response, 'bot', new Date());
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
  };

  React.useEffect(() => {
    localStorage.setItem('messages', JSON.stringify(messages));
  }, [messages]);

  return (
    <React.Fragment>
      <MessageList messages={ messages } />
      { loading && <Loading /> }
      <WriteBar onWrite={ onWrite } />
    </React.Fragment>
  );
}

export default Chat;
