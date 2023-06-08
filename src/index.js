import React from 'react';
import ReactDOM from 'react-dom';
import { asyncWithLDProvider } from 'launchdarkly-react-client-sdk';
import App from './App.js';

(async () => {
  const draw = await fetch('https://deckofcardsapi.com/api/deck/new/draw/?count=1');
  const hand = await draw.json();
  const card = hand.cards[0];
  const params = new URLSearchParams(window.location.search);
  const email = params.get('email');
  const cid = params.get('cid') || process.env.REACT_APP_LD_CLIENT_SIDE_ID;
  const browser = getBrowser();
  const device = getDeviceType();

  function getBrowser() {
    if (navigator.userAgent.match(/chrome|chromium|crios/i)) {
      return "Chrome";
    } else if (navigator.userAgent.match(/firefox|fxios/i)) {
      return "Firefox";
    } else if (navigator.userAgent.match(/safari/i)) {
      return "Safari";
    } else if (navigator.userAgent.match(/opr\//i)) {
      return "Opera";
    } else if (navigator.userAgent.match(/edg/i)) {
      return "Edge";
    } else if (navigator.userAgent.match(/android/i)) {
      return "Android";
    } else if (navigator.userAgent.match(/iphone/i)) {
      return "iPhone";
    } else {
      return "Unknown";
    }
  }

  function getDeviceType() {
    return (("ontouchstart" in document.documentElement) ? "mobile" : "desktop");
  }

  const LDProvider = await asyncWithLDProvider({
    clientSideID: cid,
    reactOptions: {
      useCamelCaseFlagKeys: false
    },
    context: {
      kind: "multi",
      user: {
        kind: "user",
        key: card.code,
        avatar: card.image,
        email: email,
        card: card.code,
        suit: card.suit,
        face: card.value,
        selection: 'DEFAULT'
      },
      browser: {
        kind: "browser",
        key: browser,
        name: browser
      },
      device: {
        kind: "device",
        key: device,
        name: device
      },
      platform: {
        kind: "platform",
        key: "web",
        name: "web"
      }
    },
    flags: {
      'demoTheme': 'Default',
      'demoSoundEnabled': false,
      'demoQRCode': false,
      'demoAdmin': false,
      'demoBroken': false,
      'demoServerBroken': false,
      'demoGuess': 'Default'
    }
  });

  ReactDOM.render(
    <LDProvider>
      <App />
    </LDProvider>,
    document.getElementById('root')
  );
})();
