import { useEffect, useState } from "react"

function ServiceWorkerEventHandler() {

  const [showDialog, setShowDialog] = useState<string>('');

  useEffect(() =>{
    navigator.serviceWorker.addEventListener("message", (event) => {

      if (event.data) {
        setShowDialog(event.data.type);
      }
    });
  }, []);

  const renderDialog = () => {
    switch (showDialog) {
      case 'installed' : {
        break;
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

export default ServiceWorkerEventHandler