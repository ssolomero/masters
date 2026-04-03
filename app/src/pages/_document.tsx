import { Html, Head, Main, NextScript } from "next/document";
import Footer from "../components/footer";
import Box from "@mui/material/Box";


export default function Document() {
  return (
    <Html lang="en">
      <Head />
      <body className="main">
        <Main />
        <NextScript />
        <Box sx={{
          position: "sticky",
          bottom: 0,
          width: "100%",
          padding: "50px"
        }}>
          <Footer />
        </Box>
      </body>
    </Html>
  );
}
