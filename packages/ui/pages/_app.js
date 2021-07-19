import React from "react";
import Head from "next/head";
import { StylesProvider, ThemeProvider } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import theme from "../src/theme";
import { useRouter } from "next/router";

import "../styles/global.css";
import { Media, MediaContextProvider } from "../components/media";
import MainNav from "../components/MainNav";
import styles from "../components/Drawer.module.css";
import MainNavMobile from "../components/MainNavMobile";

function MyApp({ Component, pageProps }) {
  const router = useRouter();

  // Hardcoded routes that will have our Nav. May use a different approach later.
  const sideBarRoutes = ["/", "/members"];

  React.useEffect(() => {
    // Remove the server-side injected CSS.
    const jssStyles = document.querySelector("#jss-server-side");
    if (jssStyles) {
      jssStyles.parentElement.removeChild(jssStyles);
    }
  }, []);

  return (
    <StylesProvider injectFirst>
      <Head>
        <title>daoOS</title>
        <meta
          name="viewport"
          content="minimum-scale=1, initial-scale=1, width=device-width"
        />
        <meta name="theme-color" content="#181829" />
      </Head>
      <ThemeProvider theme={theme}>
        {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
        <CssBaseline />
        {sideBarRoutes.includes(router.pathname) ? (
          <MediaContextProvider>
            <Media lessThan="md">
              <MainNavMobile>
                <Component {...pageProps} />
              </MainNavMobile>
            </Media>
            <Media greaterThan="sm">
              <MainNav className={styles.fullHeight}>
                <Component {...pageProps} />
              </MainNav>
            </Media>
          </MediaContextProvider>
        ) : (
          <Component {...pageProps} />
        )}
      </ThemeProvider>
    </StylesProvider>
  );
}

export default MyApp;
