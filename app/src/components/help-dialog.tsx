'use client';

import React from "react";
import HelpIcon from '@mui/icons-material/Help';
import IconButton from "@mui/material/IconButton";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import CloseIcon from "@mui/icons-material/Close";
import Box from "@mui/material/Box"

const HelpDialog = () => {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
    console.log("open")
  };

  const handleClose = () => {
    setOpen(false);
  };
  return (
    <Box sx={{
      position: "absolute",
      top: 0,
      right: 0
    }}>
      <IconButton onClick={handleClickOpen}>
        <HelpIcon 
          sx={{ color: 'var(--bulge-blue)' }}
        />
      </IconButton>
      <Dialog
        open={open}
        onClose={handleClose}
      >
        <DialogTitle color="primary" fontWeight="bold">
          The Bulge Open? It&apos;s the bulgiest Masters pool, ever. 
          <IconButton
            aria-label="close"
            onClick={handleClose}
            sx={{ position: 'absolute', right: 8, top: 8 }}
          >
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <DialogContent sx={{ fontSize: "0.9rem"}}>
          <strong>🏌️ Build Your Team</strong>
          <ul>
            <li>Select <strong>7 players</strong> (1 player from each tier)</li>
            <li><strong>Tier 1</strong> = best odds to win</li>
            <li><strong>Tier 7</strong> = worst odds to win</li>
          </ul>

          <strong>📊 Scoring</strong>
          <ul>
            <li>Lowest total score wins</li>
            <li>Your team score uses your <strong>best 5 players</strong></li>
            <li>Your <strong>worst 2 scores are dropped</strong></li>
            <li>If a counted player misses the cut, 
              they receive a <strong>+10 penalty </strong> 
              (+5 for each missed round)
            </li>
          </ul>

          <strong>💰 Earnings</strong>
          <ul>
            <li>1st: ~70% of pool</li>
            <li>2nd: ~20% of pool</li>
            <li>3rd: ~10% of pool</li>
          </ul>
        </DialogContent>

      </Dialog>
    </Box>
  )
}

export default HelpDialog;