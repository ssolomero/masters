import 'bootstrap/dist/css/bootstrap.min.css'; // Import Bootstrap CSS
import { useEffect, useState } from "react";
import Link from "next/link";
import { Rankings } from "@/typings/types";
import Button from "@mui/material/Button";
import Logo from "@/components/logo";
import Typography from "@mui/material/Typography"
import Alert from "@mui/material/Alert";
import AlertTitle from "@mui/material/AlertTitle"
import Box from "@mui/material/Box";
import HelpDialog from "../components/help-dialog";
import Dialog from "@mui/material/Dialog";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close"

export default function Registration() {

  const [rankings, setRankings] = useState({} as Rankings);
  const [owner, setOwner] = useState("");
  const [team, setTeam] = useState(['N/A', 'N/A', 'N/A', 'N/A', 'N/A', 'N/A', 'N/A']);
  const [currentStep, setCurrentStep] = useState(0);
  const [registerLoading, setRegisterLoading] = useState(false);
  const [error, setError] = useState(false);
  const [playersLoading, setPlayersLoading] = useState(true);

  useEffect(() => {
    const registrationComplete = sessionStorage.getItem("registrationComplete");
    if (registrationComplete === "true") {
      setCurrentStep(2);
      sessionStorage.removeItem("registrationComplete");
    }

    const fetchRankings = async () => {
      try {
        const response = await fetch('/api/rankings');
        const {data: data} = await response.json();
        delete data[0]._id; // Remove _id if it exists
        setRankings(data[0]);
      } catch (error) {
        console.error('Error fetching rankings:', error);
      } finally {
        setPlayersLoading(false);
      }
    };
    fetchRankings();
  }, []);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      setRegisterLoading(true);

      const requestOptions = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json' // Specify content type as JSON
        },
        body: JSON.stringify({
          "owner": owner,
          "players": team
        })
      };

      const response = await fetch('/api/teams', requestOptions);
      const data = await response.json();

      if (response.ok) {
        console.log('Post created successfully!');
        sessionStorage.setItem("registrationComplete", "true");
        setCurrentStep(2); // Move to confirmation step
      } else {
        console.log(`Error: ${data.message || 'Something went wrong'}`);
        setError(true);
      }
    } catch (error) {
      console.error('Error making POST request:', error);
      setError(true);
    } finally {
      setRegisterLoading(false);
    }
  };
  
  const onTierSelection = (tierIndex: number, player: string) => {
    const updatedTeam = [...team];
    updatedTeam[tierIndex] = player;
    setTeam(updatedTeam);
  }

  const handleNext = () => {
    setCurrentStep(currentStep + 1);
  };

  const handlePrevious = () => {
    setCurrentStep(currentStep - 1);
  };

  const handleRandomSelection = () => {
     // eslint-disable-next-line
    const randomTeam = Object.entries(rankings).map(([_, value]) => {
      if (Array.isArray(value) && value.length > 0) {
        const randomIndex = Math.floor(Math.random() * value.length);
        return value[randomIndex];
      }
      return 'N/A';
    });
  
    setTeam(randomTeam);
  };

  return (
    <Box className="main">
      <Box sx={{ textAlign: "center" }}><Logo /></Box>
      <HelpDialog />
      {/* Form */}
      <form className="content mt-5 pb-5" onSubmit={handleSubmit}>
      {currentStep === 0 && (
        <div>
          <input type="text" value={owner} placeholder="Enter your name" className="w-100 mb-5 text-center" onChange={(e) => setOwner(e.target.value)} required/>
          <Button type="button" variant="contained" onClick={handleNext} className="btn-primary w-100" disabled={!owner}><strong>CONTINUE</strong></Button>
        </div>
      )}

      {currentStep === 1 && playersLoading && (
        <div className="text-center mt-5">Loading players...</div>)}

      {currentStep === 1 && !playersLoading &&(
        <div>
          <div className="mb-3 text-center registration-text">Select your players below (1 per tier)</div>
          <Button 
            type="button"
            variant="outlined"
            className="w-100 mb-4"
            onClick={handleRandomSelection}
          >
          🎲 Pick for me
          </Button>
          {Object.entries(rankings).map(([key, value], index) => (
            Array.isArray(value) && (
              <div key={key} className="mb-4 text-center">
                <div className="tier-label mb-4">
                  <label htmlFor="">{`Tier ${index + 1}`}</label>
                </div>
                {value.map((item: string, id: number) => (
                  <div className="mb-2 text-start" key={id}>
                    <label key={id}>
                      <input type="radio" name={item} value={item} checked={item === team[index]} onChange={(e) => onTierSelection(index, e.target.value)} />
                      <span>{item}</span>
                    </label>
                  </div>
                ))}
              </div>
            )
        ))}
          <Box className="my-5 text-center">
            <Button
              type="submit"
              fullWidth 
              variant="contained"
              className="w-100 mb-4"
              loading={registerLoading}
              loadingPosition="end"
              disabled={team.includes('N/A')}
            >
                <strong>Register</strong>
            </Button>
            <Button type="button" variant="text" onClick={handlePrevious}>Change name</Button>
          </Box>
        </div>
      )}

      {currentStep === 2 && (
        <>
          <Alert severity="success" sx={{ backgroundColor: "primary", mb: 3 }}>
            <AlertTitle>Success</AlertTitle>
            Welcome to the 2nd Annual Bulge Open!
          </Alert>
          <Typography fontWeight="bold" className="mb-2">Next Steps:</Typography>
          <Typography variant="body1" textAlign="left" className="mb-3">
            💸  Venmo <strong>$15</strong> to <a href="https://venmo.com/sharence-solomero" target="_blank" rel="noopener noreferrer">@sharence-solomero</a>
          </Typography>
          <Typography variant="body1" textAlign="left" className="mb-3">
            ⛳️  See your team&apos;s <Link href="/live-score">LIVE SCORE</Link>
          </Typography>
          <Typography variant="body1" textAlign="left" className="mb-3">
            🚨  Join the <a href="https://discord.gg/wxgbhXrs" target="_blank" rel="noopener noreferrer">Discord</a> for updates
          </Typography>
        </>
      )}

      </form>
      <Dialog open={error} >
          <IconButton
            aria-label="close"
            onClick={() => setError(false)}
            sx={{ position: 'absolute', right: 8, top: 8 }}
          >
            <CloseIcon />
          </IconButton>
        <Alert severity="error">
          <AlertTitle>Sorry! Something went wrong, please try again.</AlertTitle>
        </Alert>
      </Dialog>
    </Box>
  );
}