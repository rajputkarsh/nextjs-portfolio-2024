import { headers } from "next/headers";
import Script from "next/script";

function Header() {
  const nonce = headers().get("x-nonce") || undefined;
  return (
    <>
      <link rel="manifest" href="manifest.json" />
      <Script
        src="https://www.googletagmanager.com/gtag/js"
        strategy="afterInteractive"
        nonce={nonce}
      />
      <Script id="hotjar-analytics">
        {`(function(h,o,t,j,a,r){
        h.hj=h.hj||function(){(h.hj.q=h.hj.q||[]).push(arguments)};
        h._hjSettings={hjid:3882494,hjsv:6};
        a=o.getElementsByTagName('head')[0];
        r=o.createElement('script');r.async=1;
        r.src=t+h._hjSettings.hjid+j+h._hjSettings.hjsv;
        a.appendChild(r);
    })(window,document,'https://static.hotjar.com/c/hotjar-','.js?sv=');`}
      </Script>
    </>
  );
}

export default Header;
