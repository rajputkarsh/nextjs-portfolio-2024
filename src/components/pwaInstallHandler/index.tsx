"use client";

import { useEffect, useState } from "react";
import InstallPWADialog from "../Dialogs/InstallPWA";

let deferredPrompt: any;
const POPUP_TIME = 30;
function PWAInstallHandler() {
  const [showDialog, setShowDialog] = useState<boolean>(false);
  const isInstalledPWA = window.matchMedia(
    "(display-mode: standalone)"
  ).matches;
  const isAlreadyShownDialog =
    window.localStorage.getItem("installDialogShown");

  const handler = (e: Event) => {
    e.preventDefault();
    deferredPrompt = e;
  };

  useEffect(() => {
    window.addEventListener("beforeinstallprompt", handler);

    setTimeout(() => {
      setShowDialog(true);
    }, POPUP_TIME * 1000);

    return () => {
      window.removeEventListener("beforeinstallprompt", handler);
    };
  }, []);

  const installPWA = async () => {
    if (deferredPrompt) {
      const { outcome } = await deferredPrompt.prompt();
      if (outcome) {
        closeDialog();
      }
    }
  };

  const closeDialog = () => {
    setShowDialog(false);
  };

  if (showDialog && !isAlreadyShownDialog && !isInstalledPWA) {
    return (
      <InstallPWADialog installPWA={installPWA} closeDialog={closeDialog} />
    );
  }

  return <></>;
}

export default PWAInstallHandler;
