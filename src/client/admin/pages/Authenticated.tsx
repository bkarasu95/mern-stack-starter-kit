import { Grid } from "@material-ui/core";
import { blue, purple } from "@material-ui/core/colors";
import CssBaseline from "@material-ui/core/CssBaseline";
import { createMuiTheme, ThemeProvider } from "@material-ui/core/styles";
import { Theme } from "@material-ui/core";
import Switch from "@material-ui/core/Switch";
import React, { useState } from "react";
import Content from "../layouts/Content";
import Footer from "../layouts/Footer";
import Navbar from "../layouts/Navbar";
import Sidebar from "../layouts/Sidebar";

export default function Authenticated() {
  const [darkState, setDarkState] = useState(
    localStorage.getItem("admin:theme") === "true"
  );
  const palletType = darkState ? "dark" : "light";
  const mainPrimaryColor = darkState ? purple[500] : blue[500];
  const mainSecondaryColor = darkState ? purple[900] : blue[900];
  const textColor = darkState ? "#eeeeee" : "#000000";
  const darkTheme: Theme = createMuiTheme({
    palette: {
      type: palletType,
      primary: {
        main: mainPrimaryColor,
        contrastText: textColor,
      },
      secondary: {
        main: mainSecondaryColor,
      },
    },
  });
  const handleThemeChange = () => {
    localStorage.setItem("admin:theme", new Boolean(!darkState).toString());
    setDarkState(!darkState);
  };

  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      <Grid container direction="row">
        <Grid item md={1}>
          <Sidebar />
        </Grid>
        <Grid item md={11} className="min-vh-100 main-container">
          <Navbar />
          <Switch
            checked={darkState}
            onChange={handleThemeChange}
            placeholder="Tema"
          />
          <Grid container item direction="column">
            <Content />
          </Grid>
          <Footer />
        </Grid>
      </Grid>
    </ThemeProvider>
  );
}
