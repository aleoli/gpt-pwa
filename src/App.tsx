import React from 'react';
import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from './Layout';
import Chat from './pages/Chat';
import { TopBarContext, TopBarContextProps } from './components/TopBar';
import { ErrorDialogContext } from './components/ErrorDialog';
import { LeftMenuContext, LeftMenuContextProps } from './components/LeftMenu';
import ImageGeneration from './pages/ImageGeneration';
import Settings from './pages/Settings';
import InstallPWASafari from './pages/InstallPWASafari';

function App() {
  const [title, setTitle] = React.useState<string>();
  const [showClearButton, setShowClearButton] = React.useState<boolean>(false);
  const topBarCtxValue: TopBarContextProps = { title, setTitle, showClearButton, setShowClearButton };

  const [ leftMenuOpen, setLeftMenuOpen ] = React.useState<boolean>(false);
  const leftMenuCtxValue: LeftMenuContextProps = { open: leftMenuOpen, setOpen: setLeftMenuOpen };

  const [errorDialogOpen, setErrorDialogOpen] = React.useState<boolean>(false);
  const [errorDialogContent, setErrorDialogContent] = React.useState<string>('');
  const errorDialogCtxValue = { open: errorDialogOpen, setOpen: setErrorDialogOpen, content: errorDialogContent, setContent: setErrorDialogContent };

  return (
    <ErrorDialogContext.Provider value={errorDialogCtxValue}>
      <TopBarContext.Provider value={topBarCtxValue}>
        <LeftMenuContext.Provider value={leftMenuCtxValue}>
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Layout />}>
                <Route index element={<Chat />} />
                <Route path="chat" element={<Chat />} />
                <Route path="image" element={<ImageGeneration />} />
                <Route path="settings" element={<Settings />} />
                <Route path="install-pwa-safari" element={<InstallPWASafari />} />
              </Route>
            </Routes>
          </BrowserRouter>
        </LeftMenuContext.Provider>
      </TopBarContext.Provider>
    </ErrorDialogContext.Provider>
  );
}

export default App;
