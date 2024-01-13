import { AppBar, Box, IconButton, Toolbar, Typography, styled } from '@mui/material';
import React from 'react';
import MenuIcon from '@mui/icons-material/Menu';
import DeleteIcon from '@mui/icons-material/Delete';
import GitHubIcon from '@mui/icons-material/GitHub';
import InstallMobileIcon from '@mui/icons-material/InstallMobile';
import { LeftMenuContext } from './LeftMenu';
import { useLocation, useNavigate } from 'react-router-dom';
import { browserName, osName } from "react-device-detect";
import { useInstall } from '../hooks/useInstall';

export interface TopBarContextProps {
  title: string | undefined;
  setTitle: (title: string) => void;
  showClearButton: boolean;
  setShowClearButton: (showClearButton: boolean) => void;
  onClearButtonClick?: () => void;
}

export const TopBarContext = React.createContext<TopBarContextProps | null>(null);

export function isPWA() {
  let displayMode = 'browser';
  const mqStandAlone = '(display-mode: standalone)';
  if ((navigator as any).standalone || window.matchMedia(mqStandAlone).matches) {
    displayMode = 'standalone';
  }
  return displayMode === 'standalone';
}

export function isMobileSafari() {
  return (osName === 'iOS' && browserName === 'Mobile Safari') || (osName === 'Mac OS' && browserName === 'Safari');
}

export function isiOS() {
  return osName === 'iOS' || osName === 'Mac OS';
}

function TopBar() {
  const Offset = styled('div')(({ theme }) => theme.mixins.toolbar);
  const [isInstallVisible, setInstallVisibleState] = React.useState(isMobileSafari());

  const leftMenuCtx = React.useContext(LeftMenuContext);
  const topBarCtx = React.useContext(TopBarContext);

  const navigate = useNavigate();

  const location = useLocation();
  const [prompt, promptToInstall] = useInstall();

  const onInstallClick = () => {
    if (isMobileSafari()) {
      navigate('/install-pwa-safari');
    } else {
      promptToInstall();
    }
  }

  React.useEffect(() => {
    if (prompt) {
      setInstallVisibleState(true);
    }
  }, [prompt]);

  React.useEffect(() => {
    switch (location.pathname) {
      case '/':
        topBarCtx?.setTitle('Chat');
        topBarCtx?.setShowClearButton(true);
        break;
      case '/chat':
        topBarCtx?.setTitle('Chat');
        topBarCtx?.setShowClearButton(true);
        break;
      case '/image':
        topBarCtx?.setTitle('Image Generation');
        topBarCtx?.setShowClearButton(true);
        break;
      case '/settings':
        topBarCtx?.setTitle('Settings');
        topBarCtx?.setShowClearButton(false);
        break;
      case '/install-pwa-safari':
        topBarCtx?.setTitle('Install');
        topBarCtx?.setShowClearButton(false);
        break;
      default:
        topBarCtx?.setTitle('GPT PWA');
        break;
    }
  }, [location, topBarCtx]);

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="fixed">
        <Toolbar>
          <IconButton
            color="inherit"
            onClick={ () => { leftMenuCtx?.setOpen(!leftMenuCtx.open ?? true) } }
            edge="start"
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            { topBarCtx?.title ?? 'GPT PWA' }
          </Typography>
          { (!isPWA() && isInstallVisible) && <IconButton
            color="inherit"
            edge="end"
            sx={{ ml: 2 }}
            onClick={ onInstallClick }
          >
            <InstallMobileIcon />
          </IconButton> }
          <IconButton
            color="inherit"
            edge="end"
            sx={{ ml: 2 }}
            href='https://github.com'
            target='_blank'
            rel='noreferrer'
          >
            <GitHubIcon />
          </IconButton>
          { topBarCtx?.showClearButton && <IconButton
            color="inherit"
            onClick={ () => {
              if (topBarCtx && topBarCtx?.onClearButtonClick) {
                topBarCtx.onClearButtonClick();
              }
            } }
            edge="end"
            sx={{ ml: 2 }}
          >
            <DeleteIcon />
          </IconButton>}
        </Toolbar>
      </AppBar>
      <Offset />
    </Box>
  );
}

export default TopBar;
