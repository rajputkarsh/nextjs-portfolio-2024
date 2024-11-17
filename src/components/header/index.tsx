import GoogleAnalytics from "./GoogleAnalytics";
import Hotjar from "./Hotjar";
import MicrosoftClarity from "./MicrosoftClarity";
import SchemaMarkup from "./SchemaMarkup";
import Tags from "./Tags";

function Header() {
  return (
    <>
    <Tags />
    <GoogleAnalytics />
    <MicrosoftClarity />
    <Hotjar />
    <SchemaMarkup />
    </>
  );
}

export default Header;
