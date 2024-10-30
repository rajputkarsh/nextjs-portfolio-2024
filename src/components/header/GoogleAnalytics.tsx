import Script from "next/script";
import { headers } from "next/headers";

async function GoogleAnalytics() {
  const headerData = await headers();
  const nonce = headerData.get("x-nonce") || undefined;
  return (
    <Script
      src="https://www.googletagmanager.com/gtag/js"
      strategy="afterInteractive"
      nonce={nonce}
    />
  );
}

export default GoogleAnalytics;
