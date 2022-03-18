import Document, { Html, Head, Main, NextScript } from "next/document";
import Script from "next/script";

class MyDocument extends Document {
  render() {
    return (
      <Html lang="en">
        <Head />
        <body>
          <Main />
          <NextScript />
          <script src="https://kit.fontawesome.com/7493c7897f.js"></script>
        </body>
      </Html>
    );
  }
}

export default MyDocument;
