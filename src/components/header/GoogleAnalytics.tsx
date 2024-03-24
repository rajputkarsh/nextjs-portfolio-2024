import Script from "next/script";
import { headers } from "next/headers";

function GoogleAnalytics() {
  const nonce = headers().get("x-nonce") || undefined;
  return (
    <Script
      src="https://www.googletagmanager.com/gtag/js"
      strategy="afterInteractive"
      nonce={nonce}
    />
  );
}

export default GoogleAnalytics;
