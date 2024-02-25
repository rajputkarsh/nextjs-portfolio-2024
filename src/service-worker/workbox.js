import { Workbox } from 'workbox-window';

export default function registerServiceWorker() {
  // Check if the serviceWorker Object exists in the navigator object ( means if browser supports SW )
  if ('serviceWorker' in navigator) {
    const wb = new Workbox('/sw.js', { scope: '/' });

    wb.addEventListener('installed', event => {
      if (event.isUpdate) {
        if (window.confirm(`New app update is available!. Click OK to refresh`)) {
          window.location.reload();
        }
      }
    });
    wb.register();
  }
}
