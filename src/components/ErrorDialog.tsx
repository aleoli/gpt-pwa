import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material';
import React from 'react';

export interface ErrorDialogContextProps {
  open: boolean;
  setOpen: (open: boolean) => void;
  content: string;
  setContent: (content: string) => void;
}

export const ErrorDialogContext = React.createContext<ErrorDialogContextProps | null>(null);

function ErrorDialog() {
  const errorDialogCtx = React.useContext(ErrorDialogContext);

  if (!errorDialogCtx) {
    return null;
  }

  const onClose = () => {
    errorDialogCtx.setOpen(false);
  };

  return (
    <Dialog
      open={ errorDialogCtx.open }
      onClose={ onClose }
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">
        {"Error"}
      </DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          { errorDialogCtx.content }
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Ok</Button>
      </DialogActions>
    </Dialog>
  );
}

export default ErrorDialog;
