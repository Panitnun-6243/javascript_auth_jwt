import { Container, Typography, Grid, Button } from "@mui/material";
import React, { useEffect } from "react";

function LandingPage() {
  const handleClick = () => {
    //clear token
    localStorage.clear();
    window.location.reload();
  };
  useEffect(() => {
    const token = localStorage.getItem("token");
    //verify token
    fetch("http://localhost:5000/auth", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.status === "ok") {
          console.log("Verify token success");
        } else {
          //remove token
          console.log("Token expired");
          localStorage.removeItem("token");
          window.location = "/";
        }
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }, []);

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
