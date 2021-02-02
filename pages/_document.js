import NextDocument, { Html, Head, Main, NextScript } from "next/document";
import { ColorModeScript } from "@chakra-ui/react";
import GoogleFonts from "next-google-fonts";

class Document extends NextDocument {
  static async getInitialProps(ctx) {
    const initialProps = await NextDocument.getInitialProps(ctx);
    return { ...initialProps };
  }

  render() {
    return (
      <Html lang='en'>
        <GoogleFonts href='https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700&display=swap' />
        <Head />
        <body>
          <ColorModeScript initialColorMode='light' />
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default Document;
