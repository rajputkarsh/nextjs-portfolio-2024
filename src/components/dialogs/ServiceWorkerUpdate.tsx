'use client';

interface ServiceWorkerUpdateDialogProps {
  closeDialog: () => void;
}

function ServiceWorkerUpdateDialog({ closeDialog }: ServiceWorkerUpdateDialogProps) {
  const reloadPage = () => {
    window.location.reload();
  };

  return (
    <div
      className={`fixed inset-0 z-50 overflow-y-auto px-4 md:px-8 opacity-100 visible top-[50%]  rounded-lg`}
    >
      <div className="relative mx-auto w-full max-w-2xl shadow-md bg-white">
        <div className="px-4 py-2 flex flex-row justify-between bg-theme-color text-white">
          <h1>Update!</h1>
          <span className="cursor-pointer" onClick={closeDialog}>
            X
          </span>
        </div>
        <div className="p-4">
          <h2 className="w-full text-center">
            New app version is available! Click OK to refresh
          </h2>
          <div className="w-full flex flex-row justify-center mt-2">
            <button
              type="button"
              className="text-theme-color py-1 px-4 border-2 rounded-lg border-theme-color"
              onClick={reloadPage}
            >
              OK
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ServiceWorkerUpdateDialog;