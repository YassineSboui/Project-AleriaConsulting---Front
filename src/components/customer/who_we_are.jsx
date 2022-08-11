import React from "react";
import { Grid } from "@material-ui/core";
import { Slide } from "material-auto-rotating-carousel";
import { withStyles } from "@material-ui/core/styles";

const styles = {
  root: {
    height: 400,
    width: 800,
    backgroundColor: "#e0e0e0",
  },
  media: {
    backgroundColor: "#e0e0e0",
  },
  title: {
    color: "#ae52d4",
  },
  subtitle: {
    color: "#212121",
  },
};
export default function WhoWeAre() {
  const StyledSlide = withStyles(styles)(Slide);

  return (
    <Grid container>
      <Grid item xs={3} sm={3} md={3} xl={3}></Grid>

      <Grid item xs={5} sm={5} md={5} xl={3}>
        <StyledSlide
          media={
            <img src="https://aleriaconsulting.eu/img/who.jpg" width="100%" alt=""/>
          }
          title="Qui sommes-nous?"
          subtitle="Aléria Consulting est une société de conseil informatique. Spécialisée dans l’ingénierie informatique, notre équipe est mise à votre disposition pour aider votre entreprise et vous accompagner dans votre digitalisation. Créée en 2017, nous présentons à nos clients des solutions informatiques personnalisées afin de vous démarquer de vos concurrents."
          mobile
          landscape
        />
      </Grid>

      <Grid item xs={3} sm={3} md={3} xl={3}></Grid>
    </Grid>
  );
}
