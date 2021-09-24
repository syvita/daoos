import "../styles/globals.css";
import { Suspense } from "react";
import {Provider} from 'jotai'
function MyApp({ Component, pageProps }) {
  return (
    
      <Component {...pageProps} />

  );
}

export default MyApp;
