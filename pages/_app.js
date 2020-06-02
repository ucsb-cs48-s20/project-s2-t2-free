import { SWRConfig } from "swr";
import fetch from "isomorphic-unfetch";
import { ToastProvider } from "../components/Toasts";
import "bootstrap/dist/css/bootstrap.min.css";
import "../styles/index.css";
import "@fullcalendar/core/main.css";
import "@fullcalendar/daygrid/main.css";

function MyApp({ Component, pageProps }) {
  return (
    <ToastProvider>
      <SWRConfig
        value={{
          fetcher: (...args) => fetch(...args).then((res) => res.json()),
        }}
      >
        <Component {...pageProps} />
      </SWRConfig>
    </ToastProvider>
  );
}

export default MyApp;
