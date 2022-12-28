import { Container, Typography, Grid, Button } from "@mui/material";
import React from "react";
import { useNavigate } from "react-router-dom";

function LandingPage() {
  const navigate = useNavigate();
  const handleClick = () => {
    navigate("/");
  };

  return (
    <Container component="main">
      <Grid
        container
        spacing={0}
        direction="column"
        alignItems="center"
        justifyContent="center"
        style={{ minHeight: "100vh" }}
        rowSpacing={3}
      >
        <Grid item xs={2}>
          <Typography variant="h4">You already logged in</Typography>
        </Grid>
        <Grid item>
          <Button
            size="large"
            variant="contained"
            color="success"
            onClick={handleClick}
          >
            Logout
          </Button>
        </Grid>
      </Grid>
    </Container>
  );
}

export default LandingPage;
