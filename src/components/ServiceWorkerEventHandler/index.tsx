'use client';

import { useEffect, useState } from "react"
import ServiceWorkerUpdateDialog from "../Dialogs/ServiceWorkerUpdate";

function ServiceWorkerEventHandler() {

  const [showDialog, setShowDialog] = useState<string>("");
  const [eventData, setEventData] = useState<{ [key: string]: any } | null>(null);

  const showToast = () => {
    console.log(`eventData -- `, eventData);
  }

  useEffect(() =>{
    navigator.serviceWorker.addEventListener("message", (event) => {
      if (event.data) {
        console.log(`RECEIVED FROM SW: `, event.data);
        setEventData((prev) => event.data.data);
        setShowDialog(event.data.type);
      }
    });
  }, []);

  const renderDialog = () => {
    switch (showDialog) {
      case 'installed' : {
        return <ServiceWorkerUpdateDialog />
      }
      case 'notificationReceived' : {
        showToast();
        return <></>;
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
