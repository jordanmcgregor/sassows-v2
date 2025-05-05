'use client';
import { useEffect, useState } from 'react';

export default function InstallButton() {
  const [isAndroid, setIsAndroid] = useState(false);
  const [isIos, setIsIos] = useState(false);
  const [isSafari, setIsSafari] = useState(false);
  const [isChrome, setIsChrome] = useState(false);

  const [deferredPrompt, setDeferredPrompt] = useState<any>(null);
  const [showButton, setShowButton] = useState(true);

  useEffect(() => {
    // Check for Android and iOS
    const userAgent = navigator.userAgent.toLowerCase();
    setIsAndroid(userAgent.includes('android'));
    setIsIos(userAgent.includes('iphone') || userAgent.includes('ipad') || userAgent.includes('ipod'));

    // Check for Safari and Chrome
    setIsSafari(/safari/i.test(userAgent) && !/chrome/i.test(userAgent));
    setIsChrome(/chrome|crios/i.test(userAgent) && /iphone|ipad|ipod/i.test(userAgent));

    // Listen for the beforeinstallprompt event (Android and Desktop)
    const handler = (e: any) => {
      e.preventDefault();
      setDeferredPrompt(e);
      setShowButton(true);
    };

    window.addEventListener('beforeinstallprompt', handler);

    return () => window.removeEventListener('beforeinstallprompt', handler);
  }, []);

  const handleInstall = async () => {
    if (!deferredPrompt) return;

    deferredPrompt.prompt();
    const { outcome } = await deferredPrompt.userChoice;

    if (outcome === 'accepted') {
      console.log('PWA installed');
    } else {
      console.log('PWA installation declined');
    }

    setDeferredPrompt(null);
    setShowButton(false);
  };

  if (!showButton) return null;

  return (
    <div>
      {/* For Android Devices */}
      {isAndroid && (
        <div>
          <button
            className="bg-blue-600 text-white px-4 py-2 rounded shadow"
            onClick={handleInstall}
          >
            Install App
          </button>
          <p>Tap the button to install the app to your Android device.</p>
        </div>
      )}

      {/* For iOS Devices */}
      {isIos && !isSafari && !isChrome && (
        <div>
          <h2>Install on iOS (Other Browsers)</h2>
          <p>To install the PWA, please open this page in Safari or Chrome.</p>
        </div>
      )}

      {/* For Safari on iOS */}
      {isIos && isSafari && false && (
        <div>
          <h2>Install on Safari for iOS</h2>
          <ol>
            <li>1. Open this page in Safari.</li>
            <li>2. Tap the <strong>Share</strong> button (the square with an arrow pointing up).</li>
            <li>3. Scroll down and tap <strong>Add to Home Screen</strong>.</li>
            <li>4. Follow the on-screen instructions to add the app to your home screen.</li>
          </ol>
        </div>
      )}

      {/* For Chrome on iOS */}
      {isIos && isChrome && false && (
        <div>
          <h2>Install on Chrome for iOS</h2>
          <ol>
            <li>1. Open this page in Chrome.</li>
            <li>2. Tap the <strong>Share</strong> button (the square with an arrow pointing up).</li>
            <li>3. Tap <strong>Add to Home Screen</strong>.</li>
            <li>4. Follow the on-screen instructions to add the app to your home screen.</li>
          </ol>
        </div>
      )}
    </div>
  );
}
