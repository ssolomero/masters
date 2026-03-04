import "@/styles/globals.css";
import { createTheme, CssBaseline, ThemeProvider } from "@mui/material";
import type { AppProps } from "next/app";

const theme = createTheme({
  palette: {
    primary: {
      main: '#5170ff',
    },
    secondary: {
      main: '#ff914d',
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        contained: {
          color: '#ff914d'
        }
      }
    }
  }
});

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Component {...pageProps} />
    </ThemeProvider>
  )
}
