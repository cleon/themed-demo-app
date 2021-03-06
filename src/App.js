import React, { useEffect, useRef, createContext, useState } from 'react';
import { ChakraProvider, Flex, extendTheme, Image, Center, Modal, ModalBody, ModalOverlay, ModalContent, ModalHeader } from '@chakra-ui/react';
import { useFlags, useLDClient } from 'launchdarkly-react-client-sdk';
import QRCode from 'react-qr-code';
import Navigation from './components/Navigation.js';
import ThemedDemo from './components/ThemeDemo.js';
import Migration from './components/Migration.js';
import APIDemo from './components/APIDemo.js';
import GuessMyCard from './components/GuessMyCard.js';
import './App.css';

export const DemoContext = createContext();

function App() {
  const { demoTheme, demoSoundEnabled, demoQRCode, demoQRCodeWebPage, demoBroken, demoServerBroken, demoAdmin, demoGuess } = useFlags();
  const [context, setContext] = useState({});
  const ldClient = useLDClient();
  const theme = useRef();
  const themeCache = useRef([]);
  const DEFAULT = 'DEFAULT';
  const QRCODE_URL = process.env.REACT_APP_GITHUB_PAGES_URL;

  useEffect(() => {
    updateThemeInfo(demoTheme)
      .then(resetUserSelection)
      .catch(e => console.error(e));
  }, [demoTheme]);

  useEffect(() => {
    setContext(previousContext => ({ ...previousContext, qrCodeForWebPage: demoQRCodeWebPage }));
  }, [demoQRCodeWebPage]);

  useEffect(() => {
    setContext(previousContext => ({ ...previousContext, soundEnabled: demoSoundEnabled }));
  }, [demoSoundEnabled]);

  useEffect(() => {
    setContext(previousContext => ({ ...previousContext, demoAdmin: demoAdmin }));
  }, [demoAdmin]);

  useEffect(() => {
    setContext(previousContext => ({ ...previousContext, demoBroken: demoBroken }));
  }, [demoBroken]);

  useEffect(() => {
    setContext(previousContext => ({ ...previousContext, demoServerBroken: demoServerBroken }));
  }, [demoServerBroken]);

  useEffect(() => {
    setContext(previousContext => ({ ...previousContext, cardGuess: demoGuess }));
  }, [demoGuess]);

  async function updateThemeInfo(demoTheme) {
    let ctx = themeCache.current[demoTheme];
    if (!ctx) {
      const resp = await fetch(`themes/${demoTheme}/theme.json`);
      ctx = await resp.json();
      themeCache.current[demoTheme] = ctx;
    }

    ctx = {
      ...ctx,
      avatar: ldClient.getUser().avatar,
      soundEnabled: demoSoundEnabled,
      showQRCode: demoQRCode,
      qrCodeForWebPage: demoQRCodeWebPage,
      demoAdmin: demoAdmin,
      selectedItem: DEFAULT,
      NOP: DEFAULT,
      cardGuess: demoGuess
    };

    const globalStyles = makeGlobalOverridableStyles();
    theme.current = extendTheme(globalStyles, ctx.themeStyle);

    setContext(previousContext => ({ ...previousContext, ...ctx }));
  }

  async function resetUserSelection() {
    const user = ldClient.getUser();
    if (user.custom.selection !== DEFAULT) {
      const newUser = { ...user, custom: { ...user.custom, selection: DEFAULT } };
      await ldClient.identify(newUser);
    }
  }

  function makeGlobalOverridableStyles() {
    return {
      fonts: {
        body: 'S??hne'
      },
      colors: {
        brand: {
          header_bg1: '#405BFF'
        }
      }
    };
  }

  const ModalQRCode = () => {
    const modal =
      <Modal size='xs' isOpen={demoQRCode} isCentered={true}>
        <ModalOverlay bg='blackAlpha.800' />
        <ModalContent>
          <ModalHeader bg='brand.header_bg1'>
            <Center>
              <Image src='ld_logo_dark.png' height='1.5rem' width='9.75rem' className='ldLogoImage' />
            </Center>
          </ModalHeader>
          <ModalBody>
            <Center>
              <QRCode value={QRCODE_URL} />
            </Center>
          </ModalBody>
        </ModalContent>
      </Modal>;

    return demoQRCode ? modal : null;
  }

  const AdminAPIControls = () => {
    return demoAdmin ? <APIDemo /> : null;
  }

  const AppComponents = () => {
    const components = [];
    switch (demoTheme.toLowerCase()) {
      case 'migration':
        components.push(<Migration />);
        break;
      case 'guessmycard':
        components.push(<AdminAPIControls />, <GuessMyCard />);
        break;
      default:
        components.push(<Navigation />, <AdminAPIControls />, <ThemedDemo />);
        break;
    }
    return components.map((c, i) => ({ ...c, key: i }));
  }

  return (
    <ChakraProvider theme={theme.current}>
      <DemoContext.Provider value={{ context, setContext }}>
        <Flex direction="column" w="100%" m="0 auto">
          <ModalQRCode />
          <AppComponents />
        </Flex>
      </DemoContext.Provider>
    </ChakraProvider>
  );
}

export default App;