import GoogleAnalytics from "./GoogleAnalytics";
import Hotjar from "./Hotjar";
import SchemaMarkup from "./SchemaMarkup";
import Tags from "./Tags";

function Header() {
  return (
    <>
    <Tags />
    <GoogleAnalytics />
    <Hotjar />
    <SchemaMarkup />
    </>
  );
}

export default Header;
