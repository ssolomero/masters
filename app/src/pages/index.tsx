import Head from "next/head";
import 'bootstrap/dist/css/bootstrap.min.css'; // Import Bootstrap CSS
import Link from "next/link";
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import Logo from "@/components/logo";
import Box from "@mui/material/Box";
import HelpDialog from "../components/help-dialog";
import Alert from "@mui/material/Alert";
import Typography from "@mui/material/Typography";


export default function Home() {
  
  return (
    <>
      <Head>
        <title>The Bulge Open</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" />
        <link href="https://fonts.googleapis.com/css2?family=Pochaevsk&display=swap" rel="stylesheet" />
        <link href="https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap" rel="stylesheet" />
      </Head>
      <div className="main">
        <HelpDialog />
        <div className="content">
                  <Box sx={{ textAlign: "center" }}><Logo /></Box>
        <Alert severity="info" className="mt-3">
          <Typography variant="body2" fontWeight="bold">Registration will close April 8 11:59 PM CT</Typography>
          <Typography variant="body2" className="mt-2">The Masters takes place on <br />Thu, Apr 9, 2026 – Sun, Apr 12, 2026</Typography>
        </Alert>
          <Stack spacing={3} direction="column" className="mt-5">
            <Link href="/registration"
            >
              <Button variant="contained" className="w-100"><strong>Register</strong></Button>
            </Link>
            <Link href="/live-score"
            >
              <Button variant="contained" className="w-100"><strong>Live Score</strong></Button>
            </Link>
          </Stack>
        </div>
      </div>
    </>
  );
}
