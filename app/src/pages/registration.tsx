import logo from "../../public/Bulge.svg";
import Image from "next/image";
import 'bootstrap/dist/css/bootstrap.min.css'; // Import Bootstrap CSS
import { useEffect, useState } from "react";
import Link from "next/link";
import { Rankings } from "@/typings/types";
import Button from "@mui/material/Button";
import Logo from "@/components/logo";

export default function Registration() {

  const [rankings, setRankings] = useState({} as Rankings);
  const [owner, setOwner] = useState("");
  const [team, setTeam] = useState(['N/A', 'N/A', 'N/A', 'N/A', 'N/A', 'N/A', 'N/A']);
  const [currentStep, setCurrentStep] = useState(0);
  const [registerLoading, setRegisterLoading] = useState(false);
  const [error, setError] = useState(false);
  const [playersLoading, setPlayersLoading] = useState(true);

  useEffect(() => {
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

  const handleSubmit = async (e: React.FormEvent) => {
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
        
      } else {
        console.log(`Error: ${data.message || 'Something went wrong'}`);
      }
    } catch (error) {
      console.error('Error making POST request:', error);
    } finally {
      setRegisterLoading(false);
      setCurrentStep(2); // Move to confirmation step
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

  return (
    <div className="main">
      <Logo />

      {/* Form */}
      <form className="content mt-5 pb-5">
      {currentStep === 0 && (
        <div>
          <input type="text" value={owner} placeholder="Enter your name" className="w-100 mb-5 text-center" onChange={(e) => setOwner(e.target.value)} required/>
          <Button variant="contained" onClick={handleNext} className="btn-primary w-100" disabled={!owner}><strong>CONTINUE</strong></Button>
        </div>
      )}

      {currentStep === 1 && playersLoading && (
        <div className="text-center mt-5">Loading players...</div>)}

      {currentStep === 1 && !playersLoading &&(
        <div>
          <div className="mb-5 text-center registration-text">Select your players below (1 per tier)</div>
          {Object.entries(rankings).map(([key, value], index) => (
            Array.isArray(value) && (
              <div key={key} className="mb-4">
                <div className="tier-label mb-4">
                  <label htmlFor="" className="text-center">{key}</label>
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
          <div className="my-5">
            <Button 
              variant="contained"
              className="w-100 mb-4"
              onClick={handleSubmit}
              loading={registerLoading}
              loadingIndicator="Register..."
              disabled={team.includes('N/A')}
            >
                <strong>Register</strong>
            </Button>
            <Button variant="text" onClick={handlePrevious}>Change name</Button>
          </div>
        </div>
      )}

      {currentStep === 2 && (
        <div>
          <div className="mb-4">Welcome to the Bulge Open!</div>
          <Link href="/" className="link">Go home</Link>
        </div>
      )}

      </form>
    </div>
  );
}