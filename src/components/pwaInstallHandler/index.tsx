"use client";

import { useEffect, useState } from "react";
import InstallPWADialog from "../Dialogs/InstallPWA";
import { pageView } from "@/utils/analyticsEvents";

let deferredPrompt: any;
const POPUP_TIME = 30;
function PWAInstallHandler() {
  const [showDialog, setShowDialog] = useState<boolean>(false);
  const [isInstalledPWA, setIsInstalledPWA] = useState<boolean>(false); 
  const [isAlreadyShownDialog, setIsAlreadyShownDialog] = useState<boolean>(false); 

  const handler = (e: Event) => {
    e.preventDefault();
    deferredPrompt = e;
  };

  useEffect(() => {
    window.addEventListener("beforeinstallprompt", handler);
    setIsInstalledPWA(() => window.matchMedia(
    "(display-mode: standalone)"
  ).matches);
  setIsAlreadyShownDialog(() => window.localStorage.getItem("installDialogShown") == '1')
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
      if (outcome === "accepted") {
        pageView('PWA Installed');
      }
      closeDialog();
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
