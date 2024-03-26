'use client';

import { useEffect, useState } from "react"
import ServiceWorkerUpdateDialog from "../Dialogs/ServiceWorkerUpdate";

function ServiceWorkerEventHandler() {

  const [showDialog, setShowDialog] = useState<string>("");

  useEffect(() =>{
    navigator.serviceWorker.addEventListener("message", (event) => {
      console.log(`message from SW - `, event);      
      if (event.data) {
        setShowDialog(event.data.type);
      }
    });
  }, []);

  const renderDialog = () => {
    switch (showDialog) {
      case 'installed' : {
        return <ServiceWorkerUpdateDialog />
      }
      default: {
        return null;
      }
    }
  }

  return (
    <>
      {renderDialog()}
    </>
  )
}

export default ServiceWorkerEventHandler;
