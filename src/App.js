import React, { useEffect, useRef, createContext, useState, memo, useCallback, useMemo } from 'react';
import { ChakraProvider, Flex, extendTheme, Image, Center, Modal, ModalBody, ModalOverlay, ModalContent, ModalHeader, Switch, HStack, Box, Text } from '@chakra-ui/react';
import { useFlags, useLDClient } from 'launchdarkly-react-client-sdk';
import QRCode from 'react-qr-code';
import Navigation from './components/Navigation.js';
import ThemedDemo from './components/ThemeDemo.js';
import APIDemo from './components/APIDemo.js';
import GuessMyCard from './components/GuessMyCard.js';
import FF from './components/FF.js';
import './App.css';

export const DemoContext = createContext();

//  "homepage": "https://cleon.github.io/themed-demo-app",

function App() {
  const { demoTheme, demoSoundEnabled, demoQRCode, demoQRCodeWebPage, demoBroken, demoServerBroken, demoAdmin, demoGuess, downForMaintenance, enableToggling, enableDemoFeature } = useFlags();
  const [context, setContext] = useState({});
  const [demoFeatureEnabled, setDemoFeatureEnabled] = useState(enableDemoFeature);
  const [toggleModalVisible, setToggleModalVisible] = useState(enableToggling);
  const [togglerEnabled, setTogglerEnabled] = useState(true);
  const ldClient = useLDClient();
  const theme = useRef();
  const themeCache = useRef([]);
  const DEFAULT = 'DEFAULT';
  const params = new URLSearchParams(window.location.search);
  const cid = params.get('cid');
  const QRCODE_URL = process.env.REACT_APP_GITHUB_PAGES_URL + (cid ? `?cid=${cid}` : '');

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

  useEffect(() => {
    setContext(previousContext => ({ ...previousContext, downForMaintenance: downForMaintenance }));
  }, [downForMaintenance]);

  useEffect(() => {
    setToggleModalVisible(enableToggling);
  }, [enableToggling]);

  async function updateThemeInfo(demoTheme) {
    let ctx = themeCache.current[demoTheme];
    if (!ctx) {
      const resp = await fetch(`themes/${demoTheme}/theme.json`);
      ctx = await resp.json();
      themeCache.current[demoTheme] = ctx;
    }

    ctx = {
      ...ctx,
      avatar: ldClient.getContext().user.avatar,
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
    const context = ldClient.getContext();
    if (context.user.selection !== DEFAULT) {
      context.user.selection = DEFAULT;
      await ldClient.identify({ ...context });
    }
  }

  function makeGlobalOverridableStyles() {
    return {
      fonts: {
        body: 'Söhne'
      },
      colors: {
        brand: {
          header_bg1: '#405BFF'
        }
      }
    };
  }

  const ModalQRCode = memo(() => {
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
  });

  const Toggler = memo(() => {
    const togglerChanged = useCallback((e) => {
      setTogglerEnabled(false);
      const on = e.target.checked;
      FF.toggleDemoFeatureEnabled(on).then(() => {
        setDemoFeatureEnabled(on);
        setTogglerEnabled(true);
      });
    }, []);

    const modal = <Modal size='xs' isOpen={toggleModalVisible} isCentered={true} motionPreset='none'>
      <ModalOverlay bg='blackAlpha.800' />
      <ModalContent>
        <ModalHeader bg='brand.header_bg1'>
          <Center>
            <Image src='ld_logo_dark.png' height='1.5rem' width='9.75rem' className='ldLogoImage' />
          </Center>
        </ModalHeader>
        <ModalBody>
          <Center>
            <Text>Enable: Demo Feature</Text>
          </Center>
          <Center>
            <Text>OFF</Text>
            <Switch p={2} size="lg" colorScheme='green' defaultChecked={demoFeatureEnabled} checked={demoFeatureEnabled} onChange={togglerChanged} isDisabled={!togglerEnabled} />
            <Text>ON</Text>
          </Center>
        </ModalBody>
      </ModalContent>
    </Modal>;

    return enableToggling ? modal : null;
  });

  const AdminAPIControls = () => {
    return demoAdmin ? <APIDemo /> : null;
  }

  const AppComponents = () => {
    const components = [];
    switch (demoTheme.toLowerCase()) {
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
          <Toggler />
          <AppComponents />
        </Flex>
      </DemoContext.Provider>
    </ChakraProvider>
  );
}

export default App;