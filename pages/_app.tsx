import type { AppProps } from "next/app";
import { AppContextProvider } from "@/context";
import "tailwindcss/base.css";
import "tailwindcss/components.css";
import "tailwindcss/utilities.css";
import "@/styles/globals.scss";

const App = ({ Component, pageProps }: AppProps) => {
  return (
    <AppContextProvider>
      <div className="oxanium_font">
        <Component {...pageProps} />
      </div>
    </AppContextProvider>
  );
};

export default App;
