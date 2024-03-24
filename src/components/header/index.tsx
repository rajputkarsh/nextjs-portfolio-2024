import GoogleAnalytics from "./GoogleAnalytics";
import Hotjar from "./Hotjar";
import Tags from "./Tags";

function Header() {
  return (
    <>
    <Tags />
    <GoogleAnalytics />
    <Hotjar />
    </>
  );
}

export default Header;
