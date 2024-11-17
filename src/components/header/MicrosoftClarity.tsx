
import Script from "next/script";

function MicrosoftClarity() {
  return (
    <Script id="clarity-analytics">
      {`(function(c,l,a,r,i,t,y){
        c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
        t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
        y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
    })(window, document, "clarity", "script", "ox73u74r5x");`}
    </Script>
  );
}

export default MicrosoftClarity;