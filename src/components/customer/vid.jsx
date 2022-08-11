import React from "react";
import { Grid } from "@material-ui/core";
export default function Vid() {
  return (
    <Grid container>
      <Grid item xs={3} sm={3} md={3} xl={3}></Grid>

      <Grid item xs={5} sm={5} md={5} xl={3}>
        <iframe
          id="video"
          width="100%"
          heigh="100%"
          src={"https://aleriaconsulting.eu/videos/home.mp4"}
        />
      </Grid>

      <Grid item xs={3} sm={3} md={3} xl={3}></Grid>
    </Grid>
  );
}
