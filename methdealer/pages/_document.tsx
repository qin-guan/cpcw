import Document, { Html, Head, Main, NextScript } from 'next/document'
import NextHead from 'next/head'

class MyDocument extends Document {
  static async getInitialProps(ctx) {
    const initialProps = await Document.getInitialProps(ctx)
    return { ...initialProps }
  }

  render() {
    return (
      <Html>
        <Head />
        <NextHead>
        <meta name="viewport" content="width=device-width, initial-scale=1.0, 
user-scalable=no"/>
            </NextHead>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}

export default MyDocument