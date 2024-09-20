import { QueryClient, QueryClientProvider } from "@fieldbee/api";
import { ThemeProvider } from "@fieldbee/ui";
import { AdapterDateFns, LocalizationProvider } from "@fieldbee/ui/date-picker";
import i18next from "i18next";
import type { AppProps } from "next/app";
import Head from "next/head";
import translations from "../localization/translations";

import ToastContainer from "@fieldbee/ui/ToastContainer";
import "react-toastify/dist/ReactToastify.css";
import BackgroundDownloadProvider from "../screens/background-download/background-download";
import AppProvider from "../screens/shared/providers/app-provider";
import "./../screens/map/utils/map.css";

i18next.init({
  lng: "en", // if you're using a language detector, do not define the lng option
  fallbackLng: "en",
  debug: true,
  resources: translations,
});

const queryClient = new QueryClient();

export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    <QueryClientProvider client={queryClient}>
      <LocalizationProvider dateAdapter={AdapterDateFns}>
        <Head>
          <title>FieldBee</title>
          <meta name="viewport" content="initial-scale=1, width=device-width" />
        </Head>
        <ThemeProvider>
          <BackgroundDownloadProvider>
            <AppProvider>
              <Component {...pageProps} />
            </AppProvider>
          </BackgroundDownloadProvider>
        </ThemeProvider>
        <ToastContainer
          position="top-center"
          hideProgressBar={true}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          closeButton={false}
          autoClose={6000}
          theme="dark"
        />
      </LocalizationProvider>
    </QueryClientProvider>
  );
}
