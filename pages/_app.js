import "@fortawesome/fontawesome-svg-core/styles.css";
import { config } from "@fortawesome/fontawesome-svg-core";
config.autoAddCss = false;
import '../styles/custom_theme.scss';
import Header from "./Header";
import NewRoom from "./NewRoom";

function MyApp({ Component, pageProps }) {
  return (
    <div id="app">
      <Header />
      <NewRoom />
    </div>

  )
}

export default MyApp
