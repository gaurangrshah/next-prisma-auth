import { ChakraProvider, extendTheme } from "@chakra-ui/react";
import { DefaultSeo } from "next-seo";
import { Provider as AuthProvider } from "next-auth/client";

import { theme } from "@/chakra";
import { ToastProvider } from "@/chakra/contexts/toast-context";
import { DefaultLayout } from "@/chakra/layouts/default";
import SEO from "../next-seo.config";
import Footer from "@/components/chakra/footer";
import Header from "@/components/chakra/nav-bar/header";
import Nprogress from "@/components/nprogress";
// import CustomLink from "@/components/link/custom-link";
// import data from "@/config/setup.json";

const App = ({ Component, pageProps }) => {
  // console.log(theme);
  return (
    <>
      <DefaultSeo {...SEO} />
      <ChakraProvider resetCSS theme={theme}>
        <Nprogress />
        <ToastProvider>
          <AuthProvider session={pageProps.session}>
            <DefaultLayout bars={[<Header show={true} />, <Footer />]}>
              <Component {...pageProps} />
            </DefaultLayout>
          </AuthProvider>
        </ToastProvider>
      </ChakraProvider>
    </>
  );
};

export default App;
