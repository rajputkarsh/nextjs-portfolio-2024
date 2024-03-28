import { Workbox } from 'workbox-window';

export default function registerWorkboxServiceWorker() {
  if ('serviceWorker' in navigator) {
    const wb = new Workbox('/sw.js', { scope: '/' });
    wb.register();
  }
}
