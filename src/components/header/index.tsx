import { headers } from "next/headers";
import Script from "next/script";

function Header() {
  const nonce = headers().get("x-nonce") || undefined;
  return (
    <Script
      src="https://www.googletagmanager.com/gtag/js"
      strategy="afterInteractive"
      nonce={nonce}
    />
  );
}

export default Header;
