import { AppBar, IconButton, TextareaAutosize, Toolbar, alpha, styled } from "@mui/material";
import React from "react";
import SendIcon from '@mui/icons-material/Send';
import { isPWA, isiOS } from "./TopBar";

const Write = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  marginLeft: 0,
  width: '100%',
}));

const StyledInputBase = styled(TextareaAutosize)(({ theme }) => ({
  fontSize: '1rem',
  color: 'inherit',
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  borderRadius: theme.shape.borderRadius,
  minHeight: '28px',
  marginTop: '4px',
  marginBottom: '4px',
  border: 'none',
  width: 'calc(100% - 8px)',
  padding: '4px',
  '&::placeholder': {
    color: 'inherit',
    opacity: 0.5,
  },
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  '&:focus': {
    outline: 'none',
  },
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 1),
    transition: theme.transitions.create('width'),
    [theme.breakpoints.up('sm')]: {
      width: '12ch',
      '&:focus': {
        width: '20ch',
      },
    },
  },
}));

export interface WriteBarProps {
  onWrite?: (text: string) => void;
}

export const iOSPWABottomPadding = 35;
export const iOSPWABottomBarHeight = 56;

function WriteBar(props: WriteBarProps) {
  const Offset = styled('div')(({ theme }) => theme.mixins.toolbar);

  const paddingBottomNumber = isPWA() && isiOS() ? iOSPWABottomPadding : 0;
  const paddingBottom = paddingBottomNumber + 'px';

  const [text, setText] = React.useState<string | null>(null);

  return (
    <React.Fragment>
      <AppBar position="fixed" color="primary" sx={{ top: 'auto', bottom: 0 }} style={
        {
          paddingBottom,
        }
      }>
        <Toolbar>
          <Write onChange={(event) => {
            setText((event.target as HTMLTextAreaElement).value);
          }}>
            <StyledInputBase
              value={ text ?? '' }
              placeholder="Write something…"
            />
          </Write>
          <IconButton color="inherit" onClick={() => {
            if (props.onWrite && text) {
              props.onWrite(text);
              setText(null);
            }
          }}>
            <SendIcon />
          </IconButton>
        </Toolbar>
      </AppBar>
      <Offset style={
        {
          height: paddingBottomNumber > 0 ? (paddingBottomNumber+iOSPWABottomBarHeight)+'px' : undefined,
        }
      }/>
    </React.Fragment>
  );
}

export default WriteBar;
