import { Html, Head, Main, NextScript } from "next/document";
import Footer from "../components/footer";
import Box from "@mui/material/Box";
import Logo from "../components/logo";
import HelpDialog from "../components/help-dialog";


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
