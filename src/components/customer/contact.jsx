import React from "react";
import Carousel from "./slide";
import WhoWeAre from "./who_we_are";
import Solution from "./solution";
import { Grid } from "@material-ui/core";
import Toolber from "./toolbar";

export default function Contact() {
  return (
    <>
      <Toolber />
      <Grid container>
        <Grid item xs={12} sm={12} xl={12} md={12}>
          <Carousel />
        </Grid>
        <Grid item xs={12} sm={12} xl={12} md={12}>
          <WhoWeAre />
        </Grid>
        <Grid item xs={12} sm={12} xl={12} md={12}>
          <Solution />
        </Grid>
      </Grid>
    </>
  );
}
