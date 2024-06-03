"use client";

import { useEffect, useState } from "react";
import ServiceWorkerUpdateDialog from "../dialogs/ServiceWorkerUpdate";
import { toast } from "react-toastify";

function ServiceWorkerEventHandler() {
  const [showDialog, setShowDialog] = useState<string>("");
  const [eventData, setEventData] = useState<{ [key: string]: any } | null>(
    null
  );

  const showToast = () => {
    toast(eventData?.options?.body, {
      onClick: () => {
        window.open(eventData?.options?.data?.url, "_blank");
      },
    });
  };

  useEffect(() => {
    navigator.serviceWorker.addEventListener("message", (event) => {
      if (event.data) {
        setEventData((prev) => event.data.data);
        setShowDialog(event.data.type);
      }
    });
  }, []);

  const closeDialog = () => {
    setShowDialog("");
  };

  const renderDialog = () => {
    switch (showDialog) {
      case "installed": {
        return <ServiceWorkerUpdateDialog closeDialog={closeDialog} />;
      }
      case "notificationReceived": {
        showToast();
        return <></>;
      }
      default: {
        return null;
      }
    }
  };

  return <>{renderDialog()}</>;
}

export default ServiceWorkerEventHandler;
