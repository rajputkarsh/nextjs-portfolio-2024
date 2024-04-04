"use client";

import { useEffect, useState } from "react";
import InstallPWADialog from "../Dialogs/InstallPWA";

let deferredPrompt: any;
let timer: NodeJS.Timeout;
const POPUP_TIME = 30;
function PWAInstallHandler() {
  const [time, setTime] = useState<number>(POPUP_TIME);
  const [showDialog, setShowDialog] = useState<boolean>(false);
  const isInstalledPWA = window.matchMedia("(display-mode: standalone)").matches;
  const isAlreadyShownDialog =
    window.localStorage.getItem("installDialogShown");

  const handler = (e: Event) => {
    e.preventDefault();
    deferredPrompt = e;
  };

  useEffect(() => {
    window.addEventListener("beforeinstallprompt", handler);

    timer = setInterval(() => {
      setTime((p) => {
        if (p > 0) {
          return p - 1;
        } else {
          clearInterval(timer);
          setShowDialog(true);
          return 0;
        }
      });
    }, 1000);

    return () => {
      window.removeEventListener("beforeinstallprompt", handler);
    };
  }, []);

  const installPWA = async () => {
    if (deferredPrompt) {
      const outcome = await deferredPrompt.prompt();
    }
  };

  const closeDialog = () => {
    setShowDialog(false);
  };

  if (showDialog && time < 1 && !isAlreadyShownDialog && !isInstalledPWA) {
    return (
      <InstallPWADialog installPWA={installPWA} closeDialog={closeDialog} />
    );
  }

  return <></>;
}

export default PWAInstallHandler;
